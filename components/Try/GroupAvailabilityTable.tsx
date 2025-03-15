"use client"

import React, { useState, useRef, useEffect } from "react"
import { generateTimeSlotsGroup, formatDate } from "@/types/dateUtils"
import { CalendarDays, Clock, UserCheck, CheckCircle } from "lucide-react"
import getNextColor from "@/types/colorUtils"

interface GroupAvailabilityTableProps {
    dates: string[]
    startTime: string
    endTime: string
    groupData: {
        [key: string]: {
            [key: string]: string[]
        }
    }
    isCreator?: boolean
    onSelectWinningTime?: (date: string, time: string) => void
}

const GroupAvailabilityTable: React.FC<GroupAvailabilityTableProps> = ({
    dates,
    startTime,
    endTime,
    groupData,
    isCreator = false,
    onSelectWinningTime,
}) => {
    const [popupInfo, setPopupInfo] = useState<{ date: string; time: string } | null>(null)
    const [selectionMode, setSelectionMode] = useState(false)
    const timeSlots = generateTimeSlotsGroup(startTime, endTime)
    const tableRef = useRef<HTMLDivElement>(null)

    const getAvailableUsers = (date: string, time: string) => {
        return groupData[date]?.[time] || []
    }

    const stringAvailableUsers = (date: string, time: string) => {
        const users = getAvailableUsers(date, time)
        return users.join(", ") // Join the names with a comma and space
    }

    const maxAvailability = Object.values(groupData).reduce((max, dayData) => {
        const dailyMax = Object.values(dayData).reduce((dayMax, timeUsers) => Math.max(dayMax, timeUsers.length), 0)
        return Math.max(max, dailyMax)
    }, 0)

    const getCellColor = (date: string, time: string) => {
        const availableUsers = getAvailableUsers(date, time)
        const availabilityCount = availableUsers.length

        return getNextColor(availabilityCount, maxAvailability)
    }

    const handleCellClick = (date: string, time: string) => {
        if (selectionMode && isCreator && onSelectWinningTime) {
            onSelectWinningTime(date, time)
            setSelectionMode(false)
        } else {
            console.log("Cell clicked:", date, time)
            setPopupInfo({ date, time })
        }
    }

    const toggleSelectionMode = () => {
        setSelectionMode(!selectionMode)
        // Close any open popup when entering selection mode
        if (!selectionMode) {
            setPopupInfo(null)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
                setPopupInfo(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="flex flex-col gap-3 justify-center items-center m-10">

            {isCreator && (
                <div className="w-full max-w-3xl mb-4">
                    <button
                        onClick={toggleSelectionMode}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium ${selectionMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-primary hover:bg-primary-dark text-white"
                            } transition-colors`}
                    >
                        <CheckCircle className="h-4 w-4" />
                        {selectionMode ? "Cancel Selection" : "Select Final Date & Time"}
                    </button>
                    {selectionMode && (
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Click on a time slot to select it as the final date and time for this event.
                        </p>
                    )}
                </div>
            )}

            <div
                ref={tableRef}
                className="bg-white shadow-3xl rounded-xl dark:bg-black overflow-x-auto border border-stroke dark:border-strokedark"
            >
                <div>
                    <div
                        className="grid gap-3 text-center m-2 sm:m-3 md:m-5"
                        style={{ gridTemplateColumns: `70px repeat(${dates.length}, 90px)` }}
                    >
                        <div></div>
                        {dates.map((date, index) => {
                            const { weekday, day } = formatDate(date)
                            return (
                                <div key={index} className="flex flex-col">
                                    <p className="text-xs sm:text-sm md:text-base dark:text-white">{weekday}</p>
                                    <p className="text-xs sm:text-sm md:text-base font-semibold dark:text-white">{day}</p>
                                </div>
                            )
                        })}

                        {timeSlots.map((time, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                <div className="text-xs sm:text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
                                    {time}
                                </div>
                                {dates.map((date, colIndex) => (
                                    <div key={colIndex} className="flex flex-col items-center gap-1">
                                        <div
                                            style={{ backgroundColor: getCellColor(date, time) }}
                                            className={`relative w-full h-6 sm:h-7 md:h-8 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer ${selectionMode ? "hover:ring-2 hover:ring-primary hover:ring-opacity-70" : ""
                                                }`}
                                            onClick={() => handleCellClick(date, time)}
                                        />
                                        <div
                                            style={{ backgroundColor: getCellColor(date, `${time.substring(0, 2)}:30`) }}
                                            className={`relative w-full h-6 sm:h-7 md:h-8 border border-gray-300 dark:border-gray-600 rounded-md transition-colors cursor-pointer ${selectionMode ? "hover:ring-2 hover:ring-primary hover:ring-opacity-70" : ""
                                                }`}
                                            onClick={() => handleCellClick(date, `${time.substring(0, 2)}:30`)}
                                        />
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                {popupInfo && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-4 shadow-lg max-w-sm w-full mx-4">
                            <div className="flex flex-row gap-2 mb-3 text-gray-900 dark:text-white">
                                <UserCheck />
                                <h3 className="text-lg font-semibold mb-2">Available Users</h3>
                            </div>
                            <div className="flex flex-row gap-2 mb-2 text-gray-900 dark:text-white">
                                <CalendarDays className="h-4 w-4" />
                                <p className="text-sm">Date: {popupInfo.date}</p>
                            </div>
                            <div className="flex flex-row gap-2 mb-5 text-gray-900 dark:text-white">
                                <Clock className="h-4 w-4" />
                                <p className="text-sm">Time: {popupInfo.time}</p>
                            </div>
                            <p className="text-sm mb-2 text-gray-800 dark:text-gray-200 mt-2">
                                {stringAvailableUsers(popupInfo.date, popupInfo.time) || "No one available"}
                            </p>
                            <div className="flex justify-end gap-2">
                                {isCreator && (
                                    <button
                                        onClick={() => {
                                            if (onSelectWinningTime) {
                                                onSelectWinningTime(popupInfo.date, popupInfo.time)
                                            }
                                            setPopupInfo(null)
                                        }}
                                        className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors"
                                    >
                                        Select as Final
                                    </button>
                                )}
                                <button
                                    onClick={() => setPopupInfo(null)}
                                    className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GroupAvailabilityTable

