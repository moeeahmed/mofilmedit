"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

export default function TypingEffect({ text }: { text: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <h2
      ref={ref}
      className="font-mono list-inside list-decimal text-2xl text-center sm:text-left drop-shadow-2xl"
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.2,
            delay: index * 0.1,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
}
