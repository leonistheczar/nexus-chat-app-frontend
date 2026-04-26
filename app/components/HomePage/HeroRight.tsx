import Image from "next/image";

export default function HeroRight() {
  return (
<div className="relative w-full aspect-square h-[calc(100vh-4rem)]">
  <Image
    src="/ui-photos/hero-banner.svg"
    alt="Hero Banner"
    fill
    sizes=""
    priority
    className="object-cover sm:object-contain sm:scale-125"
  />
</div>
  );
}