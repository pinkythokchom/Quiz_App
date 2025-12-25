import { cn } from "../../lib/utils";

const Card = ({ className, ...props }) => (
  <div
    className={cn("rounded-xl border bg-white shadow-sm", className)}
    {...props}
  />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("p-6 pb-4", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

export { Card, CardHeader, CardContent };
