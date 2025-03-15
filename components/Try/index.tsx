"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import GroupAvailabilityTable from "./GroupAvailabilityTable"
import EventCompletedView from "./EventCompletedView"
import { UserRound, Calendar, CheckCircle } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

// Mock data
const MOCK_EVENT = {
  id: 123,
  name: "Team Planning Meeting",
  start_time: "09:00",
  end_time: "18:00",
  creator_id: 1,
  dates: ["2025-03-15", "2025-03-16", "2025-03-17", "2025-03-18", "2025-03-19"],
}

const MOCK_USER = {
  id: 1,
  name: "Current User",
}

const MOCK_GROUP_DATA = {
  "2025-03-15": {
    "09:00": ["John Doe", "Jane Smith", "Alex Johnson"],
    "09:30": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "10:00": ["John Doe", "Jane Smith"],
    "10:30": ["John Doe", "Jane Smith", "Sarah Williams"],
    "11:00": ["Alex Johnson", "Sarah Williams"],
    "11:30": ["Alex Johnson"],
    "12:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "12:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "13:00": ["Jane Smith"],
    "13:30": ["Jane Smith", "Sarah Williams"],
    "14:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "14:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "15:00": ["John Doe", "Alex Johnson", "Sarah Williams"],
    "15:30": ["John Doe", "Alex Johnson"],
    "16:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "16:30": ["Jane Smith", "Sarah Williams"],
    "17:00": ["John Doe", "Jane Smith", "Alex Johnson"],
    "17:30": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
  },
  "2025-03-16": {
    "09:00": ["Jane Smith", "Sarah Williams"],
    "09:30": ["Jane Smith", "Sarah Williams"],
    "10:00": ["John Doe", "Alex Johnson"],
    "10:30": ["John Doe", "Alex Johnson", "Sarah Williams"],
    "11:00": ["John Doe", "Jane Smith", "Alex Johnson"],
    "11:30": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "12:00": ["John Doe", "Jane Smith"],
    "12:30": ["John Doe", "Jane Smith", "Sarah Williams"],
    "13:00": ["Alex Johnson", "Sarah Williams"],
    "13:30": ["Alex Johnson"],
    "14:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "14:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "15:00": ["Jane Smith"],
    "15:30": ["Jane Smith", "Sarah Williams"],
    "16:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "16:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "17:00": ["John Doe", "Alex Johnson", "Sarah Williams"],
    "17:30": ["John Doe", "Alex Johnson"],
  },
  "2025-03-17": {
    "09:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "09:30": ["Jane Smith", "Sarah Williams"],
    "10:00": ["John Doe", "Jane Smith", "Alex Johnson"],
    "10:30": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "11:00": ["John Doe", "Jane Smith"],
    "11:30": ["John Doe", "Jane Smith", "Sarah Williams"],
    "12:00": ["Alex Johnson", "Sarah Williams"],
    "12:30": ["Alex Johnson"],
    "13:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "13:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "14:00": ["Jane Smith"],
    "14:30": ["Jane Smith", "Sarah Williams"],
    "15:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "15:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "16:00": ["John Doe", "Alex Johnson", "Sarah Williams"],
    "16:30": ["John Doe", "Alex Johnson"],
    "17:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "17:30": ["Jane Smith", "Sarah Williams"],
  },
  "2025-03-18": {
    "09:00": ["John Doe", "Jane Smith", "Alex Johnson"],
    "09:30": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "10:00": ["John Doe", "Jane Smith"],
    "10:30": ["John Doe", "Jane Smith", "Sarah Williams"],
    "11:00": ["Alex Johnson", "Sarah Williams"],
    "11:30": ["Alex Johnson"],
    "12:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "12:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "13:00": ["Jane Smith"],
    "13:30": ["Jane Smith", "Sarah Williams"],
    "14:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "14:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "15:00": ["John Doe", "Alex Johnson", "Sarah Williams"],
    "15:30": ["John Doe", "Alex Johnson"],
    "16:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "16:30": ["Jane Smith", "Sarah Williams"],
    "17:00": ["John Doe", "Jane Smith", "Alex Johnson"],
    "17:30": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
  },
  "2025-03-19": {
    "09:00": ["Jane Smith", "Sarah Williams"],
    "09:30": ["Jane Smith", "Sarah Williams"],
    "10:00": ["John Doe", "Alex Johnson"],
    "10:30": ["John Doe", "Alex Johnson", "Sarah Williams"],
    "11:00": ["John Doe", "Jane Smith", "Alex Johnson"],
    "11:30": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "12:00": ["John Doe", "Jane Smith"],
    "12:30": ["John Doe", "Jane Smith", "Sarah Williams"],
    "13:00": ["Alex Johnson", "Sarah Williams"],
    "13:30": ["Alex Johnson"],
    "14:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "14:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "15:00": ["Jane Smith"],
    "15:30": ["Jane Smith", "Sarah Williams"],
    "16:00": ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Williams"],
    "16:30": ["John Doe", "Jane Smith", "Alex Johnson"],
    "17:00": ["John Doe", "Alex Johnson", "Sarah Williams"],
    "17:30": ["John Doe", "Alex Johnson"],
  },
}

