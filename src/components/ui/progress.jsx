import { cn } from "../../lib/utils";

const Progress = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={cn(
        "bg-black h-2 rounded-full transition-all"
      )}
      style={{ width: `${value}%` }}
    />
  </div>
);

export { Progress };
