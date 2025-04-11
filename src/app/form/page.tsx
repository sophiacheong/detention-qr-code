"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "../page.module.css";
import clsx from "clsx";
import { getClientConfig } from "../../../config";
import { ToastContainer, toast } from "react-toastify";

const { PASSWORD, PHONE_NUMBER } = getClientConfig();

const Form = () => {
  const [name, setName] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
  }, []);

  const onClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (pw !== PASSWORD) {
        setInvalid(true);
        return;
      }

      try {
        setInvalid(false);

        await fetch("/api/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: PHONE_NUMBER,
            message: `${name} is here!`,
          }),
        });

        setPw("");
        setName("");
        toast.success(`Confirmation has been sent!`);
      } catch (e) {
        toast.error(`Error sending message - Please try again: ${e}`);
      }
    },
    [name, pw]
  );

  return (
    <div className={styles.page}>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="full-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Full Name
          </label>
          <input
            type="full-name"
            id="full-name"
            className={clsx(
              "bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5",
              "dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white",
              "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
            )}
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={clsx(
              "bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5",
              "dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white",
              invalid
                ? "border-red-400 ring ring-red-500 focus:ring-red-500 focus:border-red-500 dark:ring-red-400 dark:border-red-400 dark:focus:ring-red-400 dark:focus:border-red-400"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            )}
            autoComplete="on"
            required
            onChange={(e) => setPw(e.target.value)}
            value={pw}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onClick}
        >
          Submit
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
      />
    </div>
  );
};

export default Form;
