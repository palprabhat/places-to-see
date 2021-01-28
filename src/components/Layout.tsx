import { FC } from "react";
import Navbar from "./Navbar";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="p-4 sm:p-8">{children}</main>
    </>
  );
};

export default Layout;
