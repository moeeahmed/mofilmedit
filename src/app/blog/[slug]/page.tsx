import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FooterSection from "@/components/footer";
import { ScrollView } from "@/components/scroll-view";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | mofilmedit`,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630 }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.coverImage ? { image: post.coverImage } : {}),
    author: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <article className="px-6 pb-24 pt-40 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <ScrollView>
            <Link
              href="/blog"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; Journal
            </Link>
          </ScrollView>

          <ScrollView delay={0.05}>
            <p className="mt-8 text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
              {formatPostDate(post.date)}
            </p>
          </ScrollView>
          <ScrollView delay={0.1}>
            <h1 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">
              {post.title}
            </h1>
          </ScrollView>

          {post.coverImage && (
            <ScrollView delay={0.15}>
              <div className="mt-10 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  height={630}
                  width={1200}
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="w-full object-cover"
                />
              </div>
            </ScrollView>
          )}

          <ScrollView delay={0.2}>
            <div
              className="mt-10 border-t pt-10 leading-relaxed text-foreground/80
                [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-foreground [&_h2]:first:mt-0
                [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-foreground
                [&_p]:mt-5 [&_p]:first:mt-0
                [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
                [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
                [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4
                [&_blockquote]:mt-5 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic
                [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm
                [&_img]:mt-5"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </ScrollView>
        </div>
      </article>
      <FooterSection />
    </main>
  );
}
