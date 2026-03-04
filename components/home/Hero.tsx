import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="relative w-full h-[50svh] min-h-[400px] overflow-hidden -mt-[var(--header-height)] xl:-mt-[var(--header-height-xl)]">
      <HeroCarousel />
    </section>
  );
}
