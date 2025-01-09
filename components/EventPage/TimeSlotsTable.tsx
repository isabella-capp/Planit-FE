'use client'

import React, { FC, useState } from "react";
import Legend from "./legend";
import { formatDate } from "@/types/dateUtils";

interface TimeSlotsTableProps {
  dates: string[];
  startTime: string;
  endTime: string;
}

const TimeSlotsTable: FC<TimeSlotsTableProps> = ({ dates, startTime, endTime }) => {
  const col = dates.length + 1;

  const generateTimeSlots = (startTime: string, endTime: string) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    return Array.from({ length: endHour - startHour + 1 }, (_, i) => `${startHour + i}:00`);
  };

  const timeSlots = generateTimeSlots(startTime, endTime);
  const [clickedCells, setClickedCells] = useState<boolean[][]>(Array(timeSlots.length * 2).fill([]).map(() => Array(dates.length).fill(false)));

  const handleClickedCells = (row: number, col: number) => {
    const updatedClickedCells = [...clickedCells];
    updatedClickedCells[row][col] = !clickedCells[row][col];
    setClickedCells(updatedClickedCells);
  }

  return (
    <div className="flex flex-col justify-center items-center m-10">
      <Legend />
      <div className="bg-white border border-stroke shadow-3xl rounded-xl p-5 dark:bg-black dark:border-strokedark">
        <div
          className={`grid gap-1 sm:gap-2 md:gap-3 text-center m-2 sm:m-3 md:m-5`}
          style={{ gridTemplateColumns: `70px repeat(${col - 1}, 90px)` }}
        >
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
              <div className="text-xs sm:text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
                {time}
              </div>
              {dates.map((date, colIndex) => {
                return (
                  <div key={colIndex} className="flex flex-col gap-1">
                    <div
                      className={`h-8 border border-gray-300 dark:border-gray-600 rounded-md transition-colors ${clickedCells[rowIndex * 2][colIndex] ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
                      onClick={() => handleClickedCells(rowIndex * 2, colIndex)}
                    ></div>
                    <div
                      className={`h-8 border border-gray-300 dark:border-gray-600 rounded-md transition-colors ${clickedCells[rowIndex * 2 + 1][colIndex] ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
                      onClick={() => handleClickedCells(rowIndex * 2 + 1, colIndex)}
                    ></div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotsTable;

