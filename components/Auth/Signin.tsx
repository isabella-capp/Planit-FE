"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const Signin = () => {
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get("redirect");
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isHovered, setIsHovered] = useState(false)
  const [message, setMessage] = useState('');
  const router = useRouter();

  console.log(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante per inviare i cookie di sessione
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result); // Debug

      if (!response.ok) {
        console.log('Sign in failed:', result.message);
        setMessage(result.message);
      } else {
        console.log('Sign in successful', result);

        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          window.location.href = "/"; // Redirect di default
        }

      }

    } catch (error) {
      setMessage(`Error during login`);
    }
  };

  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="pb-12.5 pt-25 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-30">
        <div className="relative z-1 mx-auto max-w-c-1016 px-6.5 pb-6.5 pt-10 lg:px-10 lg:pt-10 xl:px-15 xl:pt-15">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
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
            className="animate_top flex justify-between"
          >
            {/* Left Section: Sign Up */}
            <div className="hidden md:flex flex-1 justify-center items-center bg-white p-7.5 shadow-solid-8 dark:bg-black dark:border dark:border-strokedark xl:px-15 xl:pt-15">
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
                className="rounded-lg"
              >
                <div className="flex h-full w-full items-center justify-center flex-col">
                  <h1 className="text-center mb-5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle4">
                    Don't have an account?
                  </h1>
                  <p className="text-center text-base text-body-color dark:text-body-color-dark">
                    Sign up and start using our platform.
                  </p>
                  <div className="mt-5 text-center">
                    <Link href="/auth/signup">
                      <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black px-8 py-3 font-medium text-white transition-colors duration-300 ease-in-out hover:bg-gray-800 dark:bg-btndark dark:hover:bg-blackho">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Section: Sign In Form */}
            <div className="flex-1 flex items-center justify-center bg-white p-7.5 shadow-solid-8 dark:bg-black dark:border dark:border-strokedark xl:px-15 xl:pt-15">
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
                className="rounded-lg"
              >
                <h2 className="mb-10 text-center text-3xl font-semibold text-black dark:text-white xl:text-itemtitle">
                  Login to Your Account
                </h2>

                {/* Sign In Form */}
                <form onSubmit={handleSubmit}>
                  {/* Email and Password Fields */}
                  <div className="w-full mb-4.5 flex flex-col gap-7.5 lg:mb-6.5">
                    <div className="flex flex-col gap-3 lg:flex-1">
                      <label
                        htmlFor="username"
                        className="text-base font-semibold text-black dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Username"
                        name="Username"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                        className="w-full border-2 rounded-lg border-stroke bg-transparent p-3 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white" />
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-1">
                      <label
                        htmlFor="password"
                        className="text-base font-semibold text-black dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        className="w-full border-2 rounded-lg border-stroke bg-transparent p-3 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                      />
                    </div>
                  </div>

                  {message &&
                    <div className="mb-5 flex text-primary items-center justify-center">
                      <p className="text-center">{message}</p>
                    </div>
                  }
                  <div className="mb-9 flex items-center justify-center">
                    <a href="#" className="text-sm font-bold border-b hover:text-primary hover:border-primary">
                      FORGOT PASSWORD?
                    </a>
                  </div>

                  {/* Sign In Button */}
                  <div className="flex flex-col gap-5 items-center mb-6">
                    <button
                      type="submit"
                      aria-label="login with email and password"
                      className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white transition-colors duration-300 ease-in-out hover:bg-gray-800 dark:bg-btndark dark:hover:bg-blackho"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span>Log in</span>
                      <motion.svg
                        className="fill-white"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <path
                          d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                          fill="currentColor"
                        />
                      </motion.svg>
                    </button>
                    <div className="block md:hidden">
                      <p>Don't you have an account? <a href="/auth/signup" className="text-primary hover:text-primaryho">signup</a></p>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Signin;
