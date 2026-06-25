import type React from "react";

interface ButtonInterface {
  title: string;
  size: "lg" | "sm" | "md";
  variant: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  startIcon?: React.ReactNode;
}

const sizeStyles = {
  lg: "px-8 py-4 text-xl rounded-xl",
  md: "px-4 py-2 text-md rounded-md",
  sm: "px-2 py-1 text-sm rounded-sm",
};

const variantStyles = {
  primary: "mt-4 cursor-pointer",
  secondary: "cursor-pointer text-purple-600",
};

export const Button = (props: ButtonInterface) => {
  return (
    <button
      onClick={props.onClick}
      className={`${sizeStyles[props.size]} ${variantStyles[props.variant]} ${props.className || ""}`}
    >
      {props.startIcon} {props.title}
    </button>
  );
};
