'use client'

import React, { FC, useEffect, useState } from "react";
import Legend from "./legend";
import { formatDate, generateTimeSlots } from "@/types/dateUtils";
import { useParams } from "next/navigation";
import { Save, UsersRound } from "lucide-react";

interface TimeSlotsTableProps {
  dates: string[];
  startTime: string;
  endTime: string;
  userId: string;
}

const TimeSlotsTable: FC<TimeSlotsTableProps> = ({ dates, startTime, endTime, userId}) => {
  const params = useParams();
  const id = params.id;
  const col = dates.length + 1;
  const [selectedSlots, setSelectedSlots] = useState<Array<{ date: string; start_time: string; end_time: string }>>([]);

  const timeSlots = generateTimeSlots(startTime, endTime);

  const handleClickedCells = (rowIndex: number, colIndex: number) => {
    const date = dates[colIndex];
    const start_time = timeSlots[rowIndex];
    const end_time = timeSlots[rowIndex + 1] || `${parseInt(start_time.split(":" )[0]) + 1}:00`;
    
    const slot = { date, start_time, end_time };

    setSelectedSlots(prevSlots => {
      const exists = prevSlots.some(s => JSON.stringify(s) === JSON.stringify(slot));
      return exists ? prevSlots.filter(s => JSON.stringify(s) !== JSON.stringify(slot)) : [...prevSlots, slot];
    });
  };

  const saveAvailability = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, event_id: id, slots: selectedSlots }),
      });

      if (response.ok) {
        fetchAvailability();
        console.log("Disponibilità salvata con successo!");
      } else {
        console.error("Errore nel salvataggio");
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const fetchAvailability = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/get_availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, event_id: id }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Disponibilità recuperata con successo:", data);
        setSelectedSlots(data);
      }
    } catch (error) {
      console.error("Errore nel recupero delle disponibilità:", error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center m-10">
      <Legend />
      <div className="bg-white border border-stroke shadow-3xl rounded-xl p-5 dark:bg-black dark:border-strokedark">
        <div className={`grid gap-1 sm:gap-2 text-center`} style={{ gridTemplateColumns: `70px repeat(${col - 1}, 90px)` }}>
          <div></div>
          {dates.map((date, index) => {
            const { weekday, day } = formatDate(date);
            return (
              <div key={index} className="flex flex-col">
                <p className="text-xs sm:text-sm md:text-base dark:text-white">{weekday}</p>
                <p className="text-xs sm:text-sm md:text-base font-semibold dark:text-white">{day}</p>
              </div>
            );
          })}

          {timeSlots.map((time, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div className="text-xs sm:text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">{time}</div>
              {dates.map((date, colIndex) => {
                const isSelected = selectedSlots.some(s => s.date === date && s.start_time === time);
                return (
                  <div key={colIndex} className="flex flex-col gap-1">
                    <div
                      className={`h-8 border border-gray-300 dark:border-gray-600 rounded-md transition-colors ${
                        isSelected ? "bg-primary" : "bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => handleClickedCells(rowIndex, colIndex)}
                    ></div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-8 mb-12 gap-5">
        <a
          href={`/event/availability/${id}`}
          className="flex items-center gap-2 mt-4 bg-primarygradient-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primarygradient-600 focus:ring-opacity-50"
        >
          <UsersRound className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm">View Group Availability</span>
        </a>
        <button 
          onClick={saveAvailability}
          className="flex items-center gap-2 mt-4 text-sm bg-primarygradient-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primarygradient-600 focus:ring-opacity-50"
        >
          <Save className="w-5 h-5" aria-hidden="true" />
          Save Availability
        </button>
      </div>
    </div>
  );
};

export default TimeSlotsTable;
