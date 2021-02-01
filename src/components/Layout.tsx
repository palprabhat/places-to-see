import { FC } from "react";
import Map from "./Map";
import Navbar from "./Navbar";

interface ILayout {
  withMapView?: boolean;
}

const Layout: FC<ILayout> = ({ children, withMapView = false }) => {
  let content = children;

  if (withMapView) {
    content = (
      <>
        <div className="w-1/2">{children}</div>
        <div className="w-1/2 h-full">
          <Map />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main
        className={`${withMapView ? "flex" : ""}`}
        style={{ minHeight: "calc(100vh - 75px)" }}
      >
        {content}
      </main>
    </>
  );
};

export default Layout;
