import HomePage from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
  description: "This is Home for Solid Pro",
  // other metadata
};

export default function Home() {

  return (
    <main>
      <HomePage />      
    </main>
  );
}
