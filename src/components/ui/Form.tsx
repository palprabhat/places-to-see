import {
  Children,
  createElement,
  DetailedHTMLProps,
  FC,
  FormHTMLAttributes,
  ReactPortal,
} from "react";
import {
  FieldElement,
  FieldErrors,
  FieldValues,
  Ref as ReactHookFormRef,
} from "react-hook-form";

interface IForm
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: JSX.Element | JSX.Element[] | Array<JSX.Element | null>;
  className?: string;
  register: (ref: (FieldElement & ReactHookFormRef) | null) => void;
  errors: FieldErrors<FieldValues>;
}

export const Form: FC<IForm> = ({
  register,
  errors,
  children,
  className,
  ...rest
}) => {
  return (
    <form className={`w-full ${className}`} {...rest}>
      {Array.isArray(children)
        ? Children.map(children, (child) => {
            if (!child) return null;
            return child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register: register,
                    key: child.props.name,
                    error: errors[`${child.props.name}`],
                  },
                })
              : child;
          })
        : children.props.name
        ? createElement(children.type, {
            ...{
              ...children.props,
              register: register,
              key: children.props.name,
              error: errors[`${children.props.name}`],
            },
          })
        : children}
    </form>
  );
};
