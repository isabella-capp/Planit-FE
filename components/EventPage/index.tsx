'use client'
import Image from 'next/image';
import TimeSlotsTable from './TimeSlotsTable';
import { UsersRound } from 'lucide-react';
import { useParams } from "next/navigation";

interface EventPageProps {
    eventName: string;
    userName: string;
}

const EventPage: React.FC<EventPageProps> = ({ eventName, userName }) => {
    const dates = ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05'];
    const startTime = '09:00';
    const endTime = '17:00';
    const params = useParams();
    const id = params.id;

    return (
        <section id="event" className="px-4 md:px-8 2xl:px-0">
            <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20 lg:flex-row">
                <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
                    <Image
                        src="/images/shape/shape-dotted-light.svg"
                        alt="Dotted"
                        className="dark:hidden"
                        fill
                    />
                    <Image
                        src="/images/shape/shape-dotted-dark.svg"
                        alt="Dotted"
                        className="hidden dark:block"
                        fill
                    />
                </div>
            </div>

            <div className="flex flex-col w-full justify-center items-center lg:flex-row">
                <div className="mt-5 mb-5 lg:mt-5 text-center">
                    <h1 className="mb-5 text-3xl text-center font-bold text-black dark:text-white xl:text-hero ">
                        <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                            {eventName}
                        </span>
                    </h1>
                    <h1 className="text-4xl mb-3 font-bold text-black dark:text-white"></h1>
                    <h2 className="text-2xl mb-3 font-bold text-black dark:text-white">Welcome, {userName}!</h2>
                    <p className="text-lg mb-8">Please select your availability from the time slots below.</p>
                </div>
            </div>

            <TimeSlotsTable dates={dates} startTime={startTime} endTime={endTime} />
            <div className="flex justify-center items-center mt-8 mb-12">
                <a href={`/event/availability/${id}`} className="flex items-center gap-2 mt-4 bg-primarygradient-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primarygradient-600 focus:ring-opacity-50">
                    <UsersRound className="w-5 h-5" aria-hidden="true" />
                    <span className="text-sm">View Group Availability</span>
                </a>
            </div>
        </section>
    );
};

export default EventPage;
