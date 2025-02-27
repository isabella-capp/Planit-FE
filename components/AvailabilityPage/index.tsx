'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import GroupAvailabilityTable from './GroupAvailabilityTable';
import { UserRound } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Event {
  name: string;
  start_time: string;
  end_time: string;
  dates: string[];
  id: number;
}

const GroupAvailabilityPage = () => {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [groupData, setGroupData] = useState<{ [key: string]: { [key: string]: string[] } }>({});
  const [error, setError] = useState<string | null>(null);

  const param = useParams();
  const id = param.id;

  useEffect(() => {
    if (!id) return; // Aspetta che l'ID sia disponibile

    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/private/event/${id}`, {
          method: "GET",
          credentials: "include",
        });

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
        </p>
      </div>
    </div>

    {eventData && (
      <GroupAvailabilityTable 
        dates={eventData.dates}
        startTime={eventData.start_time || ''}
        endTime={eventData.end_time || ''} 
        groupData={groupData}      
      />
    )}

    <div className="flex justify-center items-center mt-8 mb-12">
      <a href={`/event/${id}`} className="flex items-center gap-2 mt-4 bg-primarygradient-600 hover:bg-primary-700 text-white font-semibold py-3 px-5 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primarygradient-600 focus:ring-opacity-50">
        <UserRound className="w-5 h-5" aria-hidden="true" />
        <span className="text-sm">View Your Availability</span>
      </a>
    </div>
  </section>
);
};

export default GroupAvailabilityPage;

