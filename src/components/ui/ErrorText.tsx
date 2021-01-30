import { FC } from "react";

interface IErrorText {
  children?: string;
  className?: string;
}

const ErrorText: FC<IErrorText> = ({ children, className }) => {
  return (
    <div className={`text-red-600 text-sm text-left p-1 h-6 ${className}`}>
      {children}
    </div>
  );
};

export default ErrorText;
