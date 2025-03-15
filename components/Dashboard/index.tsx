"use client"
import { useSession } from "@/types/useSession";
import { col } from "framer-motion/client";
import { CalendarPlus, ChevronRight, Clock10 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
    name: string;
    start_time: string;
    end_time: string;
    id: number;
    user_id: number;
    partecipants: number;
}

interface Results {
    id: number
    name: string
    is_completed: boolean
    final_date?: string
    final_time?: string
    participant_count: number
    created_at: string
}

export default function Dashboard() {
    const { userId } = useSession()
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);
    const [events, setEvents] = useState<Results[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

        const myevents = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(`http://127.0.0.1:5000/private/user/admin/event`, {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await response.json();

                if (data && data.events) {
                    const parsedEvents: Event[] = data.events.slice(0, 3).map((event: any) => ({
                        id: event.id,  // Cambio il nome della chiave
                        name: event.name,
                        start_time: event.start_time,
                        end_time: event.end_time,
                        partecipants: event.partecipants,
                    }));

                    setMyEvents(parsedEvents);
                } else {
                    setMyEvents([]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        myevents();
    }, [userId]);

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
                    }));

                    setParticipatedEvents(parsedEvents);
                } else {
                    setParticipatedEvents([]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserEvents();
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        const getEventResults = async () => {
            try {
                setIsLoading(true);
                // Esegui la richiesta fetch all'endpoint
                const response = await fetch(`http://127.0.0.1:5000/private/user/results/${userId}`);

                // Verifica se la risposta è andata a buon fine
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                // Ottieni i dati dalla risposta JSON
                const data = await response.json();

                // Verifica se sono presenti risultati
                if (data.results) {
                    console.log("Event Results:", data.results);
                    const parsedEvents: Results[] = data.results.slice(0, 3).map((event: any) => {
                        return {
                            id: event.id,
                            name: event.event_name,
                            is_completed: event.is_completed,
                            final_date: event.final_date || undefined,  // Imposto final_date se presente
                            final_time: event.final_time || undefined,  // Imposto final_time se presente
                            participant_count: event.partecipants || 0, // Imposto a 0 se non presente
                            created_at: event.created_at || "", // Imposto a "" se non presente
                        };
                    });

                    setEvents(parsedEvents);
                } else {
                    console.error("No results found for the event");
                }
            } catch (error) {
                // Gestione degli errori
                console.error("Failed to fetch event results:", error);
            } finally {
                setIsLoading(false);
            }
        }

        getEventResults();
    }, [userId]);


    return (
        <>
            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-6 grid-cols-2">
                    {/* Create Event Card */}
                    <Link href="/newevent">
                        <div className="flex flex-col h-full rounded-lg bg-gradient-to-t border border-gray-200 dark:border-strokedark dark:bg-gradient-to-t dark:from-[#252a428d] dark:to-[#252A42] p-6 shadow-sm ">
                            <div className="space-y-2 pb-2">
                                <h3 className="text-xl font-semibold text-black dark:text-white">Create Event</h3>
                                <p >Start planning your next event</p>
                            </div>
                            <div className="my-3 flex-grow flex items-center justify-center rounded-md border-2 border-dashed border-stroke dark:border-strokedark bg-zumthor dark:bg-btndark hover:bg-[#e6f1ff] hover:dark:bg-blackho">
                                <CalendarPlus className="h-10 w-10 text-primary" />
                            </div>

                        </div>
                    </Link>


                    {/* My Events Card */}
                    <div className="min-h-[300px] flex flex-col h-full rounded-lg bg-gradient-to-t border border-gray-200 dark:border-strokedark dark:bg-gradient-to-t dark:from-[#252a428d] dark:to-[#252A42] p-6 shadow-sm ">
                        <div className="space-y-2 pb-2">
                            <h3 className="text-xl font-semibold text-black dark:text-white">My Events</h3>
                            <p>Events you've created</p>
                        </div>
                        <div className="py-3 space-y-2 flex-grow">
                            {myEvents.length > 0 ? (
                                myEvents.map((event) => (
                                    <Link key={event.id} href={`/event/${event.id}`} className="block w-full">
                                        <div key={event.id} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-500 p-3">
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-strokedark dark:text-stroke">{event.name}</p>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <Clock10 width={12} height={12} />
                                                    <p className="text-xs"> {event.start_time} - {event.end_time}</p>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center rounded-full border border-gray-200 dark:text-stroke dark:bg-blackho dark:border-gray-500 px-2.5 py-1 text-xs font-medium">
                                                {event.partecipants} participants
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="flex flex-grow items-center justify-center rounded-md border-2 border-dashed border-stroke dark:border-strokedark bg-zumthor dark:bg-btndark hover:bg-[#e6f1ff] hover:dark:bg-blackho h-full">
                                    No events created
                                </div>
                            )}
                        </div>
                        <div className="pt-4 mt-auto">
                            <Link
                                href="/dashboard/myevents"
                                className="flex w-full items-center justify-between text-sm font-medium hover:text-primary"
                            >
                                View All <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Participated Events Card */}
                    <div className="flex flex-col h-full rounded-lg bg-gradient-to-t border border-gray-200 dark:border-strokedark dark:bg-gradient-to-t dark:from-[#252a428d] dark:to-[#252A42] p-6 shadow-sm ">
                        <div className="space-y-2 pb-2">
                            <h3 className="text-xl font-semibold text-black dark:text-white">Participated Events</h3>
                            <p>Events you've attended</p>
                        </div>
                        <div className="py-4 space-y-2 flex-grow">
                            {participatedEvents.length > 0 ? (
                                participatedEvents.map((event) => (
                                    <Link key={event.id} href={`/event/${event.id}`} className="block w-full">
                                        <div
                                            key={event.id}
                                            className="flex items-center rounded-lg border border-gray-200 dark:border-gray-500 p-3"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-strokedark dark:text-stroke">{event.name}</p>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <Clock10 width={12} height={12} />
                                                    <p className="text-xs">
                                                        {" "}
                                                        {event.start_time} - {event.end_time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="flex flex-grow items-center justify-center rounded-md border-2 border-dashed border-stroke dark:border-strokedark bg-zumthor dark:bg-btndark hover:bg-[#e6f1ff] hover:dark:bg-blackho h-full">
                                    No events attended
                                </div>
                            )}
                        </div>
                        <div className="pt-4 mt-auto">
                            <Link
                                href="/dashboard/participated-events"
                                className="flex w-full items-center justify-between text-sm font-medium hover:text-primary"
                            >
                                View All <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Upcoming Events Card */}
                    <div className="flex flex-col h-full rounded-lg bg-gradient-to-t border border-gray-200 dark:border-strokedark dark:bg-gradient-to-t dark:from-[#252a428d] dark:to-[#252A42] p-6 shadow-sm">
                        <div className="space-y-2 pb-2">
                            <h3 className="text-xl font-semibold text-black dark:text-white">Final Results</h3>
                            <p>View the results of the polls you participated in </p>
                        </div>
                        <div className="py-4 space-y-2">
                            {events.slice(0, 3).map((event) => (
                                <div key={event.id} className="flex items-center rounded-lg border border-gray-200 dark:border-gray-500 p-3">
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-strokedark dark:text-stroke">{event.name}</p>
                                        {event.is_completed ? (
                                            <div className="flex flex-row gap-5 items-center">
                                                <div className="flex items-center gap-2">
                                                    <CalendarPlus width={12} height={12} />
                                                    <p className="text-xs">
                                                        {event.final_date}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock10 width={12} height={12} />
                                                    <p className="text-xs">
                                                        {event.final_time}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-xs">Poll still open</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <Link
                                href="/dashboard/results"
                                className="flex w-full items-center justify-between text-sm font-medium hover:text-primary"
                            >
                                View All <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}