"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  AnimatePresence,
  Transition,
  Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

export type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    if (typeof window.matchMedia !== "function") {
      return false;
    }

    return window.matchMedia("(pointer: fine)").matches;
  });
  const [isVisible, setIsVisible] = useState(!attachToParent);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (typeof window.matchMedia !== "function") {
      setIsPointerFine(false);
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsPointerFine(event.matches);
    };

    setIsPointerFine(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!isPointerFine || typeof window === "undefined") {
      return;
    }

    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
  }, [cursorX, cursorY, isPointerFine]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (!isPointerFine) {
      document.body.style.cursor = "auto";
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    };

    document.body.style.cursor = attachToParent ? "auto" : "none";
    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", updatePosition);
    };
  }, [attachToParent, cursorX, cursorY, onPositionChange, isPointerFine]);

  useEffect(() => {
    if (!isPointerFine) {
      setIsVisible(false);
      return;
    }

    if (!attachToParent) {
      setIsVisible(true);
    }
  }, [attachToParent, isPointerFine]);

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

  useEffect(() => {
    if (!attachToParent || !isPointerFine || !cursorRef.current) {
      return;
    }

    const parent = cursorRef.current.parentElement;

    if (!parent) {
      return;
    }

    const handleMouseEnter = () => {
      parent.style.cursor = "none";
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      parent.style.cursor = "auto";
      setIsVisible(false);
    };

    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      parent.style.cursor = "auto";
    };
  }, [attachToParent, isPointerFine]);

  if (!isPointerFine) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className={cn("pointer-events-none fixed left-0 top-0 z-50", className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
