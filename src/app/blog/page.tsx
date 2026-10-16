import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/components/footer";
import { ScrollView } from "@/components/scroll-view";
import { getAllPosts, formatPostDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on videography, editing and working with brands and athletes, from mofilmedit.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | mofilmedit",
    description:
      "Notes on videography, editing and working with brands and athletes, from mofilmedit.",
    url: "/blog",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen">
      <section className="px-6 pb-24 pt-40 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl border-b pb-12">
            <ScrollView>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Journal
              </p>
            </ScrollView>
            <ScrollView delay={0.1}>
              <h1 className="mt-4 text-4xl font-medium md:text-5xl">
                Notes from behind the camera.
              </h1>
            </ScrollView>
            <ScrollView delay={0.15}>
              <p className="mt-6 text-muted-foreground">
                Thoughts on filming, editing and working with brands and
                athletes.
              </p>
            </ScrollView>
          </div>

          {posts.length === 0 ? (
            <p className="mt-16 text-muted-foreground">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
              {posts.map((post) => (
                <ScrollView key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    {post.coverImage && (
                      <div className="overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          height={480}
                          width={720}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="mt-4 border-t pt-4">
                      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
                        {formatPostDate(post.date)}
                      </p>
                      <h2 className="mt-2 text-lg font-medium">
                        {post.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </ScrollView>
              ))}
            </div>
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
