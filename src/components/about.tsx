import { Circle, Cpu, Lock, Sparkles, Zap } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";

const ourPrinciples = [
  {
    title: "Storytelling with Impact",
    description:
      "I don’t just shoot videos, I craft stories that connect, inspire, and leave a lasting impression.",
  },
  {
    title: "Built on Collaboration",
    description:
      "The best results come from working together. I take your vision and bring it to life through teamwork and creativity.",
  },

  {
    title: "Real. Honest. Transparent",
    description:
      "No gimmicks or hidden costs, just open communication and a commitment to quality.",
  },
  {
    title: "Precision in Every Frame",
    description:
      "Every shot matters. From planning to post-production, I focus on the details that make your story stand out.",
  },
];

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32" id="about">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        {/* <div className="mx-auto w-full space-y-6 text-center md:space-y-12 flex justify-stretch">
          <ScrollView>
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              MoFilmedIt
            </h2>
          </ScrollView>
          <ScrollView>
            <p>
              Started with curiosity. A camera. And a need to tell stories that
              feel real. For me, it was never about chasing perfection, it’s
              about moments, energy, and truth. Every frame’s about catching
              that one feeling you can’t recreate.
            </p>
          </ScrollView>
        </div> */}

        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <ScrollView>
            <h2 className="text-4xl font-semibold italic lg:text-5xl ">
              Why MoFilmedIt?
            </h2>
          </ScrollView>
          <ScrollView>
            <p className="max-w-sm sm:ml-auto italic text-right">
              Started with curiosity. A camera. And a need to tell stories that
              feel real. For me, it was never about chasing perfection, it’s
              about moments, energy, and truth. Every frame’s about catching
              that one feeling you can’t recreate.
            </p>
          </ScrollView>
        </div>

        <ScrollView>
          <Image
            className="rounded-(--radius) object-cover aspect-[16/9] w-full"
            src="https://djpguts9gwm3x.cloudfront.net/52zgTgVTSJL9tMA.JPG"
            alt="team image"
            height="480"
            width="720"
            loading="lazy"
          />
        </ScrollView>
        <ScrollView>
          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            {ourPrinciples.map((principle, index) => (
              <div className="space-y-3" key={index}>
                <div className="flex items-center gap-2">
                  <Circle className="size-4" />
                  <h3 className="text-sm font-medium">{principle.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
