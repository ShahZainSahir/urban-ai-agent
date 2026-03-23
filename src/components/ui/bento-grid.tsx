"use client";

import { cn } from "../../lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-4 rounded-xl overflow-hidden transition-all duration-300",
            "border border-white/10 bg-[#0a0f0a]",
            "hover:shadow-[0_2px_12px_rgba(16,185,129,0.08)]",
            "hover:-translate-y-0.5 will-change-transform",
            item.colSpan || "col-span-1",
            item.colSpan === 2 ? "md:col-span-2" : "",
            {
              "shadow-[0_2px_12px_rgba(16,185,129,0.05)] -translate-y-0.5":
                item.hasPersistentHover,
            }
          )}
        >
          <div
            className={`absolute inset-0 ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-lg font-mono",
                  "bg-emerald-950/60 text-emerald-400 border border-emerald-800/30",
                  "transition-colors duration-300"
                )}
              >
                {item.status || "Active"}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-white/90 tracking-tight text-[15px]">
                {item.title}
                <span className="ml-2 text-xs text-white/30 font-normal font-mono">
                  {item.meta}
                </span>
              </h3>
              <p className="text-sm text-white/50 leading-snug font-[425]">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2 text-xs text-white/30">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-emerald-400/60 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                {item.cta || "Explore →"}
              </span>
            </div>
          </div>

          <div
            className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-emerald-900/20 to-transparent ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
