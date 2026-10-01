"use client";

import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimated(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    root.current?.querySelectorAll('[data-marquee-copy] [id]').forEach(element => element.removeAttribute('id'));
  }, [animated, children, repeat]);
  return (
    <div
      {...props}
      ref={root}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(animated ? repeat : 1)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            inert={i > 0}
            data-marquee-copy={i > 0 ? "" : undefined}
            data-nosnippet={i > 0 ? "" : undefined}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee motion-reduce:animate-none flex-row": animated && !vertical,
              "animate-marquee-vertical motion-reduce:animate-none flex-col": animated && vertical,
              "flex-row": !vertical,
              "flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
