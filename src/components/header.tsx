"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/content/nav";

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = cn(
    "text-xs uppercase tracking-[0.2em] duration-150 text-white/80 hover:text-white",
    isScrolled && "text-foreground/70 hover:text-foreground"
  );

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          "fixed z-20 w-full transition-colors duration-300",
          isScrolled && "bg-background/80 backdrop-blur-md border-b"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-12">
          <Link
            href="/"
            aria-label="home"
            className="block"
            onClick={() => setMenuState(false)}
          >
            <Image
              src="/longlogo.svg"
              alt="mofilmedit"
              width={337}
              height={32}
              priority
              className="h-5 w-auto md:h-6"
            />
          </Link>

          <button
            onClick={() => setMenuState(!menuState)}
            aria-label={menuState ? "Close Menu" : "Open Menu"}
            className={cn(
              "relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden text-white",
              isScrolled && "text-foreground"
            )}
          >
            {menuState ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <ul className="hidden lg:flex lg:items-center lg:gap-10">
            {NAV_LINKS.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={linkClasses}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className={linkClasses}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {menuState && (
          <div className="bg-background border-t px-6 py-8 lg:hidden">
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuState(false)}
                    className="text-foreground text-sm uppercase tracking-[0.2em]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contact"
                  onClick={() => setMenuState(false)}
                  className="text-foreground text-sm uppercase tracking-[0.2em]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
