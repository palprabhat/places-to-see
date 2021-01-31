import { FC, useState, useEffect, memo } from "react";
import SearchBox, { OptionType } from "./ui/SearchBox";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type address = {
  label: string;
  value: string;
  structured_formatting: string;
};

interface ILocationSearch {
  defaultValue: string;
  onSelectAddress: ({
    address,
    lat,
    lng,
  }: {
    address: address;
    lat: number;
    lng: number;
  }) => void;
}

const PlacesAutoComplete: FC<ILocationSearch> = ({
  defaultValue,
  onSelectAddress,
}) => {
  const [options, setOptions] = useState<OptionType>([]);

  const {
    ready,
    setValue,
    suggestions: { loading, data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    debounce: 300,
    cache: 7 * 24 * 60 * 60,
    defaultValue,
  });

  useEffect(() => {
    const opt = data.map((prediction) => {
      return {
        label: prediction.description,
        value: prediction.place_id,
        structured_formatting: prediction.structured_formatting,
      };
    });

    setOptions(opt);
  }, [data]);

  const handleChange = async (address: address | null) => {
    if (address) {
      setValue(address.label, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address: address.label });
        const { lat, lng } = await getLatLng(results[0]);

        console.log(results);
        onSelectAddress({ address, lat, lng });
      } catch (error) {
        console.error(`😱 Error:`, error);
      }
    } else {
      clearSuggestions();
    }
  };

  return (
    <SearchBox
      name="locationSearch"
      id="location-search"
      placeholder="Search a location"
      isLoading={loading}
      isDisabled={!ready}
      options={options}
      onInputChange={(input) => setValue(input)}
      onChange={(address) => handleChange(address as address | null)}
    />
  );
};

const libraries: Libraries = ["places"];

const LocationSearch: FC<ILocationSearch> = ({
  defaultValue,
  onSelectAddress,
}) => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError) return <div>Error while loading</div>;

  return (
    <PlacesAutoComplete
      defaultValue={defaultValue}
      onSelectAddress={onSelectAddress}
    />
  );
};

export default memo(LocationSearch);
