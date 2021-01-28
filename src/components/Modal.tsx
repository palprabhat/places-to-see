import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ModalWrapper: FC = ({ children }) => (
  <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center bg-gray-600 bg-opacity-70">
    <div
      className="relative bg-gray-800 shadow-xl rounded-md p-4 m-4 w-full md:p-8 md:m-8 lg:w-auto"
      style={{ minWidth: "320px" }}
    >
      {children}
    </div>
  </div>
);

interface IModal {
  id?: string;
  isOpen: boolean;
  closeOnEsc?: boolean;
  onClose: () => void;
}

const Modal: FC<IModal> = ({
  children,
  id,
  isOpen,
  closeOnEsc = true,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const modalRoot = document.querySelector("#modal-root");
    if (isOpen) {
      const modalElement = document.createElement("div");

      if (modalRoot) {
        if (id) {
          modalElement.id = id;
        }
        modalElement.style.zIndex = (
          3000 +
          modalRoot.children.length * 10
        ).toString();

        modalRoot.appendChild(modalElement);
        ref.current = modalElement;

        setMounted(true);
      }
    }
    return () => {
      setMounted(false);
      if (ref.current) {
        modalRoot?.removeChild(ref.current);
        ref.current = undefined;
      }
    };
  }, [id, isOpen]);

  useEffect(() => {
    const dismissModal = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    if (isOpen && closeOnEsc) {
      window.addEventListener("keydown", dismissModal);
      return () => {
        window.removeEventListener("keydown", dismissModal);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return mounted && ref.current
    ? createPortal(<ModalWrapper>{children}</ModalWrapper>, ref.current)
    : null;
};

export default Modal;
