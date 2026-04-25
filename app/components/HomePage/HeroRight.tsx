import Image from "next/image";

export default function HeroRight() {
  return (
<div className="relative w-full aspect-square sm:aspect-video h-[calc(100vh-5rem)]">
  <Image
    src="/ui-photos/hero-banner.svg"
    alt="Hero Banner"
    fill
    sizes=""
    priority
    className="object-cover"
  />
</div>
  );
}