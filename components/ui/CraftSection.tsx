import Image from "next/image";
import { img } from "@/lib/products";

interface CraftSectionProps {
  backgroundImage: string;
}

const CraftSection = ({ backgroundImage }: CraftSectionProps) => {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      <div className="relative min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={img(backgroundImage)}
          alt="C.L. Bailey workshop craftsmanship"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--overlay-soft)" }}
        />
        <div className="relative z-10 text-center px-6 py-16 max-w-3xl mx-auto">
          <h2 className="heading-display text-white text-2xl lg:text-4xl mb-4">
            Solid hardwood. Lifetime guarantee. Handcrafted in Tomball, Texas.
          </h2>
          <p className="section-label text-white/60">
            Since 1999
          </p>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
