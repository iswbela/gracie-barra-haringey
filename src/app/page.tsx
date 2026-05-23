import { getCatalogProducts } from "@/lib/catalog";
import { Hero }         from "@/components/home/Hero";
import { StatsBar }     from "@/components/home/StatsBar";
import { YouMayAlsoLike } from "@/components/home/YouMayAlsoLike";
import { About }        from "@/components/home/About";
import { Programmes }   from "@/components/home/Programmes";
import { Schedule }     from "@/components/home/Schedule";
import { Instructors }  from "@/components/home/Instructors";
import { Benefits }     from "@/components/home/Benefits";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection }   from "@/components/home/CTASection";
import { FAQ }          from "@/components/home/FAQ";
import { Contact }      from "@/components/home/Contact";

export default function HomePage() {
  const allProducts = getCatalogProducts();

  // Daily-seeded shuffle for 4 random shop preview products
  const seed    = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const shuffled = [...allProducts].sort((a, b) => {
    const ha = (a.id * seed) % 997;
    const hb = (b.id * seed) % 997;
    return ha - hb;
  });
  const featured = shuffled.slice(0, 4);

  return (
    <>
      <Hero />
      <StatsBar />
      <YouMayAlsoLike products={featured} />
      <About />
      <Programmes />
      <Schedule />
      <Instructors />
      <Benefits />
      <Testimonials />
      <CTASection />
      <FAQ />
      <Contact />
    </>
  );
}
