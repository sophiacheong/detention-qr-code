"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import styles from "../page.module.css";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import dotenv from "dotenv";

dotenv.config();

const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER;

const Form = () => {
  const [name, setName] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (pw !== PASSWORD) {
          throw new Error("Incorrect password!");
        }

        setInvalid(false);
        const smsLink = `sms:${PHONE_NUMBER}?body=${`${name} is here!`}`;

        window.location.href = smsLink;

        setPw("");
        setName("");
        toast.success(`Confirmation has been sent!`);
      } catch (e) {
        setInvalid(true);
        console.log(e, PASSWORD);
        toast.error(`Please try again. ${e}`);
      }
    },
    [name, pw]
  );

  return (
    <div className={styles.page}>
      <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
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
        draggable={false}
        pauseOnHover
        theme={isDark ? "dark" : "light"}
        toastStyle={{
          fontSize: "text-sm",
          maxWidth: "90vw",
          wordBreak: "break-word",
        }}
      />
    </div>
  );
};

export default Form;
