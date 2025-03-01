"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="support" className="px-4 md:px-8 xl:px-10">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20 lg:flex-row">
        <div className="mt-10 mb-10 lg:mt-0">
          <h2 className="text-sectiontitle4 mb-3 font-bold text-black dark:text-white">Contact Us</h2>
          <div className="flex flex-col gap-3 justify-between lg:flex-row">
            <p>If you have any questions or suggestions, feel free to let us know!</p>
            <p className="inline-flex items-center">Home <ChevronRight className="h-5"/> <span className="font-bold text-primary">support</span></p>
          </div>
        </div>
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

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-6">
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
                <h2 className="mb-8 text-2xl font-semibold text-black dark:text-white xl:text-sectiontitle2 md:text-3xl md:mb-12">
                  Send a message
                </h2>

                <form action="/api/contact" method="POST">
                    <div className="mb-7.5 flex flex-col gap-6 lg:flex-row lg:gap-10">
                    <div className="flex flex-col gap-3 lg:flex-1">
                      <label className="text-black dark:text-white">Name</label>
                      <input
                      type="text"
                      placeholder="Full name"
                      className="w-full border-2 rounded-lg border-stroke bg-transparent p-3 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-3 lg:flex-1">
                      <label className="text-black dark:text-white">Phone Number</label>
                      <input
                      type="text"
                      placeholder="Phone number"
                      className="w-full border-2 rounded-lg border-stroke bg-transparent p-3 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                      />
                    </div>
                    </div>
                  <div className="mb-7.5 flex flex-col gap-3">
                    <label className="text-black dark:text-white">Email</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full border-2 rounded-lg border-stroke bg-transparent p-3 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                    />
                  </div>
                  <div className="mb-7 flex flex-col gap-3">
                    <label className="text-black dark:text-white">Message</label>
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={4}
                      className="w-full border-2 rounded-lg p-3 border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                    ></textarea>
                  </div>

                  <div className="flex flex-wrap gap-8 xl:justify-between">
                    <div className="mb-4 flex flex-row gap-3 md:mb-0 items-center">
                      <input type="checkbox" id="privacy" required className="mr-2" />
                      <label htmlFor="privacy" className="text-sm text-gray-700 dark:text-gray-300">I have read and accept the <a className="border-b">privacy policy</a> and <a className="border-b">cookie policy</a></label>
                    </div>
                  <div className="w-full flex justify-end">
                    <button
                      aria-label="send message"
                      className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-gray-800 dark:bg-btndark dark:hover:bg-btndark-hover"
                    >
                      Send Message
                      <svg
                        className="fill-white"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  </div>

                </form>
              </motion.div>
            </div>

            <div className="flex-4">
            <div className="left-0 top-0 h-2/3 w-full rounded-lg bg-gradient-to-t from-[#dee7ff2f] to-[#dee7ff47] dark:bg-gradient-to-t dark:from-[#252a428d] dark:to-[#252A42]">
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
    className="animate_top w-full p-5 md:w-3/5 md:p-10 lg:w-full xl:p-15 mx-auto"
  >
    <h2 className="mb-5 text-2xl font-semibold text-black dark:text-white md:mb-10 md:text-3xl xl:text-4xl">
      Find us
    </h2>

    <div className="flex items-start space-x-4 mb-7">
      <MapPin className="h-6 w-9 text-black dark:text-white" />
      <div>
        <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
          Our Location
        </h3>
        <p>
          <a href="https://www.google.it/maps/place/Milano+MI">
            123 Innovation Drive, Tech Valley, Milan, Italy
          </a>
        </p>
      </div>
    </div>

    <div className="flex items-start space-x-6 mb-7">
      <Mail className="h-6 w-6 text-black dark:text-white" />
      <div>
        <h3 className="mb-4 text-lg font-medium text-black dark:text-white">
          Email Address
        </h3>
        <p>
          <a href="mailto:info@planitapp.com">info@planitapp.com</a>
        </p>
      </div>
    </div>

    <div className="flex items-start space-x-6">
      <Phone className="h-6 w-6 text-black dark:text-white" />
      <div>
        <h4 className="mb-4 text-lg font-medium text-black dark:text-white">
          Phone Number
        </h4>
        <p>
          <a href="tel:+390212345678">+39 02 1234 5678</a>
        </p>
      </div>
    </div>
  </motion.div>
</div>

            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default Contact;
