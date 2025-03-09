"use client"
import { CalendarPlus, ChevronRight, Clock10 } from "lucide-react";
import Link from "next/link";


export default function Dashboard() {
    // Mock data for events
    const myEvents = [
        { id: 1, title: "Team Building Workshop", date: "2025-03-15", participants: 12 },
        { id: 2, title: "Product Launch", date: "2025-04-10", participants: 45 },
        { id: 3, title: "Annual Conference", date: "2025-05-20", participants: 120 },
    ]


    const participatedEvents = [
        { id: 4, title: "Tech Meetup", date: "2025-02-10", organizer: "Tech Community" },
        { id: 5, title: "Design Workshop", date: "2025-01-25", organizer: "Creative Hub" },
        { id: 6, title: "Networking Lunch", date: "2025-02-28", organizer: "Business Network" },
    ]

    const upcomingEvents = [
        { id: 7, title: "Industry Conference", date: "2025-04-05", category: "Technology" },
        { id: 8, title: "Charity Fundraiser", date: "2025-03-20", category: "Community" },
        { id: 9, title: "Workshop Series", date: "2025-03-12", category: "Education" },
    ]

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
                            <div className="flex-grow flex items-center justify-center rounded-md border-2 border-dashed border-stroke dark:border-strokedark bg-zumthor dark:bg-btndark hover:bg-[#e6f1ff] hover:dark:bg-blackho">
                                <CalendarPlus className="h-10 w-10 text-primary" />
                            </div>

                        </div>
                    </Link>
               

                    {/* My Events Card */}
                    <div className="flex flex-col h-full rounded-lg bg-gradient-to-t border border-gray-200 dark:border-strokedark dark:bg-gradient-to-t dark:from-[#252a428d] dark:to-[#252A42] p-6 shadow-sm ">
                        <div className="space-y-2 pb-2">
                            <h3 className="text-xl font-semibold text-black dark:text-white">My Events</h3>
                            <p>Events you've created</p>
                        </div>
                        <div className="py-4 space-y-2">
                            {myEvents.slice(0, 3).map((event) => (
                                <div key={event.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-2">
                                    <div className="space-y-1">
                                        <div className="flex flex-row gap-3 items-center">
                                           <Clock10 width={16} height={16} />
                                           <p className="text-sm"> 9:00 - 12:00</p>
                                        </div>
                                        <p className="text-xs">{event.date}</p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium">
                                        {event.participants} participants
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <Link
                                href="/events/my-events"
                                className="flex w-full items-center justify-between text-sm font-medium text-gray-600 hover:text-blue-600"
                            >
                                View All <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Participated Events Card */}
                    <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="space-y-2 pb-2">
                            <h3 className="text-xl font-semibold text-gray-900">Participated Events</h3>
                            <p className="text-sm text-gray-500">Events you've attended</p>
                        </div>
                        <div className="py-4 space-y-2">
                            {participatedEvents.slice(0, 3).map((event) => (
                                <div key={event.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-2">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                        <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-xs text-gray-500">{event.organizer}</div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <Link
                                href="/events/participated"
                                className="flex w-full items-center justify-between text-sm font-medium text-gray-600 hover:text-blue-600"
                            >
                                View All <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Upcoming Events Card */}
                    <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="space-y-2 pb-2">
                            <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
                            <p className="text-sm text-gray-500">Events you might be interested in</p>
                        </div>
                        <div className="py-4 space-y-2">
                            {upcomingEvents.slice(0, 3).map((event) => (
                                <div key={event.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-2">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                        <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                        {event.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <Link
                                href="/events/discover"
                                className="flex w-full items-center justify-between text-sm font-medium text-gray-600 hover:text-blue-600"
                            >
                                Discover More <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}