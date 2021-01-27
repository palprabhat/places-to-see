import { FC, ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { findByType } from "../utils";

type Title = FC;
type Items = FC<{ className?: string }>;

interface IRenderTitleProps {
  children: JSX.Element[];
}

interface IRenderItemsProps {
  closeOnItemSelect: Boolean;
  children: JSX.Element[];
}

interface IDropMenuProps {
  closeOnItemSelect: Boolean;
  className?: string;
  children: JSX.Element[];
}

type DropMenuFC<P = {}> = FC<P> & {
  Title: Title;
  Items: Items;
};

const Title: Title = () => null;
const Items: Items = () => null;

const RenderTitle: FC<IRenderTitleProps> = ({ children }) => {
  const title = findByType(children, Title);

  if (!title) return null;

  return <>{title.props.children}</>;
};

const RenderItems: FC<IRenderItemsProps> = ({
  children,
  closeOnItemSelect,
}) => {
  const items = findByType(children, Items);

  if (!items) return null;

  return (
    <>
      {items.props.children.map((child: ReactNode, i: Number) => {
        return (
          <div
            key={i.toString()}
            className={`whitespace-no-wrap bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 ${items.props.className}`}
            onClick={(e) => (!closeOnItemSelect ? e.stopPropagation() : null)}
          >
            {child}
          </div>
        );
      })}
    </>
  );
};

const DropMenu: DropMenuFC<IDropMenuProps> = ({
  children,
  closeOnItemSelect = true,
  className,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const handleWindowClick = () => setOpen(false);

      window.addEventListener("click", handleWindowClick);
      return () => window.removeEventListener("click", handleWindowClick);
    }
  }, [open]);

  return (
    <div className={`relative ${className}`}>
      <button
        className="select-none outline-none focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <RenderTitle>{children}</RenderTitle>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute overflow-hidden right-0 z-10 border rounded-md shadow-sm focus:outline-none bg-gray-800 border-gray-600"
          >
            <RenderItems closeOnItemSelect={closeOnItemSelect}>
              {children}
            </RenderItems>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

DropMenu.Title = Title;
DropMenu.Items = Items;

export default DropMenu;
