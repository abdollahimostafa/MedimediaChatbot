import { Features8 } from "@/components/features-8";
import InfiniteHero from "@/components/infinite-hero";
import { BackgroundBeamsDemo } from "@/components/newsec";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Component } from "@/components/ui/flickering-footer";

export default function DemoOne() {
  return(
  
  <div>

  <InfiniteHero />
    <Features8/>
    <BackgroundBeamsDemo/>

    <Component/>
  </div>
  )

  ;
}
