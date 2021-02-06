import { FC, useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, ViewState } from "react-map-gl";
import { IoLocationSharp } from "react-icons/io5";
import Map from "./ui/Map";
import { LOCAL_STORAGE_VIEWPORT, ViewportFullHeight } from "src/consts";
import { useLocalStorage } from "src/hooks";

interface IProps {
  searchedViewport: ViewState;
}

const AddPlaceMap: FC<IProps> = ({ searchedViewport }) => {
  const mapRef = useRef<ReactMapGL | null>(null);
  const [localViewport] = useLocalStorage<ViewState>(LOCAL_STORAGE_VIEWPORT, {
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 13,
  });
  const [viewport, setViewport] = useState<ViewState>(localViewport);

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
        <Marker
          latitude={searchedViewport.latitude}
          longitude={searchedViewport.longitude}
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

export default AddPlaceMap;
