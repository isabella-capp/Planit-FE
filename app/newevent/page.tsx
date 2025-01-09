import CreateEvent from "@/components/CreateEvent";
import React from "react";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "New Event Page - Planit",
};
  
const NewEvent = () => {
    
    return (
        <div className="pb-20 pt-10">
            <CreateEvent />
        </div>
    );
};

export default NewEvent;
