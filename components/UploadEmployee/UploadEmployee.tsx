import { Occupation, Employee } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  refetch: Function;
}

type UserFields = Omit<Employee, "id">;

const OCCUPATIONS: { name: string; value: Occupation }[] = [
  {
    name: "Accountant",
    value: "ACCOUNTANT",
  },
  {
    name: "Artist",
    value: "ARTIST",
  },
  {
    name: "Developer",
    value: "DEVELOPER",
  },
  {
    name: "Doctor",
    value: "DOCTOR",
  },
  {
    name: "Engineer",
    value: "ENGINEER",
  },
  {
    name: "Student",
    value: "STUDENT",
  },
];

export default function UploadEmployee({ onClose, refetch }: Props) {
  const { register, handleSubmit } = useForm<UserFields>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: UserFields) => {
    try {
      setLoading(true);
      await axios.post("/api/employees", data);
      toast.success("Employee uploaded");
      refetch();
      onClose();
    } catch (err) {
      toast.error("Problem uploading employee, email might have been taken");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-10 justify-center bg-black bg-opacity-50 w-screen h-screen">
      <div className="absolute z-20 top-1/2 left-1/2 bg-white p-4 rounded-lg w-1/3 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-bold mb-3 text-xl text-gray-600">
          Upload Employee
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <p className="font-bold text-md">Name:</p>
            <input
              {...register("name")}
              data-cy="modal-input-name"
              required
              type="text"
              className="outline-none border-transparent bg-gray-100 w-full p-1 px-2 border-2 rounded-md focus:border-blue-500"
              placeholder="e.g Damilola Jerugba"
            />
          </div>
          <div>
            <p className="font-bold text-md">Email:</p>
            <input
              {...register("email")}
              data-cy="modal-input-email"
              required
              type="email"
              className="outline-none border-transparent bg-gray-100 w-full p-1 px-2 border-2 rounded-md focus:border-blue-500"
              placeholder="e.g hello@damiisdandy.com"
            />
          </div>
          <div>
            <p className="font-bold text-md">Occupation:</p>
            <select
              {...register("occupation")}
              data-cy="modal-input-occupation"
              required
              className="outline-none border-transparent bg-gray-100 w-full p-1 px-2 border-2 rounded-md focus:border-blue-500"
              placeholder="e.g hello@damiisdandy.com"
            >
              {OCCUPATIONS.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-end gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-1.5 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              data-cy="modal-button"
              type="submit"
              className="px-4 py-1.5 font-bold bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
