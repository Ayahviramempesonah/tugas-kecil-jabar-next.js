"use client";

import { useSelector } from "react-redux";

export default function DataDisplay() {
  const userName = useSelector((state) => state.user.name);

  return (
    <div className="p-2 m-2 text-white   border rounded-lg bg-emerald-300">
      <h2>komponent Display Data</h2>
      <p className="">
        nama saat ini dari reduxStore adalah:
        <strong className="text-rose-600 px-2 font-bold">{userName}</strong>
      </p>
    </div>
  );
}
