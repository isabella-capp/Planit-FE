import { Metadata } from "next";
import Hero from "@/components/Hero";
import Separator from "@/components/Separator";
import Feature from "@/components/Features";
import About from "@/components/About";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Next.js",
  description: "This is Home for Solid Pro",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Separator />
      <Feature />
      <About />
      <CTA />
      <FAQ />
      <Newsletter />
    </main>
  );
}
