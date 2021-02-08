import React, { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import ReactMapGL, {
  InteractiveMapProps,
  NavigationControl,
  ViewState,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapboxStyle } from "src/consts";

interface IMap extends InteractiveMapProps {
  viewport: ViewState;
  children: ReactNode;
}

const Map: ForwardRefRenderFunction<ReactMapGL, IMap> = (
  { viewport, children, ...rest },
  ref
) => {
  return (
    <div className="relative">
      <ReactMapGL
        {...viewport}
        {...rest}
        mapStyle={MapboxStyle}
        ref={ref}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      >
        <div className="absolute bottom-0 right-0 p-4">
          <NavigationControl showCompass={false} />
        </div>
        {children}
      </ReactMapGL>
    </div>
  );
};

export default forwardRef(Map);
