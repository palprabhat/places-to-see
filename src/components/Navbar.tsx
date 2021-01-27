import DropMenu from "./DropMenu";
import { AiOutlineGithub } from "react-icons/ai";
import { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { useAuth } from "src/auth/useAuth";

const MenuItems: FC = ({ children }) => {
  return (
    <div className={"flex justify-between items-center px-4 py-3 select-none"}>
      <div className="mr-4">{children}</div>
    </div>
  );
};

const Navbar = () => {
  const { user, logout, authenticated } = useAuth();

  return (
    <nav className="flex justify-between items-center py-4 px-3 shadow-sm bg-primary-600 border-b border-gray-900">
      <div>
        <IoLocationSharp />
      </div>
      <h1>Places</h1>

      <div className="flex justify-between items-center">
        <a href="#" target="_blank" rel="noreferrer">
          <AiOutlineGithub fontSize="1.25rem" />
        </a>

        {!authenticated ? (
          <div className="flex justify-center items-center px-3 py-2">
            Sign In / Sign Up
          </div>
        ) : (
          <DropMenu closeOnItemSelect={false}>
            <DropMenu.Title>
              <div className="flex justify-center items-center px-3 py-2">
                <GiHamburgerMenu fontSize="1.25rem" />
              </div>
            </DropMenu.Title>
            <DropMenu.Items className="w-56">
              <MenuItems>hi</MenuItems>
              <MenuItems>hi</MenuItems>
            </DropMenu.Items>
          </DropMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
