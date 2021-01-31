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
  register?:
    | string
    | ((instance: HTMLTextAreaElement | null) => void)
    | RefObject<HTMLTextAreaElement>;
  name: string;
  error: FieldError;
  className?: string;
  containerClassName?: string;
}

export const TextArea: FC<ITextArea> = ({
  register,
  name,
  error,
  className,
  containerClassName,
  ...rest
}) => {
  return (
    <div className={`my-2 w-full ${containerClassName}`}>
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
