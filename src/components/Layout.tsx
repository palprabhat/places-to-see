import { FC } from "react";
import Navbar from "./Navbar";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 75px)" }}>{children}</main>
    </>
  );
};

export default Layout;
