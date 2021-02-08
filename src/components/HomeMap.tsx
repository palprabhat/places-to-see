import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactMapGL, { Marker, ViewState } from "react-map-gl";
import { useLocalStorage } from "src/hooks";
import Map from "./ui/Map";
import { LOCAL_STORAGE_VIEWPORT, urls, ViewportFullHeight } from "src/consts";
import { BoundsArray } from "src/consts";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { GetPlacesQuery_places } from "src/generated/GetPlacesQuery";
import { minWidthXl } from "../utils/windowSize";
import { ViewportHalfHeight } from "../consts/index";

interface IProps {
  setDataBounds: (bounds: BoundsArray) => void;
  places: GetPlacesQuery_places[];
  focusedPlaceId: string;
  setFocusedPlaceId: Dispatch<SetStateAction<string>>;
  searchedViewport: ViewState | undefined;
}

const HomeMap: FC<IProps> = ({
  setDataBounds,
  places,
  focusedPlaceId,
  setFocusedPlaceId,
  searchedViewport,
}) => {
  const [locationSearched, setLocationSearched] = useState(false);
  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useLocalStorage<ViewState>(
    LOCAL_STORAGE_VIEWPORT,
    {
      latitude: 47.6062,
      longitude: -122.3321,
      zoom: 11,
    }
  );
  const isMinWidthXl = minWidthXl();

  useEffect(() => {
    if (searchedViewport) {
      setViewport({ ...searchedViewport });
      setLocationSearched(true);
    }
  }, [searchedViewport]);

  useEffect(() => {
    if (locationSearched && mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds();
      setDataBounds(bounds.toArray() as BoundsArray);
      setLocationSearched(false);
    }
  }, [locationSearched]);

  return (
    <div className="relative">
      <Map
        viewport={viewport}
        width="100%"
        height={isMinWidthXl ? ViewportFullHeight : ViewportHalfHeight}
        minZoom={4}
        maxZoom={15}
        ref={(instance) => {
          mapRef.current = instance;
        }}
        onViewportChange={setViewport}
        onLoad={() => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(bounds.toArray() as BoundsArray);
          }
        }}
        onInteractionStateChange={(extra) => {
          if (!extra.isDragging && mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(bounds.toArray() as BoundsArray);
          }
        }}
      >
        {places.map((place) => (
          <div
            key={place.id}
            onMouseEnter={() => setFocusedPlaceId(place.id)}
            onMouseLeave={() => setFocusedPlaceId("")}
          >
            <Marker
              latitude={place.latitude}
              longitude={place.longitude}
              offsetLeft={-20}
              offsetTop={-20}
              className={`${focusedPlaceId === place.id ? "z-10" : ""}`}
            >
              <Link href={`${urls.places}/${place.id}`}>
                <a>
                  <IoLocationSharp
                    className={`text-3xl text-white cursor-pointer transform transition-all ${
                      focusedPlaceId === place.id
                        ? "text-red-600 scale-125 -translate-y-1"
                        : ""
                    }`}
                  />
                </a>
              </Link>
            </Marker>
          </div>
        ))}
      </Map>
    </div>
  );
};

export default HomeMap;
