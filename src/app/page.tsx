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
      className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-200 to-black mix-blend-multiply h-screen" />
      <motion.div
        className="flex flex-col gap-[32px] row-start-2 items-center "
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
    </div>
  );
}
