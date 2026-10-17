import { ScrollView } from "@/components/scroll-view";
import { FAQ_LIST } from "@/content/faq";

export default function FaqSection() {
  return (
    <section className="py-24 md:py-40" id="faq">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="max-w-2xl">
          <ScrollView>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Good to know
            </p>
          </ScrollView>
          <ScrollView delay={0.1}>
            <h2 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
              Questions people ask before booking.
            </h2>
          </ScrollView>
        </div>

        <div className="mt-16 max-w-3xl border-b md:mt-24">
          {FAQ_LIST.map((item, index) => (
            <div key={item.question} className="border-t py-8">
              <ScrollView delay={index * 0.03}>
                <h3 className="text-lg font-medium">{item.question}</h3>
              </ScrollView>
              <ScrollView delay={index * 0.03 + 0.03}>
                <p className="mt-3 text-muted-foreground">{item.answer}</p>
              </ScrollView>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
