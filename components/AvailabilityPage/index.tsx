'use client'

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import GroupAvailabilityTable from './GroupAvailabilityTable';
import { Calendar, CheckCircle, UserRound } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/types/useSession';
import EventCompletedView from './EventCompletedView';

interface Event {
  name: string;
  user_id: number;
  start_time: string;
  end_time: string;
  dates: string[];
  id: number;
}

interface User {
  id: string
  name: string
}

const GroupAvailabilityPage = () => {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [groupData, setGroupData] = useState<{ [key: string]: { [key: string]: string[] } }>({});
  const [isCreator, setIsCreator] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedWinningDate, setSelectedWinningDate] = useState<string | null>(null)
  const [selectedWinningTime, setSelectedWinningTime] = useState<string | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userAdmin, setUserAdmin] = useState<string | null>(null)
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: "success" | "error"
  } | null>(null)
  const [isEventCompleted, setIsEventCompleted] = useState(false)

  const { user, userId } = useSession();
  const router = useRouter();
  const param = useParams();
  const id = param.id;

  useEffect(() => {
    if (user && userId) {
      console.log("Setting current user:", user, userId);
      const newUser = { id: userId, name: user };
      setCurrentUser(newUser);
      
      if (eventData) {
        setIsCreator(eventData.user_id === Number(newUser.id));
        console.log("Is creator:", eventData.user_id === Number(newUser.id));
      }
      
      if (eventData) {
        getAdminUsername(eventData.user_id);
      }
    }
  }, [user, userId, eventData]);
  
  
  async function getAdminUsername(userId: number) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/get_admin_username/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin username');
      }

      const data = await response.json();
      console.log('Admin username:', data.username);
      setUserAdmin(data.username); // Save the admin username in state
    } catch (error) {
      console.error('Error:', error);
    }
  }


  useEffect(() => {
    if (!id) return; // Aspetta che l'ID sia disponibile

    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/private/event/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 404) {
          console.log("Evento non trovato, reindirizzamento a /error");
          router.push("/error");
          return;
        }

        if (!response.ok) {
          console.error("Errore durante il recupero dei dati dell'evento");
          return;
        }

        const data = await response.json();

        if (data && data.event) {
          const parsedData: Event = {
            ...data.event,
            dates: data.event.dates ? JSON.parse(data.event.dates) : [], // Parsing sicuro
          };

          console.log("Dati parsati:", parsedData);
          setEventData(parsedData);          
        } else {
          console.error("Dati evento non disponibili.");
        }
      } catch (err) {
        console.error("Errore:", err);
      }
    };

    const fetchGroupData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/get_group_availability`, {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventId: id }),
        });

        if (!response.ok) {
          console.error("Errore durante il recupero dei dati di disponibilità del gruppo");
          return;
        }

        const data = await response.json();
        if (data && data.availability) {
          setGroupData(data.availability);
        }
      } catch (err) {
        console.error("Errore:", err);
      }
    };

    fetchEventData();
    fetchGroupData();

  }, [id]);

  const handleSelectWinningTime = (date: string, time: string) => {
    setSelectedWinningDate(date)
    setSelectedWinningTime(time)

    setIsConfirmDialogOpen(true)
  }

  const handleConfirmWinningTime = async () => {
    if (!selectedWinningDate || !selectedWinningTime || !id) return

    setIsLoading(true)

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/close_event_poll`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: id,
          winningDate: selectedWinningDate,
          winningTime: selectedWinningTime,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to close poll")
      }

      await response.json()

      // Set event as completed
      setIsEventCompleted(true)

      setNotification({
        show: true,
        message: "The event has been finalized with the selected date and time.",
        type: "success",
      })

      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (err) {
      console.error("Error:", err)
      setNotification({
        show: true,
        message: "Failed to finalize the event. Please try again.",
        type: "error",
      })

      setTimeout(() => {
        setNotification(null)
      }, 3000)

    } finally {
      setIsLoading(false)
      setIsConfirmDialogOpen(false)
    }
  }

  if (isEventCompleted && eventData) {
    return (
      <EventCompletedView
        eventName={eventData.name}
        finalDate={selectedWinningDate || ""}
        finalTime={selectedWinningTime || ""}
        creatorName={userAdmin || ""}
        eventId={id?.toString() || ""}
      />
    )
  }

  return (
    <section id="group-availability" className="px-2 sm:px-4 md:px-8 2xl:px-0">
      <div className="relative mx-auto max-w-c-1390 px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
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
              <span className="text-sm block mt-2 text-primary font-medium">
                As the event creator, you can select the final date and time to close the poll.
              </span>
            )}
          </p>
        </div>
      </div>

      {eventData && (
        <GroupAvailabilityTable
          dates={eventData.dates}
          startTime={eventData.start_time || ''}
          endTime={eventData.end_time || ''}
          groupData={groupData}
          isCreator={isCreator}
          onSelectWinningTime={handleSelectWinningTime}
        />
      )}

      <div className="flex justify-center items-center mt-8 mb-12">
        <a href={`/event/${id}`} className="flex items-center gap-2 mt-4 bg-primarygradient-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primarygradient-600 focus:ring-opacity-50">
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
                className="px-4 py-2 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary/60 hover:text-white transition-colors"
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
  );
};

export default GroupAvailabilityPage;

