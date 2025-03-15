"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    Calendar,
    Clock,
    Users,
    ArrowRight,
    Filter,
    Search,
    SortAsc,
    SortDesc,
    CheckCircle,
    HelpCircle,
} from "lucide-react"
import { formatDate } from "@/types/dateUtils"
import { useSession } from "@/types/useSession"

interface Event {
    id: number
    name: string
    is_completed: boolean
    final_date?: string
    final_time?: string
    participant_count: number
    created_at: string
}

const ResultsPage = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null)
    const { userId } = useSession()

    const router = useRouter()

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
                    const parsedEvents: Event[] = data.results.map((event: any) => {
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
                    setFilteredEvents(parsedEvents);
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

    // Apply filters and search
    useEffect(() => {
        let result = [...events]

        // Apply search filter
        if (searchTerm) {
            result = result.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        // Apply completion filter
        if (filterCompleted !== null) {
            result = result.filter((event) => event.is_completed === filterCompleted)
        }


        setFilteredEvents(result)
    }, [events, searchTerm, filterCompleted])

  

    const handleFilterChange = (value: boolean | null) => {
        setFilterCompleted(value)
    }

    // Format date safely
    const safeFormatDate = (dateString?: string) => {
        if (!dateString) return { weekday: "N/A", day: "N/A" }
        try {
            return formatDate(dateString)
        } catch (err) {
            return { weekday: "Invalid", day: "Date" }
        }
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    // Show error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <section className="px-4 py-8 md:px-8 lg:px-12 min-h-screen">
            <div className="max-w-6xl mx-auto">

                <div className="mb-8 mt-20">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Events</h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                        View all events you've participated in. Completed events show the final scheduled date and time.
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-500 h-4 w-4" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleFilterChange(null)}
                                    className={`px-3 py-1 text-xs rounded-full ${filterCompleted === null
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => handleFilterChange(true)}
                                    className={`px-3 py-1 text-xs rounded-full ${filterCompleted === true
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}
                                >
                                    Completed
                                </button>
                                <button
                                    onClick={() => handleFilterChange(false)}
                                    className={`px-3 py-1 text-xs rounded-full ${filterCompleted === false
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}
                                >
                                    Pending
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Events List */}
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            {searchTerm || filterCompleted !== null
                                ? "Try adjusting your filters or search terms"
                                : "You haven't participated in any events yet"}
                        </p>
                        <Link
                            href="/create-event"
                            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                        >
                            Create an Event
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{event.name}</h3>
                                            <div className="flex items-center gap-8">
                                                {event.is_completed ? (
                                                    <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                                                        <CheckCircle className="h-4 w-4" />
                                                        Completed
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
                                                        <HelpCircle className="h-4 w-4" />
                                                        Pending
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                                    <Users className="h-4 w-4" />
                                                    {event.participant_count} participants
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/event/${event.id}`}
                                            className="inline-flex items-center gap-1 text-primary hover:text-primary-dark transition-colors text-sm font-medium"
                                        >
                                            View Details
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>

                                    {event.is_completed && event.final_date && event.final_time ? (
                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Final Schedule</h4>
                                            <div className="flex flex-col sm:flex-row gap-8">
                                                <div className="flex items-center gap-4">
                                                    <Calendar className="h-5 w-5 text-primary" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {safeFormatDate(event.final_date).weekday}, {safeFormatDate(event.final_date).day}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <Clock className="h-5 w-5 text-primary" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {event.final_time || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {event.is_completed
                                                    ? "This event is completed but no final schedule was set."
                                                    : "This event is still collecting availability information."}
                                            </p>
                                            <Link
                                                href={`/event/${event.id}`}
                                                className="inline-block mt-2 text-sm text-primary hover:text-primary-dark transition-colors"
                                            >
                                                {event.is_completed ? "View event details" : "Add your availability"}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ResultsPage

