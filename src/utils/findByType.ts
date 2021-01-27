import { Children, FC } from "react";

export const findByType = (children: JSX.Element[], component: FC | null) => {
  const elements: JSX.Element[] = [];

  const type = [component?.displayName || component?.name];

  Children.forEach(children, (child) => {
    const childType = child?.type?.displayName || child?.type?.name;

    if (type.includes(childType)) {
      elements.push(child);
    }
  });

  return elements[0];
};
