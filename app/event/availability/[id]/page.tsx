import GroupAvailabilityPage from "@/components/AvailabilityPage";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Availability Page - Planit",
};

const Availability = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
           <GroupAvailabilityPage />
        </main>
    );
};

export default Availability;