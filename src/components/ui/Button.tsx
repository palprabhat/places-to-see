import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import Link from "next/link";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "default" | "danger" | "transparent";
}

export const Button: FC<IButton> = ({
  children,
  className,
  asLink,
  href,
  target,
  variant = "default",
  rel,
  ...props
}) => {
  let variantClass = "";
  switch (variant) {
    case "danger":
      variantClass =
        "bg-red-700 border-red-700 hover:bg-red-800 hover:border-red-800 active:bg-red-900 active:border-red-900 disabled:bg-red-400 disabled:border-red-400";
      break;
    case "transparent":
      variantClass =
        "bg-transparent border-white hover:text-gray-300 hover:border-gray-300 active:text-gray-400 active:border-gray-400";
      break;
    case "default":
    default:
      variantClass =
        "bg-purple-700 border-purple-700 hover:bg-purple-800 hover:border-purple-800 active:bg-purple-900 active:border-purple-900 disabled:bg-purple-400 disabled:border-purple-400";
      break;
  }
  const btnClass =
    "border-2 border-solid transition duration-150 ease text-white px-5 py-3 rounded-md select-none outline-none focus:outline-none disabled:cursor-not-allowed";

  return (
    <>
      {asLink ? (
        <Link href={href ?? ""}>
          <a
            target={target}
            rel={rel}
            className={`no-underline ${btnClass} ${variantClass} ${className}`}
          >
            {children}
          </a>
        </Link>
      ) : (
        <button
          {...props}
          className={`${btnClass} ${variantClass} ${className}`}
        >
          {children}
        </button>
      )}
    </>
  );
};
