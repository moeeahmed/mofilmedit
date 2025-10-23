import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import Image from "next/image";

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-32"
      style={{
        backgroundImage:
          'url("https://djpguts9gwm3x.cloudfront.net/mofilmedit.jpg")',
        backgroundColor: "#000",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-200 to-black mix-blend-multiply h-full" />
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                delayChildren: 1,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                bounce: 0.3,
                duration: 2,
              },
            },
          },
        }}
        className="absolute inset-0 -z-20"
      >
        {/* <div className="absolute inset-2 -z-10 h-full overflow-hidden rounded-3xl border border-black/10 lg:aspect-video lg:rounded-[3rem] dark:border-white/5">
          <video
            autoPlay
            loop
            muted
            preload="auto"
            className="size-full -scale-x-100 object-cover opacity-50 invert-0 dark:opacity-35 dark:invert "
          >
            <source src="/hero-light.mp4" type="video/mp4" />
          </video>
        </div> */}
      </AnimatedGroup>

      <div className="absolute inset-0 -z-10 size-full "></div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="mx-auto flex flex-col items-center text-center">
          {/* <TextEffect
            preset="fade-in-blur"
            speedSegment={0.3}
            as="h1"
            className="mt-8 text-balance text-5xl font-bold md:text-7xl xl:text-[5.25rem]"
          >
            MOFILMEDITdsdas
          </TextEffect> */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.4,
                  },
                },
              },
              ...transitionVariants,
            }}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
            <Image
              className="drop-shadow-2xl animate-glow"
              src="/longlogo.svg"
              alt="mofilmedit logo"
              width={800}
              height={800}
              priority
            />
          </AnimatedGroup>

          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.5}
            as="p"
            className="mx-auto mt-8 max-w-2xl text-balance text-lg text-white"
          >
            Blending creativity and storytelling to craft cinematic visuals,
            compelling edits, and brand experiences that leave a lasting impact
          </TextEffect>

          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
            className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
          >
            <div
              key={1}
              className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
            >
              <Button asChild size="lg" className="rounded-xl px-5 text-base">
                <Link href="#contact">
                  <svg
                    fill="#000000"
                    height="200px"
                    width="200px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 277.446 277.446"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        id="_x30_6-Movie_Clapper"
                        d="M59.488,117.299c-0.504-4.237-2.007-8.171-4.273-11.556l202.992-67.776L247.552,6.051 c-1.549-4.638-6.566-7.141-11.201-5.594L15.54,74.182c-4.635,1.547-7.143,6.563-5.594,11.201l5.225,15.647 c-5.216,4.843-8.488,11.752-8.488,19.415c0,9.924,5.486,18.586,13.582,23.127v125.02c0,4.891,3.967,8.853,8.854,8.853h232.793 c4.885,0,8.852-3.963,8.852-8.853V117.299H59.488z M188.869,26.724l26.875-8.973l-6.467,26.14l-26.875,8.973L188.869,26.724z M122.47,48.893l26.877-8.973l-6.467,26.139l-26.875,8.974L122.47,48.893z M33.181,133.946c-7.442,0-13.498-6.056-13.498-13.5 c0-7.444,6.056-13.5,13.498-13.5c7.444,0,13.5,6.056,13.5,13.5C46.681,127.89,40.625,133.946,33.181,133.946z M56.074,71.062 l26.877-8.973l-6.467,26.14l-26.877,8.974L56.074,71.062z M82.476,147.192H54.142l14.412-22.746h28.334L82.476,147.192z M138.554,124.446h28.334l-14.412,22.746h-28.334L138.554,124.446z M131.599,234.372v-60l47.783,30L131.599,234.372z M222.476,147.192h-28.334l14.412-22.746h28.334L222.476,147.192z"
                      ></path>{" "}
                    </g>
                  </svg>
                  <span className="text-nowrap">Want a movie?</span>
                </Link>
              </Button>
            </div>
          </AnimatedGroup>
        </div>
      </div>
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.85,
              },
            },
          },
          ...transitionVariants,
        }}
      ></AnimatedGroup>
    </section>
  );
}
