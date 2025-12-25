import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils";

const Select = SelectPrimitive.Root;

/* ---------- Trigger ---------- */
const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-lg",
        "border border-gray-300 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500",
        "hover:bg-gray-50 disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 opacity-60" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = "SelectTrigger";

/* ---------- Value ---------- */
const SelectValue = SelectPrimitive.Value;

/* ---------- Content (Dropdown) ---------- */
const SelectContent = React.forwardRef(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-lg border",
          "bg-white text-gray-900 shadow-xl",
          "animate-in fade-in-80 zoom-in-95",
          position === "popper" && "translate-y-1",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = "SelectContent";

/* ---------- Item ---------- */
const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative grid grid-cols-[1fr_auto] items-center gap-3",
        "px-3 py-2 text-sm rounded-md cursor-pointer",
        "focus:bg-indigo-50 focus:text-indigo-900",
        "hover:bg-indigo-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-indigo-600" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
);

SelectItem.displayName = "SelectItem";

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};
