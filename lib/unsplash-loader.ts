/**
 * Global next/image loader (wired in next.config.ts).
 * Unsplash's imgix CDN resizes and picks AVIF/WebP itself, so we skip the
 * Next.js image optimizer entirely: faster, and no optimizer usage on Vercel.
 */
type LoaderProps = { src: string; width: number; quality?: number };

export default function unsplashLoader({ src, width, quality }: LoaderProps): string {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  return url.href;
}
