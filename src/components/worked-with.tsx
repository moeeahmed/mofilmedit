import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { WORKED_WITH } from "@/content/workedwith";
import { ProgressiveBlur } from "./motion-primitives/progressive-blur";

export default function WorkedWith() {
  return (
    <section className="">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm hidden xl:block">
              Businesses Worked With
            </p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={100}>
              {WORKED_WITH.map((icon, i) => (
                <div className="flex" key={i}>
                  {icon}
                </div>
              ))}
            </InfiniteSlider>

            <div className="bg-linear-to-r from-none absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-none absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-80"
              direction="left"
              blurIntensity={0.9}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
