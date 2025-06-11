"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

interface TypingAnimationProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export function TypingAnimation({
  text,
  duration = 100,
  delay = 0,
  className,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setAnimationStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimationStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [startOnView]);

  useEffect(() => {
    if (!animationStarted) return;

    if (delay > 0 && currentIndex === 0) {
      const delayTimeout = setTimeout(() => {
        if (text && currentIndex < text.length) {
          const timeoutId = setTimeout(() => {
            setDisplayedText((prev) => prev + text[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          }, duration);
          return () => clearTimeout(timeoutId);
        }
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else if (text && currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, duration);
      return () => clearTimeout(timeoutId);
    }
  }, [text, duration, currentIndex, delay, animationStarted]);

  return (
    <Component ref={ref} className={cn(className)} {...props}>
      {displayedText}
    </Component>
  );
}
