"use client"

import { useSession } from "@/types/useSession"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, ChevronRight } from "lucide-react";

interface Event {
    name: string;
    start_time: string;
    end_time: string;
    dates: string[];
    id: number;
}

const participatedEvents = () => {
    const { userId } = useSession()
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserEvents = async () => {
            try {
                setIsLoading(true);

                const response = await fetch("http://127.0.0.1:5000/private/user/events", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await response.json();

                if (data && data.events) {
                    const parsedEvents: Event[] = data.events.map((event: any) => ({
                        id: event.event_id,  // Cambio il nome della chiave
                        name: event.event_name,
                        start_time: event.event_start_time,
                        end_time: event.event_end_time,
                        dates: event.event_dates ? JSON.parse(event.event_dates) : [], // Parsare JSON string → array
                    }));

                    setEvents(parsedEvents);
                } else {
                    setEvents([]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserEvents();
    }, [userId]);

    return (
        <section id="event" className="px-4 md:px-8 xl:px-10 ">
            <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20 lg:flex-row">
            <div className="mt-10 mb-10 lg:mt-0">
                <h2 className="text-sectiontitle4 mb-3 font-bold text-black dark:text-white">Participated Events</h2>
                <div className="flex flex-col gap-3 justify-end lg:flex-row">
                    <p className="inline-flex items-center">Home <ChevronRight className="h-5" /> <span className="font-bold text-primary"> participated-events </span></p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[100px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : error ? (
                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-red-700 dark:text-red-400">{error}</div>
            ) : events.length === 0 ? (
                <div className="p-4 rounded-lg text-center">
                    <p className="text-body-color dark:text-body-color-dark">You don't have any events yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="p-4 shadow-sm border-2 border-stroke dark:border-strokedark  rounded-lg">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                                <div>
                                    <h3 className="font-semibold mb-2 text-black dark:text-white">{event.name}</h3>
                                    <p className="text-sm text-black dark:text-white">
                                        {event.dates.join(", ")} • {event.start_time} - {event.end_time}
                                    </p>
                                </div>
                                <Link
                                    href={`/event/${event.id}`}
                                    className="px-4 py-2 font-bold bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
                                >
                                    View Event
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </section>
    );
};

export default participatedEvents;
