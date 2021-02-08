import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

type ISplitLayout = {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
  children?: never;
  className?: string;
  leftChildrenClassName?: string;
  rightChildrenClassName?: string;
};

type IFullLayout = {
  leftChildren?: never;
  rightChildren?: never;
  children: ReactNode;
  className?: string;
  leftChildrenClassName?: never;
  rightChildrenClassName?: never;
};

declare type ILayout = ISplitLayout | IFullLayout;

const Layout: FC<ILayout> = ({
  children,
  leftChildren,
  rightChildren,
  className,
  leftChildrenClassName,
  rightChildrenClassName,
}) => {
  let content = null;

  if (children) {
    content = children;
  } else {
    content = (
      <>
        <div className={`w-1/2 ${leftChildrenClassName}`}>{leftChildren}</div>
        <div className={`w-1/2 ${rightChildrenClassName}`}>{rightChildren}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={`${!children ? "flex" : ""} ${className}`}>
        {content}
      </main>
    </>
  );
};

export default Layout;
