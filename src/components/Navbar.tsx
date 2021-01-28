import DropMenu from "./DropMenu";
import { AiOutlineGithub } from "react-icons/ai";
import { FC, useEffect, useState } from "react";
import { IoClose, IoLocationSharp, IoPerson } from "react-icons/io5";
import { useAuth } from "../hooks";
import FirebaseAuth from "./FirebaseAuth";
import { useRouter } from "next/router";
import Modal from "./Modal";
import Link from "next/link";

const MenuItem: FC<{ onClick: () => void }> = ({ children, onClick }) => {
  return (
    <div
      className={
        "flex justify-between items-center px-4 py-3 select-none cursor-pointer"
      }
      onClick={onClick}
    >
      <div className="mr-4">{children}</div>
    </div>
  );
};

const Navbar = () => {
  const { user, logout, authenticated } = useAuth();
  const router = useRouter();

  const closeAuthModal = () => {
    router.push("/");
  };

  return (
    <>
      <nav className="flex justify-between items-center py-5 px-4 md:px-8 shadow-sm bg-primary-700 border-b border-gray-900">
        <Link href="/">
          <a>
            <IoLocationSharp fontSize="1.75rem" />
          </a>
        </Link>

        <div className="flex justify-between items-center">
          <a
            href="https://github.com/palprabhat/places-to-see"
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineGithub fontSize="1.75rem" />
          </a>

          {!authenticated ? (
            router.pathname !== "/auth" ? (
              <Link href="/?auth=true" as="/auth">
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
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
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
