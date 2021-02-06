import DropMenu from "./ui/DropMenu";
import { FC } from "react";
import {
  IoClose,
  IoLocationSharp,
  IoLogOutOutline,
  IoPerson,
} from "react-icons/io5";
import { AiOutlineGithub } from "react-icons/ai";
import { useAuth } from "src/contexts";
import FirebaseAuth from "./FirebaseAuth";
import { useRouter } from "next/router";
import Modal from "./Modal";
import Link from "next/link";
import { Button } from "./ui";
import { externalUrls, urls } from "src/consts";

interface IMenuItem {
  onClick?: () => any;
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const MenuItem: FC<IMenuItem> = ({
  children,
  onClick,
  asLink,
  href,
  target,
  rel,
}) => {
  const className =
    "flex justify-between items-center px-4 py-3 select-none cursor-pointer";

  return (
    <>
      {asLink ? (
        <Link href={href ?? ""}>
          <a target={target} rel={rel} className={className}>
            <div className="mr-4">{children}</div>
          </a>
        </Link>
      ) : (
        <div className={className} onClick={onClick}>
          <div className="mr-4">{children}</div>
        </div>
      )}
    </>
  );
};

const Navbar = () => {
  const { user, logout, authenticated } = useAuth();
  const router = useRouter();

  const closeAuthModal = () => {
    router.push(urls.home);
  };

  return (
    <>
      <nav
        className="flex justify-between items-center px-4 md:px-8 shadow-sm bg-blueGray-900 border-b border-gray-800"
        style={{ minHeight: "75px" }}
      >
        <Link href="/">
          <a>
            <IoLocationSharp fontSize="1.75rem" />
          </a>
        </Link>

        <div className="flex justify-between items-center">
          {authenticated && router.pathname === urls.home && (
            <Button asLink href={urls.addPlace}>
              Add a new place
            </Button>
          )}

          {!authenticated ? (
            router.pathname !== urls.auth ? (
              <Link href={`${urls.home}?auth=true`} as={urls.auth}>
                <a
                  key="signin"
                  className="flex justify-center items-center px-3"
                >
                  SignIn / SignUp
                </a>
              </Link>
            ) : null
          ) : (
            <DropMenu closeOnItemSelect={false} key="drop-menu">
              <DropMenu.Title>
                <div className="flex justify-center items-center px-3 ml-7">
                  {user?.photoURL ? (
                    <img src={user.photoURL} className="rounded-full w-7 h-7" />
                  ) : (
                    <IoPerson fontSize="1.75rem" />
                  )}
                </div>
              </DropMenu.Title>
              <DropMenu.Items className="w-56">
                <MenuItem
                  asLink
                  href={externalUrls.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex space-x-2">
                    <AiOutlineGithub fontSize="1.75rem" />
                    <span>Github</span>
                  </div>
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                  <div className="flex space-x-2">
                    <IoLogOutOutline  fontSize="1.75rem" />
                    <span>Logout</span>
                  </div>
                </MenuItem>
              </DropMenu.Items>
            </DropMenu>
          )}
        </div>
      </nav>

      <Modal
        id="firebase-auth-modal"
        isOpen={!!router.query.auth}
        onClose={closeAuthModal}
      >
        <button
          className="absolute m-3 top-0 right-0 outline-none focus:outline-none hover:text-gray-300"
          onClick={closeAuthModal}
        >
          <IoClose fontSize="1.5rem" />
        </button>
        <div className="mt-8">
          <FirebaseAuth />
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
