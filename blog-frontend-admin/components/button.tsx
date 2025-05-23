import React from "react";
import { cn } from "@/lib/utils"; // A utility for conditional classNames

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "destructive";
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 text-sm inline-flex gap-2 justify-center font-semibold rounded-lg transition duration-300";

  const variants = {
    primary: "text-white bg-accent hover:bg-accent/80",
    outline:
      "border border-accent text-accent bg-transparent hover:bg-accent/10",
    destructive: "bg-red-600 hover:bg-red-700 text-white"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      disabled={loading || disabled}
      className={cn(
        baseStyles,
        variants[variant],
        {
          "w-full": fullWidth,
          [disabledStyles]: loading || disabled,
        },
        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
