import {
  Children,
  createElement,
  DetailedHTMLProps,
  FC,
  FormHTMLAttributes,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

interface IForm
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: JSX.Element[] | JSX.Element;
  validationSchema: Yup.AnyObjectSchema;
  onSubmit: () => void;
  className?: string;
}

export const Form: FC<IForm> = ({
  validationSchema,
  children,
  onSubmit,
  className,
  ...rest
}) => {
  const resolver = yupResolver(validationSchema);
  const methods = useForm({ resolver });
  const { handleSubmit, register, errors } = methods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full ${className}`}
      {...rest}
    >
      {Array.isArray(children)
        ? Children.map(children, (child) => {
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
