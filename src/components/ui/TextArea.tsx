import {
  DetailedHTMLProps,
  FC,
  RefObject,
  TextareaHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";
import ErrorText from "./ErrorText";

interface ITextArea
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  register:
    | string
    | ((instance: HTMLTextAreaElement | null) => void)
    | RefObject<HTMLTextAreaElement>;
  name: string;
  error: FieldError;
  className?: string;
}

export const TextArea: FC<ITextArea> = ({
  register,
  name,
  error,
  className,
  ...rest
}) => {
  return (
    <div className="my-2">
      <textarea
        name={name}
        ref={register}
        {...rest}
        className={`border-none rounded-3xl px-4 py-2 w-full outline-none resize-none ${className}`}
      />
      <ErrorText>{error && error.message}</ErrorText>
    </div>
  );
};
