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
        <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              Who is MoFilmedIt?
            </h2>
          </ScrollView>
          <ScrollView>
            <p>
              MoFilmedIt was born from my passion for storytelling through film.
              With an engineering background, I’ve always looked for creative
              ways to solve problems and video became my outlet. What started as
              curiosity turned into a drive to craft visuals that inspire,
              connect, and leave a lasting impact.
            </p>
          </ScrollView>
        </div>
        <ScrollView>
          <Image
            className="rounded-(--radius) object-cover aspect-[16/9] w-full"
            src="https://djpguts9gwm3x.cloudfront.net/52zgTgVTSJL9tMAs.JPG"
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
