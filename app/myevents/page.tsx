import MyEvents from "@/components/MyEvents";
import React from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "My Event Page - Planit",
};
  
const NewEvent = () => {
    
    return (
        <div className="pb-20 pt-10">
            <MyEvents />
        </div>
    );
};

export default NewEvent;
