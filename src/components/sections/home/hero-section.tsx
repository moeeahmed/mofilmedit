import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-end overflow-hidden"
      style={{
        backgroundImage:
          'url("https://djpguts9gwm3x.cloudfront.net/mofilmedit.jpg")',
        backgroundColor: "#000",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

      <div className="relative z-10 w-full px-6 pb-20 pt-40 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Cinematic Videography Studio
            </p>

            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.3}
              as="h1"
              className="mt-6 max-w-3xl text-balance text-5xl font-medium leading-[1.05] text-white md:text-7xl"
            >
              Blending creativity and storytelling into cinematic visuals.
            </TextEffect>

            <p className="mt-6 max-w-lg text-balance text-white/70">
              Compelling edits and brand experiences that leave a lasting
              impact — from sports and events to brand films.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:border-white"
              >
                Start a project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white hover:border-white/40"
              >
                View work
              </Link>
            </div>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
}
