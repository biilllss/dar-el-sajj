"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { useLang } from "@/lib/i18n";
import { PHOTOS } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Six photos in a bento grid. Layout per tile, with matching `sizes`:
 * phones: 2 columns, first tile full width · md+: 3 columns, first tile 2x2.
 */
const TILES = [
  { className: "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto", sizes: "(min-width: 1152px) 760px, (min-width: 768px) 66vw, 100vw" },
  { className: "aspect-square", sizes: "(min-width: 1152px) 380px, (min-width: 768px) 33vw, 50vw" },
  { className: "aspect-square", sizes: "(min-width: 1152px) 380px, (min-width: 768px) 33vw, 50vw" },
  { className: "aspect-square", sizes: "(min-width: 1152px) 380px, (min-width: 768px) 33vw, 50vw" },
  { className: "aspect-square", sizes: "(min-width: 1152px) 380px, (min-width: 768px) 33vw, 50vw" },
  { className: "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-square", sizes: "(min-width: 1152px) 380px, (min-width: 768px) 33vw, 100vw" },
];

export function Gallery() {
  const { t } = useLang();

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} lede={t.gallery.lede} />
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {PHOTOS.gallery.map((src, i) => (
            <li key={src} className={cn("relative overflow-hidden rounded-[18px] border-2 border-charcoal", TILES[i]?.className)}>
              <Reveal delay={(i % 3) * 80} className="absolute inset-0">
                <Image
                  src={src}
                  alt={t.gallery.alts[i] ?? ""}
                  fill
                  sizes={TILES[i]?.sizes ?? "50vw"}
                  className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
