import React from "react";
import { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
    title: "FAQ - Planit",
  };


const features = () => {

    return (
        <>
            <div className="pb-20 pt-10">
                <About />
            </div>
        </>
    )
}

export default features;