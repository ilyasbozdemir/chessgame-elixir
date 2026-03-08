"use client";

import { cn } from "@/lib/utils";

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8",
        "min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)]",
        className
      )}
    >
      {children}
    </div>
  );
}
