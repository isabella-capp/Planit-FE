"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import menuDataLogged from "./menuDataLogged"
import IconUser from "./IconUser";
import Logged from "./Logged";
import { Menu } from "@/types/menu";


const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [menu, setMenu] = useState<Menu[]>([])
  const pathUrl = usePathname();
  
  useEffect(() => {
    if (userLogged) {
      setMenu(menuDataLogged);
    } else {
      setMenu(menuData);
    }
  }, [userLogged]);


  async function fetchUser() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/check-session`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();
      if (response.ok) {
        setUserLogged(true);
        setUsername(result.user);
      } else {
        console.log('Not authorized:', result.message);
      }

    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu)
    fetchUser()

    return () => {
      window.removeEventListener("scroll", handleStickyMenu)
    }
  }, []) 

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  const handleLinkClick = () => {
    if (navigationOpen) {
      setNavigationOpen(false)
    }
  }

  return (
    <header
      className={`fixed left-0 top-0 z-99999 w-full py-7 ${stickyMenu
        ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
        : ""
        }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-1/4">
          <a href="/">
            <Image
              src="/images/logo/logo-light.png"
              alt="logo"
              width={119.03}
              height={30}
              className="w-full dark:hidden"
            />
            <Image
              src="/images/logo/logo-dark.png"
              alt="logo"
              width={119.03}
              height={30}
              className="w-full hidden dark:block"
            />
          </a>

          {/* <!-- Toggle BTN --> */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "!w-full delay-300" : "w-0"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "delay-400 !w-full" : "w-0"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "!w-full delay-500" : "w-0"
                    }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "!h-0 delay-[0]" : "h-full"
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "!h-0 delay-200" : "h-0.5"
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Toggle BTN --> */}
        </div>

        {/* Nav Menu Start */}
        <div
          className={`${
            navigationOpen
              ? "navbar !visible mt-4 h-auto max-h-[80vh] overflow-y-auto rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection"
              : "invisible h-0"
          } w-full xl:visible xl:flex xl:h-auto xl:w-full xl:p-0 xl:shadow-none xl:dark:bg-transparent`}
        >
          <nav className="flex-[7]">
            <ul className="flex flex-col justify-center font-bold gap-5 xl:flex-row xl:items-center xl:gap-10">
              {menu.map((menuItem, key) => (
              <li key={key}>
                <Link
                href={`${menuItem.path}`}
                className={
                  pathUrl === menuItem.path
                  ? "text-primary hover:text-primary border-b-2 border-primary"
                  : "hover:text-primary"
                }
                onClick={handleLinkClick}
                >
                {menuItem.title}
                </Link>
              </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center justify-center xl:justify-end xl:mt-0 flex-[3] gap-4 xl:gap-6">
            {userLogged ? (
              <Logged username={username} />
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center justify-center font-extrabold p-2.5 text-regular dark:text-gray-3 hover:text-primary transition-colors"
                onClick={handleLinkClick}
              >
                <IconUser />
                <span className="ml-2 xl:hidden">Sign In</span>
              </Link>
            )}
            
            <ThemeToggler />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
