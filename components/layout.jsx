import Head from "next/head";
import Link from "next/link";

import Moon from "./icons/moon";

import { useTheme } from "../context/theme";

export default function Layout({ pageTitle, children }) {
  const { theme, setTheme } = useTheme();

  function isDark() {
    return theme === "dark";
  }

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="min-h-screen bg-primary text-sm sm:text-base pb-1">
        <div className="bg-elements py-4 shadow-md ">
          <div className="flex justify-between w-11/12 mx-auto">
            <Link href="/">
              <p className="text-secondary cursor-pointer">
                Where in the world?
              </p>
            </Link>
            <p
              className="text-secondary flex items-center cursor-pointer"
              onClick={handleThemeChange}
            >
              <Moon isDark={isDark} />
              <span className="ml-2">Dark Mode</span>
            </p>
          </div>
        </div>
        {children}
      </section>
    </>
  );
}
