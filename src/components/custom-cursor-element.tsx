"use client";
import { useEffect, useRef, useState } from "react";
import { Cursor } from "@/components/motion-primitives/cursor";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

export function CustomCursorElement({
  children,
  cursor,
  className = "",
}: {
  children: React.ReactNode;
  cursor: React.ReactNode;
  className?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const handlePositionChange = (x: number, y: number) => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const inside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      setIsHovering(inside);
    }
  };

  const handleEnter = () => setIsHovering(true);
  const handleLeave = () => setIsHovering(false);

  const cursorContent = (
    <motion.div
      animate={{
        width: isHovering ? 100 : 16,
        height: isHovering ? 100 : 16,
      }}
      className={` ${
        isMobile && "hidden"
      } flex items-center justify-center rounded-full bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40 hidden}`}
    >
      <AnimatePresence>
        {isHovering ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="inline-flex w-full items-center justify-center"
          >
            {cursor}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className={className}>
      {isMobile ? (
        cursorContent
      ) : (
        <Cursor
          attachToParent
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          springConfig={{ bounce: 0.001 }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          onPositionChange={handlePositionChange}
        >
          {cursorContent}
        </Cursor>
      )}

      <div
        ref={targetRef}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        onTouchStart={handleEnter}
        onTouchEnd={handleLeave}
      >
        {children}
      </div>
    </div>
  );
}
