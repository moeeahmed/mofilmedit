import type { Metadata } from "next";
import Link from "next/link";
import FooterSection from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How mofilmedit collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const CONTACT_EMAIL = "contact@mofilmedit.co.uk";
const LAST_UPDATED = "25 September 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-xl font-medium">{title}</h2>
      <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 lg:px-12">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-medium md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>

        <p className="mt-8 text-muted-foreground leading-relaxed">
          This policy explains what personal information mofilmedit
          (&quot;I&quot;, &quot;me&quot;) collects through this website, why,
          and what your rights are under UK data protection law (UK GDPR and the
          Data Protection Act 2018). I am the data controller for information
          collected through this site.
        </p>

        <Section title="What I collect">
          <p>
            <strong className="text-foreground">Contact form.</strong> If you
            send an enquiry I collect your name, email address and the message
            you write. Please don&apos;t include sensitive personal information
            in your message.
          </p>
          <p>
            <strong className="text-foreground">Website usage.</strong> I use
            Vercel Analytics and Vercel Speed Insights to understand how the
            site is used and how fast it loads. These are designed to be
            privacy-friendly: they do not use cookies and do not track you
            across other websites. They record aggregated information such as
            pages visited, referrer, country, browser and device type.
          </p>
          <p>
            <strong className="text-foreground">Server logs.</strong> Like most
            websites, my hosting provider processes technical data (such as IP
            address and request details) to deliver the site and keep it secure.
          </p>
        </Section>

        <Section title="Why I use it, and my lawful basis">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              To reply to your enquiry and discuss a possible project — taking
              steps at your request before entering into a contract, and my
              legitimate interest in responding to enquiries.
            </li>
            <li>
              To protect the site and contact form from spam and abuse — my
              legitimate interest in keeping the service secure.
            </li>
            <li>
              To understand and improve site performance — my legitimate
              interest in running a reliable website.
            </li>
          </ul>
          <p>
            I do not sell your data or use it for automated decision-making.
          </p>
        </Section>

        <Section title="Who I share it with">
          <p>
            I use a small number of service providers (processors) who handle
            data on my behalf:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              Vercel — website hosting, analytics and performance insights.
            </li>
            <li>Resend — delivers contact form messages to my email inbox.</li>
            <li>
              Cloudflare Turnstile — spam protection on the contact form, where
              enabled.
            </li>
          </ul>
          <p>
            Some of these providers are based in, or process data in, the United
            States. Where personal data is transferred outside the UK, it is
            protected by appropriate safeguards such as the UK International
            Data Transfer Addendum or an adequacy arrangement.
          </p>
        </Section>

        <Section title="How long I keep it">
          <p>
            Enquiries are kept only as long as needed to respond and follow up,
            and are normally deleted within 12 months unless we go on to work
            together, in which case records are kept as required for the project
            and for legal or accounting purposes. Analytics data is aggregated
            and retained according to Vercel&apos;s standard retention.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            This site does not set advertising or tracking cookies. Your
            colour-theme preference may be stored in your browser&apos;s local
            storage so the site remembers it. The spam-protection check on the
            contact form may use limited technical data from your browser to
            tell humans from bots.
          </p>
        </Section>

        <Section title="Links to other sites">
          <p>
            Portfolio pieces link to third-party platforms such as Instagram and
            YouTube. Those services have their own privacy policies and I am not
            responsible for how they handle your data.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You can ask me to access, correct or delete the personal data I hold
            about you, to restrict or object to how I use it, and to receive a
            copy in a portable format. To exercise any of these rights, email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-foreground underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            . I will respond within one month.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            I may update this policy from time to time. The date at the top of
            the page shows when it was last changed.
          </p>
        </Section>

        <div className="mt-16">
          <Link
            href="/"
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
