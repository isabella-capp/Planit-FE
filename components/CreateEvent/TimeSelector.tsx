import { useState } from "react";

const TimeSelector = () => {
    const [view, setView] = useState<"dates-times" | "dates-only">("dates-times");
    const [startTime, setStartTime] = useState('9:00');
    const [endTime, setEndTime] = useState('20:00');

    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const hour = i + 1;
        return `${hour}:00`
    });

    return (
        <>
            <div className="flex gap-5 mb-7.5">
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        setView("dates-times")
                    }}
                    className={`flex-1  text-sm md:text-base rounded-3xl font-bold p-2 border-2 transition-all transform duration-500 ${view === "dates-times"
                        ? "bg-[#0088cc] border-[#0088cc] text-white shadow-lg hover:scale-105"
                        : "bg-transparent border-[#0088cc] text-[#0088cc] hover:bg-[#0099e6]/90 hover:border-[#0099e6] hover:text-white"
                        }`}
                >
                    Dates and times
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        setView("dates-only")
                    }}
                    className={`flex-1  text-sm md:text-base  rounded-3xl font-bold p-2 border-2 transition-all transform  duration-500 ${view === "dates-only"
                        ? "bg-[#0088cc] border-[#0088cc] text-white shadow-lg hover:scale-105"
                        : "bg-transparent border-[#0088cc] text-[#0088cc] hover:bg-[#0099e6]/90 hover:border-[#0099e6] hover:text-white"
                        }`}
                >
                    Dates only
                </button>
            </div>
            <div className={`flex flex-col gap-3 mb-7.5 ${view === 'dates-only' ? 'hidden' : 'block'}`}>
                <h3 className="text-md font-medium mb-2 text-black dark:text-white">What times might work?</h3>
                <div className="flex flex-row gap-5">
                    <select
                        onChange={(event) => setStartTime(event.target.value)}
                        defaultValue="9:00"
                        className="text-center border-2 rounded-lg border-stroke p-3 dark:text-white dark:bg-btndark dark:border-strokedark"
                    >
                        {timeSlots.map((time, index) => (
                            <option key={index}>{time}</option>
                        ))}
                    </select>
                    <select
                        onChange={(event) => setEndTime(event.target.value)}
                        defaultValue={"20:00"}
                        className="text-center border-2 rounded-lg border-stroke p-3 dark:text-white dark:bg-btndark dark:border-strokedark"
                    >
                        {timeSlots.map((time, index) => (
                            <option key={index}>{time}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );

}

export default TimeSelector;