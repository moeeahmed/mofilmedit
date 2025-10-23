"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ScrollView } from "./scroll-view";
import { FOOTER_LINKS } from "@/content/footer";
import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollView viewMargin="0px">
          <Link
            href="/"
            aria-label="go home"
            className="mx-auto block size-fit"
          >
            <Image
              className="drop-shadow-2xl animate-glow"
              src="/mofilmedit.svg"
              alt="mofilmedit logo"
              width={50}
              height={50}
              priority
            />
          </Link>
        </ScrollView>
        <ScrollView stagger delay={0.1} viewMargin="0px">
          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            {FOOTER_LINKS.map((link, index) => (
              <div key={link.title}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{link.title}</span>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </ScrollView>
        <ScrollView delay={0.15} viewMargin="0px">
          <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="https://www.instagram.com/_mofilmedit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                ></path>
              </svg>
            </Link>
            <Link
              href="https://www.tiktok.com/@_mofilmedit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"
                ></path>
              </svg>
            </Link>
            <Link
              href="http://wa.me/447391041966"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.65,21.73l.43-.79c-.2-.11-.43-.14-.64-.09l.21.88h0ZM.9,23.1l-.88-.21c-.11.48.18.97.67,1.08.14.03.28.03.42,0l-.21-.88ZM2.27,17.35l.88.21c.05-.22.02-.45-.09-.64l-.79.43ZM12,24c6.63,0,12-5.37,12-12h-1.8c0,5.63-4.57,10.2-10.2,10.2v1.8ZM6.22,22.52c1.72.94,3.69,1.48,5.78,1.48v-1.8c-1.78,0-3.46-.46-4.91-1.26l-.87,1.58h0ZM1.11,23.98l5.75-1.37-.42-1.75-5.75,1.37s.42,1.75.42,1.75ZM1.39,17.14L.02,22.89l1.75.42,1.37-5.75-1.75-.42h0ZM0,12C0,14.09.54,16.06,1.48,17.78l1.58-.87c-.8-1.46-1.26-3.13-1.26-4.91H0ZM12,0C5.37,0,0,5.37,0,12h1.8C1.8,6.37,6.37,1.8,12,1.8V0ZM24,12C24,5.37,18.63,0,12,0v1.8c5.63,0,10.2,4.57,10.2,10.2h1.8Z"
                />
                <path
                  fill="currentColor"
                  d="M13.05,17.1h-4.05v-5.1h4.05c1.41,0,2.55,1.14,2.55,2.55s-1.14,2.55-2.55,2.55ZM12.75,12h-3.75v-5.1h3.75c1.41,0,2.55,1.14,2.55,2.55s-1.14,2.55-2.55,2.55Z"
                />
              </svg>
            </Link>
          </div>
        </ScrollView>
        <ScrollView delay={0.2} viewMargin="0px">
          <span className="text-muted-foreground block text-center text-sm">
            {" "}
            © {new Date().getFullYear()} MoFilmedIt, All rights reserved
          </span>
        </ScrollView>
      </div>
    </footer>
  );
}
