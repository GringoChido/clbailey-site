import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden -mt-[var(--header-height)] xl:-mt-[var(--header-height-xl)]">
      <HeroCarousel />
    </section>
  );
}
