import Features from "@/components/HomePage/Features";
import { HeroLeft } from "@/components/HomePage/HeroLeft";
import HeroRight from "@/components/HomePage/HeroRight";

export default function Home() {
  return (
    <>
      {/* Hero  */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 items-center py-4 justify-between">
      <HeroLeft />
      <HeroRight />
      </section>
      {/* Features */}
      <section className="w-full py-12 px-6 bg-background-50 rounded-lg shadow-lg">
        <Features />
      </section>
    </>
  );
}