interface Event {
  name: string
  start_time: string
  end_time: string
  dates: string[]
  id: number
  creator_id?: number
}

interface User {
  id: number
  name: string
}

const GroupAvailabilityPage = () => {
  const [eventData, setEventData] = useState<Event | null>(null)
  const [groupData, setGroupData] = useState<{ [key: string]: { [key: string]: string[] } }>({})
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isCreator, setIsCreator] = useState(false)
  const [selectedWinningDate, setSelectedWinningDate] = useState<string | null>(null)
  const [selectedWinningTime, setSelectedWinningTime] = useState<string | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: "success" | "error"
  } | null>(null)
  const [isEventCompleted, setIsEventCompleted] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<string[]>([])

  const router = useRouter()
  const param = useParams()
  const id = param.id || "123" // Default to mock ID if not provided

  useEffect(() => {
    // Use mock data instead of API calls
    setCurrentUser(MOCK_USER)
    setEventData(MOCK_EVENT)
    setGroupData(MOCK_GROUP_DATA)

    // Check if current user is the creator
    if (MOCK_USER.id === MOCK_EVENT.creator_id) {
      setIsCreator(true)
    }
  }, [])

  const handleSelectWinningTime = (date: string, time: string) => {
    setSelectedWinningDate(date)
    setSelectedWinningTime(time)

    // Get available users for this time slot
    const users = groupData[date]?.[time] || []
    setAvailableUsers(users)

    setIsConfirmDialogOpen(true)
  }

  const handleConfirmWinningTime = async () => {
    if (!selectedWinningDate || !selectedWinningTime) return

    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false)
      setIsConfirmDialogOpen(false)

      // Set event as completed
      setIsEventCompleted(true)
    }, 1000)
  }

  // If event is completed, show the completion view
  if (isEventCompleted && eventData) {
    return (
      <EventCompletedView
        eventName={eventData.name}
        finalDate={selectedWinningDate || ""}
        finalTime={selectedWinningTime || ""}
        availableUsers={availableUsers}
        eventId={id.toString()}
      />
    )
  }

  return (
    <section id="group-availability" className="px-2 sm:px-4 md:px-8 2xl:px-0">
      <div className="relative mx-auto max-w-c-1390 px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
          <Image src="/images/shape/shape-dotted-light.svg" alt="Dotted" className="dark:hidden" fill />
          <Image src="/images/shape/shape-dotted-dark.svg" alt="Dotted" className="hidden dark:block" fill />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center mb-15 gap-4 sm:gap-6 md:gap-8 lg:gap-22">
        <div className="flex flex-col justify-center items-center mt-4 sm:mt-6 md:mt-8 lg:mt-5 text-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 font-bold text-black dark:text-white lg:mb-5">
            <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
              {eventData?.name}
            </span>
            {"  "}- Group Availability
          </h1>
          <p className="text-base sm:text-md md:text-lg mb-4 sm:mb-6 md:mb-8 lg:w-2/3">
            Here's an overview of the group's availability. Hover over a time slot to see who's available.
            {isCreator && (
              <span className="block mt-2 text-primary font-medium">
                As the event creator, you can select the final date and time to close the poll.
              </span>
            )}
          </p>
        </div>
      </div>

      {eventData && (
        <GroupAvailabilityTable
          dates={eventData.dates}
          startTime={eventData.start_time || ""}
          endTime={eventData.end_time || ""}
          groupData={groupData}
          isCreator={isCreator}
          onSelectWinningTime={handleSelectWinningTime}
        />
      )}

      <div className="flex justify-center items-center mt-8 mb-12 gap-4 flex-wrap">
        <a
          href={`/event/${id}`}
          className="flex items-center gap-2 mt-4 bg-primarygradient-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primarygradient-600 focus:ring-opacity-50"
        >
          <UserRound className="w-5 h-5" aria-hidden="true" />
          <span className="text-sm">View Your Availability</span>
        </a>
      </div>

      {/* Custom Confirmation Dialog */}
      {isConfirmDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-6 shadow-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Confirm Final Date and Time</h3>
            <div className="py-4">
              <p className="mb-4">Are you sure you want to select this as the final date and time for the event?</p>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">{selectedWinningDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">{selectedWinningTime}</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                This will close the poll and notify all participants of the final date and time.
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsConfirmDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWinningTime}
                disabled={isLoading}
                className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Processing..." : "Confirm Selection"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Notification */}
      {notification && notification.show && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg max-w-md z-50 ${
            notification.type === "success"
              ? "bg-green-100 border-green-500 text-green-800"
              : "bg-red-100 border-red-500 text-red-800"
          } border-l-4`}
        >
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="ml-auto pl-3 text-gray-500 hover:text-gray-800">
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default GroupAvailabilityPage

