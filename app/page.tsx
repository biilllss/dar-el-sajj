import { BranchPicker } from "@/components/branch-picker";
import { CartDrawer } from "@/components/cart-drawer";
import { ConceptBadge } from "@/components/concept-badge";
import { FloatingOrderButton } from "@/components/floating-order-button";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Locations } from "@/components/locations";
import { MenuSection } from "@/components/menu-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhyUs } from "@/components/why-us";

/** One-page layout, in the order set by the brief. */
export default function HomePage() {
  return (
    <>
      <ConceptBadge />
      <SiteHeader />
      <main id="main">
        <Hero />
        <BranchPicker />
        <MenuSection />
        <WhyUs />
        <Gallery />
        <Locations />
      </main>
      <SiteFooter />
      <CartDrawer />
      <FloatingOrderButton />
    </>
  );
}
