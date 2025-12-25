import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50",
          variant === "outline"
            ? "border border-gray-300 bg-white hover:bg-gray-100"
            : "bg-black text-white hover:bg-gray-800",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
