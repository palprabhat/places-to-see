import { FC, useRef, useState } from "react";
import ReactMapGL, { Marker, NavigationControl, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
}

const CurrentMap: FC<{ place: IPlace; nearby: IPlace[] }> = ({
  place,
  nearby,
}) => {
  const mapRef = useRef<ReactMapGL | null>();
  const [viewport, setViewport] = useState<ViewState>({
    latitude: place.latitude,
    longitude: place.longitude,
    zoom: 12,
  });

  return (
    <div className="relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 75px)"
        ref={(instance) => (mapRef.current = instance)}
        minZoom={4}
        maxZoom={18}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/prabhatpal14/ckkhnouxu02d917mlce5wg9tm"
      >
        <div className="absolute top-0 right-0 p-4">
          <NavigationControl showCompass={false} />
        </div>

        {nearby.map((nearPlace) => (
          <Marker
            latitude={nearPlace.latitude}
            longitude={nearPlace.longitude}
            offsetLeft={-20}
            offsetTop={-20}
            key={nearPlace.id}
            className="hover:z-10"
          >
            <Link href={`/places/${nearPlace.id}`}>
              <a>
                <IoLocationSharp className="text-3xl text-white hover:text-red-600 cursor-pointer transform transition-all hover:scale-125 hover:-translate-y-1" />
              </a>
            </Link>
          </Marker>
        ))}

        <Marker
          latitude={place.latitude}
          longitude={place.longitude}
          offsetLeft={-20}
          offsetTop={-20}
          className="hover:z-10"
        >
          <IoLocationSharp className="text-3xl text-red-400 hover:text-red-600 cursor-pointer transform transition-all hover:scale-125 hover:-translate-y-1" />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default CurrentMap;
