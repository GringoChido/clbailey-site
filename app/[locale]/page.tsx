import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import MuseumGrid from "@/components/home/MuseumGrid";

export const metadata: Metadata = {
  title: "C.L. Bailey & Co. | Modern Heritage Billiards & Game Room Furniture",
  description:
    "Solid hardwood pool tables, shuffleboards, and game room furniture. Handcrafted in Tomball, Texas since 1999. Lifetime structural guarantee. Dealer-installed nationwide.",
  alternates: {
    canonical: "https://clbailey.com/en",
    languages: {
      en: "https://clbailey.com/en",
      es: "https://clbailey.com/es",
    },
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <MuseumGrid />
    </>
  );
}
