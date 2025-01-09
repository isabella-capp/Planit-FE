"use client";
import Image from "next/image";

const Hero = () => {

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex justify-center lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h4 className="mb-4.5 text-lg text-center font-medium text-black dark:text-white">
                🔥 PlanIt - Don't let your schedule control you
              </h4>
              <h1 className="mb-5 text-3xl text-center font-bold text-black dark:text-white xl:text-hero ">
                Unlock Your Potential with {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  Planit
                </span>
              </h1>
              <p className="text-justify">
                Simplify group scheduling and find common availability effortlessly. Say goodbye to endless emails and hello to smart, efficient planning.
              </p>

              <div className="mt-10">
                <div className="flex flex-wrap justify-center items-center gap-5">
                  <a href='/#about'>
                    <button
                      aria-label="get started button"
                      className="flex rounded-full border-2 border-black px-6 py-2 text-black duration-1000 ease-in-out hover:bg-blackho hover:text-white dark:bg-btndark dark:hover:bg-blackho dark:text-white"
                    >
                      Learn more
                    </button>
                  </a>
                  <a
                    href="/auth/signin"
                    className="inline-flex items-center gap-2.5 rounded-full border-2 border-black bg-black px-6 py-2 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    Sign in
                    <Image
                      width={20}
                      height={20}
                      src="/images/icon/icon-arrow-dark.svg"
                      alt="Arrow"
                      className="dark:hidden"
                    />
                    <Image
                      width={20}
                      height={20}
                      src="/images/icon/icon-arrow-light.svg"
                      alt="Arrow"
                      className="hidden dark:block"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
