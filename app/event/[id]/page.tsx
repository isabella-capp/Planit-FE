import React from "react";
import EventPage from "@/components/EventPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Event Page - Planit",
};

const Event = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <EventPage eventName="Team Meeting" userName="John Doe" />
        </main>
    );
};

export default Event;
