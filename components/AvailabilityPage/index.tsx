'use client'

import React from 'react';
import Image from 'next/image';
import GroupAvailabilityTable from './GroupAvailabilityTable';
import { UserRound } from 'lucide-react';
import { useParams } from 'next/navigation';

interface GroupAvailabilityPageProps {
  eventName: string;
}

const GroupAvailabilityPage: React.FC<GroupAvailabilityPageProps> = ({ eventName }) => {
  const dates = ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05'];
  const startTime = '09:00';
  const endTime = '17:00';
  const param = useParams();
  const id = param.id;

  // Sample group availability data
  const groupData = {
    '2023-07-01': {
      '09:00': ['Alice', 'Bob'],
      '10:00': ['Alice', 'Bob', 'Charlie'],
      '10:30': ['Alice', 'Bob', 'Charlie'],
      '11:00': ['Bob', 'Charlie', 'David'],
    },
    '2023-07-02': {
      '09:00': ['Alice', 'Charlie'],
      '10:00': ['Bob', 'David'],
      '11:00': ['Alice', 'Bob', 'Charlie', 'David'],
      '15:00': ['Bob']
    },
    // ... add more data for other dates and times
  '2023-07-03': {
    '09:00': ['Alice', 'David'],
    '09:30': ['Alice'],
    '15:00': ['Charlie', 'David'],
    '16:00': ['Alice', 'Bob', 'Charlie','Diana'],
    '17:00': ['Bob']
  },
  '2023-07-04': {
    '09:00': ['Alice', 'Bob', 'Charlie'],
    '14:00': ['Alice', 'David'],
    '15:00': ['Bob', 'Charlie', 'David','Amerigo', 'Daniel'],
    '16:00': ['Alice', 'Charlie']
  },
  '2023-07-05': {
    '09:00': ['Bob', 'Charlie'],
    '10:00': ['Alice', 'Charlie', 'David, Amerigo'],
    '11:00': ['Alice', 'Bob', 'David'],
    '15:00': ['Charlie']
  }
  };

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
              {eventName}
            </span>
            {"  "}- Group Availability
          </h1>
          <p className="text-base sm:text-md md:text-lg mb-4 sm:mb-6 md:mb-8 lg:w-2/3">
            Here's an overview of the group's availability. Hover over a time slot to see who's available.
          </p>
        </div>
      </div>

      <GroupAvailabilityTable dates={dates} startTime={startTime} endTime={endTime} groupData={groupData} />

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

