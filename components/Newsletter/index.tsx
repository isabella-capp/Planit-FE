"use client";

import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import React from "react";

const Newsletter = () => {
  return (
    <section className="border border-x-0 border-y-stroke bg-alabaster py-8 sm:py-11 dark:border-y-strokedark dark:bg-black">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
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
          className="animate_top text-center"
        >
          <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-black dark:text-white">
            SUBSCRIBE TO OUR NEWSLETTER
          </h3>
          <p className="mb-6 text-base lg:text-lg">
            Subscribe to receive future updates
          </p>

          <form action="#" className="mx-auto max-w-lg">
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-full border border-stroke px-6 py-3 text-base shadow-solid-11 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                required
              />
              <button
                aria-label="signup to newsletter"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-4"
              >
                <SendHorizontal className="hover:text-primary"/>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center">
                <input type="checkbox" id="privacy" required className="mr-2" />
                <label htmlFor="privacy">I have read and accept the <a className="border-b border-current" href="#"> Privacy Policy</a> and <a className="border-b border-current" href="#">Cookie Policy</a></label>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;

