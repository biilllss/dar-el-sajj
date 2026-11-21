"use client";

import { ArrowUpRight } from "lucide-react";
import { SajjMark } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const STUDIO_URL = "https://instagram.com/mawqe3_studio";
const YEAR = new Date().getFullYear();

export function SiteFooter() {
  const { t, lang } = useLang();
  const f = t.footer;
  const nav = [
    { href: "#branches", label: f.links.branches },
    { href: "#menu", label: f.links.menu },
    { href: "#gallery", label: f.links.gallery },
    { href: "#locations", label: f.links.locations },
  ];

  return (
    <footer id="site-footer" data-fab-avoid className="on-dark bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <SajjMark className="size-10" />
            <span className="font-display text-2xl font-extrabold tracking-[-0.03em]">
              {lang === "ar" ? "دار الصاج" : "Dar el Sajj"}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-cream/85">{f.tagline}</p>
          <p className="mt-4 max-w-sm text-sm text-cream/70">{f.fictional}</p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="text-sm font-extrabold uppercase tracking-[0.14em] text-mustard">
            {f.explore}
          </h2>
          <ul className="mt-4 flex flex-col gap-1">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-block py-1.5 font-semibold hover:text-mustard">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-mustard">{f.follow}</h2>
          {/* Placeholders on purpose: a fictional brand has no real social accounts. */}
          <ul className="mt-4 flex flex-col gap-1">
            {f.social.map((name) => (
              <li key={name}>
                <a href="#" className="inline-block py-1.5 font-semibold hover:text-mustard">
                  {name} <span className="text-sm font-normal text-cream/60">{f.socialSoon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-cream/70">
            © {YEAR} {f.rights}
          </p>
          <a
            href={STUDIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-cream underline decoration-mustard decoration-2 underline-offset-4 hover:text-mustard"
          >
            {f.credit}
            {/* Diagonal "external" arrow, mirrored in RTL. */}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
