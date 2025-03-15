import MyEvents from "@/components/MyEvents";
import React from "react";
import { Metadata } from "next";
import ResultsPage from "@/components/ResultsPage";


export const metadata: Metadata = {
    title: "Results Page - Planit",
};
  
const NewEvent = () => {
    
    return (
        <div className="pb-20 pt-10">
            <ResultsPage />
        </div>
    );
};

export default NewEvent;
