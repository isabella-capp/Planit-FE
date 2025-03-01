import { useEffect, useState } from "react";

export type SelectedTimes = {
  startTime: string;
  endTime: string;
}

interface TimeProps {
  onTimeSelect: (times: SelectedTimes) => void
}

const TimeSelector = ({onTimeSelect}: TimeProps) => {
    const [view, setView] = useState<"dates-times" | "dates-only">("dates-times");
    const[selectedTimes, setSelectedTimes] = useState<SelectedTimes>({
        startTime: '9:00',
        endTime: '20:00',
    })

    const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => {
        const hour = Math.floor(i / 2) + 1; 
        const minutes = i % 2 === 0 ? "00" : "30"; 
        return `${hour}:${minutes}`;
      });

    useEffect(() => {
        onTimeSelect(selectedTimes)
      }, [selectedTimes, onTimeSelect])
    

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
                        onChange={(event) => setSelectedTimes({ ...selectedTimes, startTime: event.target.value })}
                        defaultValue="9:00"
                        className="text-center border-2 rounded-lg border-stroke p-3 dark:text-white dark:bg-btndark dark:border-strokedark"
                    >
                        {timeSlots.map((time, index) => (
                            <option key={index}>{time}</option>
                        ))}
                    </select>
                    <select
                        onChange={(event) => setSelectedTimes({ ...selectedTimes, endTime: event.target.value })}
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