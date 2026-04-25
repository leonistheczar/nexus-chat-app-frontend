import Image from "next/image";
import { HeroLeft } from "./components/HomePage/HeroLeft";

export default function Home() {
  return (
      // Hero 
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-8 md:py-12">
      <HeroLeft />
      </section>
  );
}
