"use client"

import type React from "react"
import Image from "next/image"
import { Calendar, Clock, UserCheck, CheckCircle, ArrowLeft, Share2 } from "lucide-react"
import { formatDate } from "@/types/dateUtils"

interface EventCompletedViewProps {
  eventName: string
  finalDate: string
  finalTime: string
  creatorName: string
  eventId: string
}

const EventCompletedView: React.FC<EventCompletedViewProps> = ({
  eventName,
  finalDate,
  finalTime,
  creatorName,
  eventId,
}) => {
  const { weekday, day } = formatDate(finalDate)

  const handleShare = () => {
    // Create share URL
    const shareUrl = window.location.origin + `/event/${eventId}`

    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: `${eventName} - Final Schedule`,
          text: `The final date for ${eventName} is ${day} at ${finalTime}`,
          url: shareUrl,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => alert("Event link copied to clipboard!"))
        .catch((err) => console.error("Could not copy text: ", err))
    }
  }

  return (
    <section className="px-2 sm:px-4 md:px-8 2xl:px-0 min-h-screen flex flex-col">
      <div className="relative mx-auto max-w-c-1390 px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
          <Image src="/images/shape/shape-dotted-light.svg" alt="Dotted" className="dark:hidden" fill />
          <Image src="/images/shape/shape-dotted-dark.svg" alt="Dotted" className="hidden dark:block" fill />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto px-4 py-12">
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary text-white p-6 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Event Completed!</h1>
            <p className="text-lg opacity-90">The final date and time have been selected</p>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {eventName}
            </h2>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Final Date</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {weekday}, {day}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Final Time</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{finalTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserCheck className="h-6 w-6 text-primary mt-1" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Creator</p>
                  <p className="text-base text-gray-900 dark:text-white">
                    {creatorName} 
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back Home</span>
              </a>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventCompletedView

