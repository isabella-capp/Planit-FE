"use client"
import { ArrowRight } from "lucide-react";
import TimeSelector, { type SelectedTimes } from "./TimeSelector";
import DateSelector, { type SelectionMode } from "./DateSelector";
import { Calendar, type SelectedDates } from "./Calendar";
import React, { useEffect, useState } from "react";
import { generateDates } from "@/types/dateUtils";

interface EventFormProps {
    navigator: (id: string) => void;
}

const EventForm = ({ navigator }: EventFormProps) => {
    const [mode, setMode] = useState<SelectionMode>('specific')
    const [name, setName] = useState<string>('')
    const [selectedDates, setSelectedDates] = useState<SelectedDates>({
        specificDates: [],
        range: {
            start: null,
            end: null,
        },
    })

    const [selectedTimes, setSelectedTimes] = useState<SelectedTimes>({
        startTime: '9:00',
        endTime: '20:00',
    })


    const handleDatesChange = (dates: SelectedDates) => {
        setSelectedDates(dates)
    }

    const handleTimeChange = (times: SelectedTimes) => {
        setSelectedTimes(times)
    }

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const dates = generateDates(mode, selectedDates);

            if (dates.length === 0) {
                alert("Please select at least one date.");
                return;
            }

            const datesJSON = JSON.stringify(dates);

            const response = await fetch('http://127.0.0.1:5000/private/create_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({ name, selectedTimes, datesJSON }),
            });

            if (!response.ok) {
                throw new Error(`Error creating event: ${response.status}`);
            }

            const result = await response.json();

            const eventId = result.event_id;
            if (!eventId) {
                throw new Error("No event ID returned from server.");
            }

            alert(`Evento creato con successo! ID evento: ${eventId}`);
            navigator(eventId); 
        } catch (error) {
            if (error instanceof Error) {
                alert("Error Creating Event:" + error.message);
            } else {
                alert("Unknown error during event creation");
            }
        }
    }

    useEffect(() => {
        setSelectedDates({
            specificDates: [],
            range: {
                start: null,
                end: null,
            },
        });
    }, [mode]);

    return (
        <>
            <h2 className="mb-6 text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2 md:text-3xl md:mb-8">
                New Event
            </h2>

            <form onSubmit={handleCreateEvent}>
                <div className="mb-7.5 flex flex-col gap-3 lg:flex-1">
                    <label className="font-medium text-black dark:text-white">Event Name</label>
                    <input
                        required
                        type="text"
                        placeholder="Name your event..."
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-2 rounded-lg border-stroke bg-transparent p-3 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                    />
                </div>

                <TimeSelector onTimeSelect={handleTimeChange} />

                <div className="mb-7.5 flex flex-col gap-3">
                    <label className="font-medium text-black dark:text-white">What dates might work?</label>
                    <DateSelector onModeChange={setMode} />
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
                            type = "submit"
                        >
                            create event
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EventForm;