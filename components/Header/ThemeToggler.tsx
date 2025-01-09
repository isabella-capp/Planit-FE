import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-gray-2 dark:bg-strokedark absolute right-17 mr-1.5 m-[10px] flex cursor-pointer items-center justify-center rounded-full lg:static"
    >
      <Image
        src="/images/icon/icon-moon.svg"
        alt="logo"
        width={24}
        height={24}
        className="dark:hidden"
      />

      <Image
        src="/images/icon/icon-sun.svg"
        alt="logo"
        width={24}
        height={24}
        className="hidden dark:block"
      />
    </button>
  );
};

export default ThemeToggler;
