import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import FooterSection from "@/components/footer";
import { ScrollView } from "@/components/scroll-view";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

function getProject(slug: string) {
  return PORTFOLIO_CONTENT.find((item) => item.slug === slug && item.video);
}

function getPlatformName(url: string): string {
  if (/instagram\.com/.test(url)) return "Instagram";
  if (/youtube\.com|youtu\.be/.test(url)) return "YouTube";
  if (/tiktok\.com/.test(url)) return "TikTok";
  return "Original";
}

export function generateStaticParams() {
  return PORTFOLIO_CONTENT.filter((item) => item.slug && item.video).map(
    (item) => ({ slug: item.slug as string })
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "video.other",
      title: `${project.name} | mofilmedit`,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: [{ url: project.img, width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.name,
    description: project.description,
    thumbnailUrl: [project.img],
    contentUrl: project.video,
    embedUrl: `${SITE_URL}/projects/${project.slug}`,
    publisher: { "@id": `${SITE_URL}/#business` },
    ...(project.uploadDate ? { uploadDate: project.uploadDate } : {}),
    ...(project.duration ? { duration: project.duration } : {}),
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${SITE_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${SITE_URL}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c"),
        }}
      />
      <article className="px-6 pb-24 pt-40 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <ScrollView>
            <Link
              href="/projects"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; Work
            </Link>
          </ScrollView>

          <ScrollView delay={0.05}>
            <p className="mt-8 text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
              Case study
            </p>
          </ScrollView>
          <ScrollView delay={0.1}>
            <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight md:text-5xl">
              {project.name}
            </h1>
          </ScrollView>
          {project.orientation === "portrait" ? (
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
              <ScrollView delay={0.2}>
                <div className="mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden bg-black md:mx-0">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={project.img}
                    className="size-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                </div>
              </ScrollView>

              <div>
                <ScrollView delay={0.15}>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </ScrollView>

                {project.concept && (
                  <ScrollView delay={0.22}>
                    <div className="mt-8 border-t pt-8">
                      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
                        The concept
                      </p>
                      <p className="mt-4 text-foreground/80 leading-relaxed">
                        {project.concept}
                      </p>
                    </div>
                  </ScrollView>
                )}

                <ScrollView delay={0.25}>
                  <div
                    className={cn(
                      "mt-8 flex flex-wrap items-center gap-8",
                      !project.concept && "border-t pt-8"
                    )}
                  >
                    <Link
                      href="/#contact"
                      className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-foreground"
                    >
                      Start a project
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                      >
                        View on {getPlatformName(project.url)}
                      </a>
                    )}
                  </div>
                </ScrollView>
              </div>
            </div>
          ) : (
            <>
              <ScrollView delay={0.15}>
                <p className="mt-6 max-w-xl text-muted-foreground">
                  {project.description}
                </p>
              </ScrollView>

              <ScrollView delay={0.2}>
                <div className="mt-10 aspect-video overflow-hidden bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={project.img}
                    className="size-full"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                </div>
              </ScrollView>

              {project.concept && (
                <ScrollView delay={0.22}>
                  <div className="mt-10 max-w-2xl border-t pt-10">
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
                      The concept
                    </p>
                    <p className="mt-4 text-foreground/80 leading-relaxed">
                      {project.concept}
                    </p>
                  </div>
                </ScrollView>
              )}

              <ScrollView delay={0.25}>
                <div
                  className={cn(
                    "mt-10 flex flex-wrap items-center gap-8",
                    !project.concept && "border-t pt-8"
                  )}
                >
                  <Link
                    href="/#contact"
                    className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm uppercase tracking-[0.2em] transition-colors hover:border-foreground"
                  >
                    Start a project
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                    >
                      View on {getPlatformName(project.url)}
                    </a>
                  )}
                </div>
              </ScrollView>
            </>
          )}
        </div>
      </article>
      <FooterSection />
    </main>
  );
}
