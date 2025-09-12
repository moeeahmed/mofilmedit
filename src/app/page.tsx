"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import TypingEffect from "@/components/typingeffect";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://djpguts9gwm3x.cloudfront.net/mofilmedit.jpg")',
        backgroundColor: "#000",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center h-svh sm:h-screen p-6 sm:p-20 gap-8 sm:gap-16 relative overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-200 to-black mix-blend-multiply h-full" />

      {/* Main content */}
      <motion.div
        className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center z-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 5, ease: "easeOut" },
        }}
      >
        <Link
          href="https://www.instagram.com/_mofilmedit"
          target="_blank"
          rel="noopener"
        >
          <Image
            className="drop-shadow-2xl animate-glow"
            src="/mofilmedit.svg"
            alt="mofilmedit logo"
            width={180}
            height={38}
            priority
          />
        </Link>
        <TypingEffect text="coming soon" />
      </motion.div>

      {/* Footer */}
      <footer className="row-start-3 z-10 text-center text-xs sm:text-sm text-gray-300">
        <div className="flex flex-col items-center justify-center gap-1">
          <a
            href="mailto:contact@mofilmedit.co.uk"
            className="underline-offset-4 hover:underline focus:underline focus:outline-none"
            aria-label="Email mofilmedit"
          >
            contact@mofilmedit.co.uk
          </a>
          <span>
            © {new Date().getFullYear()} mofilmedit. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
