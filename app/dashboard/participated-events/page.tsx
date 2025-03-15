import MyEvents from "@/components/MyEvents";
import React from "react";
import { Metadata } from "next";
import ParticipatedEvents from "@/components/ParticipatedEvents";


export const metadata: Metadata = {
    title: "Participated Event - Planit",
};
  
const NewEvent = () => {
    
    return (
        <div className="pb-20 pt-10">
            <ParticipatedEvents />
        </div>
    );
};

export default NewEvent;
