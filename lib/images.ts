import type { CategoryId } from "./menu";

/**
 * Unsplash photo sources. Resizing is done by Unsplash's own CDN through the
 * custom loader in lib/unsplash-loader.ts, so next/image only builds srcsets.
 * Alt text lives in lib/translations.ts.
 */
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const PHOTOS = {
  hero: unsplash("1555939594-58d7cb561ad1"),
  categories: {
    wraps: unsplash("1626700051175-6818013e1d4f"),
    plates: unsplash("1603360946369-dc9bb6258143"),
    sides: unsplash("1573080496219-bb080dd4f877"),
    drinks: unsplash("1621263764928-df1444c5e859"),
    desserts: unsplash("1617806501553-d3a6a3a7b227"),
  } satisfies Record<CategoryId, string>,
  gallery: [
    unsplash("1633321702518-7feccafb94d5"),
    unsplash("1599487488170-d11ec9c172f0"),
    unsplash("1529006557810-274b9b2fc783"),
    unsplash("1576867757603-05b134ebc379"),
    unsplash("1561651823-34feb02250e4"),
    unsplash("1630384060421-cb20d0e0649d"),
  ],
} as const;

/** 1200x630 crop for Open Graph / Twitter cards. */
export const OG_IMAGE = `${PHOTOS.hero}?auto=format&fit=crop&w=1200&h=630&q=80`;
