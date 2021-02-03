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
}

export const Button: FC<IButton> = ({
  children,
  className,
  asLink,
  href,
  target,
  rel,
  ...props
}) => {
  const btnClass = `border-none bg-purple-700 hover:bg-purple-800 transition duration-150 ease text-white px-5 py-3 rounded-md select-none outline-none focus:outline-none active:bg-purple-900 disabled:bg-purple-400 disabled:cursor-not-allowed ${className}`;

  return (
    <>
      {asLink ? (
        <Link href={href ?? ""}>
          <a target={target} rel={rel} className={`no-underline ${btnClass}`}>
            {children}
          </a>
        </Link>
      ) : (
        <button {...props} className={btnClass}>
          {children}
        </button>
      )}
    </>
  );
};
