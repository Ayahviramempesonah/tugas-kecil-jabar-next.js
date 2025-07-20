import Image from "next/image";
import FormInput from "./components/FormInput";
import DataDisplay from "./components/DataDisplay";
export default function Home() {
  return (
    <div className="grid p-4 m-4 text-center border rounded-lg bg-gray-100  ">
      <h1 className=" p-2 m-2 text-indigo-700 font-bold">TUGAS REDUX</h1>
      <FormInput />
      <DataDisplay />
    </div>
  );
}
