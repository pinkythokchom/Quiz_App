import { cn } from "../../lib/utils";

const Skeleton = ({ className }) => (
  <div className={cn("animate-pulse bg-gray-200 rounded-md", className)} />
);

export { Skeleton };
