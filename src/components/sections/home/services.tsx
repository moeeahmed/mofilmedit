import { ScrollView } from "@/components/scroll-view";
import { SERVICES_LIST } from "@/content/services";
import Image from "next/image";

export default function ServicesSection() {
  return (
    <section className="py-24 md:py-40" id="services">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="max-w-2xl">
          <ScrollView>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              What I do
            </p>
          </ScrollView>
          <ScrollView delay={0.1}>
            <h2 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
              Videos that work for you.
            </h2>
          </ScrollView>
          <ScrollView delay={0.15}>
            <p className="mt-6 text-muted-foreground">
              At mofilmedit, I create videos that are more than just visually
              captivating — they tell stories, connect with your audience,
              and deliver real impact.
            </p>
          </ScrollView>
        </div>

        <div className="mt-16 md:mt-24">
          {SERVICES_LIST.map((service, index) => (
            <div
              key={service.name}
              className="grid grid-cols-1 gap-8 border-t py-12 first:border-t md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-1">
                <ScrollView>
                  <span className="text-sm text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </ScrollView>
              </div>

              <div className="flex flex-col gap-4 md:col-span-4">
                <ScrollView>
                  <h3 className="text-2xl font-medium">{service.name}</h3>
                </ScrollView>
                <ScrollView delay={0.05}>
                  <p className="text-sm text-muted-foreground">
                    {service.tags.join(" · ")}
                  </p>
                </ScrollView>
                <ScrollView delay={0.1}>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </ScrollView>
              </div>

              <div className="md:col-span-7">
                <ScrollView delay={0.1}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={service.img}
                      alt={service.name}
                      height={480}
                      width={720}
                      loading="lazy"
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="size-full object-cover object-top"
                    />
                  </div>
                </ScrollView>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
