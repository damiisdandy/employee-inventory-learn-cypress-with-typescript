import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEventHandler, useCallback, useState } from "react";
import UploadEmployee from "../components/UploadEmployee/UploadEmployee";
import axios from "axios";
import { Employee } from "@prisma/client";
import EmployeeCard from "../components/Employee/Employee";
import { useQuery } from "@tanstack/react-query";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [query, setQuery] = useState("");

  const fetcher = useCallback(() => {
    const data = axios
      .get<Employee[]>(`/api/employees?query=${query}`)
      .then((res) => res.data);
    return data;
  }, [query]);

  const { data, error, isLoading, refetch } = useQuery<Employee[]>(
    ["employees", query],
    fetcher
  );

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      {isOpen && (
        <UploadEmployee refetch={refetch} onClose={() => setIsOpen(false)} />
      )}
      <div className="min-h-screen bg-slate-200 p-7">
        <Head>
          <title>Employee Inventory 👨🏾‍💼</title>
          <meta name="description" content="An Inventory of your Employees" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1 className="text-blue-500 text-5xl uppercase text-center font-extrabold">
            Employee Inventory 👨🏾‍💼
          </h1>
          <p className="text-center text-lg mt-3 text-gray-500">
            Help manage your employee database
            <br />
            Learn how to implement <b>E2E testing</b> with <b>Cypress</b> and
            <b> Typescript</b>
          </p>
          <div className="flex gap-4 flex-col justify-center items-center mt-4 w-full">
            <input
              data-cy="search-bar"
              className="focus:border-blue-500 border-2 focus:outline-none px-4 py-1.5 w-1/3 rounded-md"
              type="text"
              name="employee"
              placeholder="Search for Employee e.g James"
              value={query}
              onChange={handleQueryChange}
            />
            <button
              data-cy="modal-open-button"
              onClick={() => setIsOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 font-bold rounded-md hover:scale-105 transition-all ease-in-out"
            >
              Upload Employee
            </button>
          </div>
          {isLoading ? (
            <p className="text-center text-lg uppercase mt-6 font-bold text-gray-500">
              Loading...
            </p>
          ) : error ? (
            <p className="text-center text-lg uppercase mt-6 font-bold text-red-500">
              Error!
            </p>
          ) : data?.length == 0 ? (
            <p className="text-center text-lg uppercase mt-6 font-bold text-gray-500">
              You have no employee
            </p>
          ) : (
            <div data-cy="employees" className="mt-6 grid grid-cols-4 gap-5">
              {data?.map((el) => (
                <EmployeeCard key={el.id} refetch={refetch} {...el} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
