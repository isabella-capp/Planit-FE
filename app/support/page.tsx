import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Page - Planit",
};

const SupportPage = () => {
  return (
    <div className="pb-20 pt-10">
      <Contact />
    </div>
  );
};

export default SupportPage;
