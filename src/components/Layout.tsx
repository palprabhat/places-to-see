import { FC, ReactNode } from "react";
import { ViewportFullHeight } from "src/consts";
import Navbar from "./Navbar";

type ISplitLayout = {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
  children?: never;
};

type IFullLayout = {
  leftChildren?: never;
  rightChildren?: never;
  children: ReactNode;
};

declare type ILayout = ISplitLayout | IFullLayout;

const Layout: FC<ILayout> = ({ children, leftChildren, rightChildren }) => {
  let content = null;

  if (children) {
    content = children;
  } else {
    content = (
      <>
        <div className="w-1/2">{leftChildren}</div>
        <div className="w-1/2 h-full">{rightChildren}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main
        className={`${!children ? "flex" : ""}`}
        style={{ minHeight: ViewportFullHeight }}
      >
        {content}
      </main>
    </>
  );
};

export default Layout;
