import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-orange-500 text-white hover:bg-orange-600": variant === "default",
          "bg-red-500 text-white hover:bg-red-600": variant === "destructive",
          "border border-gray-200 bg-white hover:bg-gray-100": variant === "outline",
          "hover:bg-gray-100 text-gray-700": variant === "ghost",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
        },
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"
export { Button }
