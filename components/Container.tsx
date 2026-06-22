import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
}

const sizeClasses = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-[1400px]",
  full: "max-w-full",
};

export function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={`w-full ${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
