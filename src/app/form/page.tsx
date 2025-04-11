"use client";
import { useCallback, useState } from "react";
import styles from "../page.module.css";
import { env } from "../../../config";

const { PASSWORD, PHONE_NUMBER } = env;

const Form = () => {
  const [name, setName] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);

  const onClick = useCallback(() => {
    if (pw !== PASSWORD) {
      return setInvalid(true);
    } else {
      setInvalid(true);
    }

    const body = encodeURIComponent(`${name} is here!`);
    window.location.href = `sms:+${PHONE_NUMBER}?body=${body}`;
  }, [name, pw]);

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
            className={`bg-gray-50 border border-${
              invalid ? "red" : "gray"
            }-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-${
              invalid ? "red" : "blue"
            }-500 block w-full p-2.5 dark:bg-gray-700 dark:border-${
              invalid ? "red" : "gray"
            }-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-${
              invalid ? "red" : "blue"
            }-500`}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    </div>
  );
};

export default Form;
