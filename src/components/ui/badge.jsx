import { cn } from "../../lib/utils";

const Badge = ({ variant = "default", className, ...props }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
      variant === "success"
        ? "bg-green-100 text-green-700"
        : variant === "error"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700",
      className
    )}
    {...props}
  />
);

export { Badge };
