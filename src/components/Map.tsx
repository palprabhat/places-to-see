import { useRef, useState } from "react";
import ReactMapGL, { ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapRef = useRef<ReactMapGL | null>();
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 47.6062,
    longitude: -122.3321,
    zoom: 11,
  });

  return (
    <div className="relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 75px)"
        ref={(instance) => (mapRef.current = instance)}
        minZoom={4}
        maxZoom={15}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/prabhatpal14/ckkhnouxu02d917mlce5wg9tm"
      />
    </div>
  );
};

export default Map;
