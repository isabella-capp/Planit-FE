import React from "react";
import { Metadata } from "next";
import FAQpage from "@/components/FAQ/FAQpage";
import Try from "@/components/Try";

export const metadata: Metadata = {
    title: "FAQ - Planit",
  };


const Prova = () => {

    return (
        <>
            <div className="pb-20 pt-10">
                <Try />
            </div>
        </>
    )
}

export default Prova;