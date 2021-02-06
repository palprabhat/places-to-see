import { FC, useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, ViewState } from "react-map-gl";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import Map from "./ui/Map";
import { urls, ViewportFullHeight } from "src/consts";

interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
}

interface IProps {
  place: IPlace;
  nearby: IPlace[];
  editMode: boolean;
  searchedViewport: ViewState;
}

const CurrentMap: FC<IProps> = ({
  place,
  nearby,
  editMode,
  searchedViewport,
}) => {
  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useState<ViewState>({
    latitude: place.latitude,
    longitude: place.longitude,
    zoom: 13,
  });

  useEffect(() => {
    setViewport({ ...searchedViewport, zoom: 13 });
  }, [searchedViewport]);

  return (
    <div className="relative">
      <Map
        viewport={viewport}
        width="100%"
        height={ViewportFullHeight}
        minZoom={4}
        maxZoom={18}
        ref={mapRef}
        onViewportChange={setViewport}
      >
        {!editMode
          ? nearby.map((nearPlace) => (
              <Marker
                latitude={nearPlace.latitude}
                longitude={nearPlace.longitude}
                offsetLeft={-20}
                offsetTop={-20}
                key={nearPlace.id}
                className="hover:z-10"
              >
                <Link href={`${urls.places}/${nearPlace.id}`}>
                  <a>
                    <IoLocationSharp className="text-3xl text-white hover:text-red-600 cursor-pointer transform transition-all hover:scale-125 hover:-translate-y-1" />
                  </a>
                </Link>
              </Marker>
            ))
          : null}

        <Marker
          latitude={editMode ? searchedViewport.latitude : place.latitude}
          longitude={editMode ? searchedViewport.longitude : place.longitude}
          offsetLeft={-20}
          offsetTop={-20}
          className="hover:z-10"
        >
          <IoLocationSharp className="text-3xl text-red-500 hover:text-red-600 cursor-pointer transform transition-all hover:scale-125 hover:-translate-y-1" />
        </Marker>
      </Map>
    </div>
  );
};

export default CurrentMap;
