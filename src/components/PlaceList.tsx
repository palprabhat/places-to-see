import { urls, ViewportFullHeight } from "src/consts";
import { GetPlacesQuery_places } from "src/generated/GetPlacesQuery";
import { Dispatch, FC, SetStateAction } from "react";
import CloudinaryImage from "./ui/CloudinaryImage";
import Link from "next/link";
import LocationSearch from "./LocationSearch";
import { IoLocationSharp } from "react-icons/io5";
import { minWidthXl } from "src/utils";

interface IPlaceList {
  places: GetPlacesQuery_places[];
  focusedPlaceId: string;
  setFocusedPlaceId: Dispatch<SetStateAction<string>>;
  searchedCoordiantes: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
}

const PlaceList: FC<IPlaceList> = ({
  places,
  focusedPlaceId,
  setFocusedPlaceId,
  searchedCoordiantes,
}) => {
  return (
    <div
      className="mx-auto xl:overflow-y-scroll p-8"
      style={{
        maxWidth: "1200px",
        height: minWidthXl() ? ViewportFullHeight : "auto",
      }}
    >
      <div className="flex justify-end space-x-4 mt-1 absolute top-20 left-6 right-6 z-10 xl:relative xl:top-0 xl:left-0 xl:right-0">
        <LocationSearch
          defaultValue=""
          onSelectAddress={({ lat, lng }) =>
            searchedCoordiantes({ latitude: lat, longitude: lng })
          }
        />
      </div>

      <div className="flex flex-col space-y-4">
        {places.map((place) => (
          <Link key={place.id} href={`${urls.places}/${place.id}`}>
            <a
              className={`flex flex-col sm:flex-row rounded-md overflow-hidden transform transition-all border-2 border-solid bg-gray-800 cursor-pointer ${
                focusedPlaceId === place.id
                  ? "border-purple-500"
                  : "border-gray-700"
              } `}
              onMouseEnter={() => setFocusedPlaceId(place.id)}
              onMouseLeave={() => setFocusedPlaceId("")}
            >
              <div className="flex-1">
                <CloudinaryImage
                  publicId={place.publicId}
                  alt={place.placeName}
                />
              </div>
              <div className="flex-1 p-4">
                <div className="text-2xl">{place.placeName}</div>
                <div className="mt-1 text-gray-400">{place.placeType}</div>
                <div className="flex items-center mt-2">
                  <IoLocationSharp className="mr-2 text-lg w-5" />
                  <span className="flex-1">{place.address}</span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaceList;
