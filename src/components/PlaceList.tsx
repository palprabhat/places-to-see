import { ViewportFullHeight } from "src/consts";
import { GetPlacesQuery_places } from "../generated/GetPlacesQuery";
import { Dispatch, FC, SetStateAction } from "react";
import CloudinaryImage from "./ui/CloudinaryImage";
import Link from "next/link";
import LocationSearch from "./LocationSearch";

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
      className="mx-auto overflow-y-scroll p-8"
      style={{ maxWidth: "780px", height: ViewportFullHeight }}
    >
      <div className="flex justify-end space-x-4 mt-1">
        <LocationSearch
          defaultValue=""
          onSelectAddress={({ lat, lng }) =>
            searchedCoordiantes({ latitude: lat, longitude: lng })
          }
        />
      </div>

      <div className="flex flex-col space-y-4">
        {places.map((place) => (
          <Link key={place.id} href={`/places/${place.id}`}>
            <a
              className={`flex rounded-md overflow-hidden transform transition-all border-2 border-solid bg-gray-800 cursor-pointer ${
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
              <div className="flex-1 p-3">
                <div>{place.placeName}</div>
                <div>{place.placeType}</div>
                <div>{place.address}</div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaceList;
