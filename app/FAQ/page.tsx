import React from "react";
import { Metadata } from "next";
import FAQpage from "@/components/FAQ/FAQpage";

export const metadata: Metadata = {
    title: "FAQ - Planit",
  };


const FAQ = () => {

    return (
        <>
            <div className="pb-20 pt-10">
                <FAQpage />
            </div>
        </>
    )
}

export default FAQ;