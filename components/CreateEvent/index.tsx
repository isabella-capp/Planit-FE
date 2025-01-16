"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import EventForm from "./EventForm";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";


const CreateEvent = () => {
  const router = useRouter();
  
  const navigateToEvent = (id: string): void => {
    if(router)
      router.push(`/event/${id}`);
  }
  
  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20 lg:flex-row">
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col gap-22 lg:flex-row">
            <div className="flex-1">
              <div className="mt-10 mb-10 lg:mt-5">
                <h2 className="text-sectiontitle3 mb-3 font-bold text-black dark:text-white">PlanIt 🚀</h2>
                <p>Find a time to meet!</p>
              </div>
              <div className="left-0 mb-8 md:mb-13 top-0 w-full rounded-lg bg-gradient-to-t from-[#dee7ff2f] to-[#dee7ff47] dark:bg-gradient-to-t dark:from-[#252a428d] dark:to-[#252A42]">
                <motion.div
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 2, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="animate_top w-full p-0 py-2 md:w-3/5 md:p-5 lg:w-full xl:p-8 mx-auto"
                >
                  <div className="grid grid-cols-[60px,repeat(3,1fr)] gap-3 text-center m-5">
                    {/* Intestazioni (giorni) */}
                    <div></div>
                    <div className="font-semibold">Fri</div>
                    <div className="font-semibold">Sat</div>
                    <div className="font-semibold">Sun</div>

                    {["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"].map((time, index) => (
                      <React.Fragment key={index}>
                        <div className="font-medium text-gray-500">{time}</div>
                        {[...Array(3)].map((_, colIndex) => {
                          // Use a consistent color for each cell
                          const isDark = (index - colIndex) % 3 === 0;
                          return (
                            <div key={colIndex} className="flex flex-col gap-2">
                              <div
                                className={`h-8 rounded-md transition-colors 
                                            ${isDark ? 'bg-[#e0e2eb] dark:bg-[#434a70]/40' : 'bg-[#0088cc]/80 hover:bg-primaryho/80'}`}
                              ></div>
                              <div
                                className={`h-8 rounded-md transition-colors 
                                            ${isDark ? 'bg-[#e0e2eb] dark:bg-[#434a70]/40' : 'bg-[#0077b3] dark:bg-[#005580]/80 hover:bg-primaryho/80'}`}
                              ></div>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:p-15">
                <h1 className="text-md md:text-itemtitle2 xl:text-sectiontitle4 mb-5 md:mb-7.5 font-semibold text-black dark:text-white">Already have an Event ID?</h1>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="EventID here..."
                    className="w-full rounded-lg border-2 border-stroke px-6 py-3 text-sm md:text-base shadow-solid-11 focus:border-manatee focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-waterloo"
                    required
                    id="event-id-input"
                  />
                  <button
                    aria-label="signup to newsletter"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-4"
                    onClick={() => {
                      const input = document.getElementById("event-id-input") as HTMLInputElement;
                      if (input?.value) {
                        navigateToEvent(input.value);
                      }
                    }}
                  >
                    <SendHorizontal className="hover:text-[#0088cc]" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:p-15"
              >
                <EventForm navigator={navigateToEvent} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  )
}

export default CreateEvent;