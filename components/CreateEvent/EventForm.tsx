"use client"
import { ArrowRight } from "lucide-react";
import TimeSelector, { type SelectedTimes } from "./TimeSelector";
import DateSelector, { type SelectionMode } from "./DateSelector";
import { Calendar, type SelectedDates} from "./Calendar";
import { useState } from "react";


const EventForm = () => {
    const [mode, setMode] = useState<SelectionMode>('specific')
    const [selectedDates, setSelectedDates] = useState<SelectedDates>({
        specificDates: [],
        range: {
          start: null,
          end: null,
        },
      })

    const[SelectedTimes, setSelectedTimes] = useState<SelectedTimes>({
        startTime: '9:00',
        endTime: '20:00',
    })


    const handleDatesChange = (dates: SelectedDates) => {
        setSelectedDates(dates)
    }

    const handleTimeChange = (times: SelectedTimes) => {
        setSelectedTimes(times)
    }
    
    return (
        <>
            <h2 className="mb-6 text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2 md:text-3xl md:mb-8">
                New Event
            </h2>

            <form>
                <div className="mb-7.5 flex flex-col gap-3 lg:flex-1">
                    <label className="font-medium text-black dark:text-white">Event Name</label>
                    <input
                        type="text"
                        placeholder="Name your event..."
                        className="w-full border-2 rounded-lg border-stroke bg-transparent p-3 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                    />
                </div>
               
                <TimeSelector onTimeSelect={handleTimeChange}/>
                
                <div className="mb-7.5 flex flex-col gap-3">
                    <label className="font-medium text-black dark:text-white">What dates might work?</label>
                    <DateSelector onModeChange={setMode}/>
                </div>
                <div className="mb-7 flex flex-col gap-3">
                    <label>{mode == 'specific' ? 'Click to select multiple dates' : 'Select a date range'}</label>
                    <Calendar mode={mode} onDatesChange={handleDatesChange} />
                </div>

                <div className="flex flex-wrap gap-8 xl:justify-between">
                    <div className="w-full flex justify-end">
                        <button
                            aria-label="send message"
                            className="inline-flex text-sm md:text-base items-center gap-2.5 rounded-full font-bold border-[3px] bg-[#0088cc] border-[#0088cc] px-6 py-2 text-white duration-300 ease-in-out hover:bg-transparent hover:text-[#0088cc] dark:hover:bg-btndark-hover"
                        >
                            Send Message
                            <ArrowRight/>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EventForm;