"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../lib/store/userSlice";

export default function FormInput() {
  const [currentName, setCurrentName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentName.trim()) {
      dispatch(setName(currentName));
      setCurrentName("");
    }
  };

  return (
    <div className="bg-cyan-500 p-2 m-2  border-slate-300 rounded-lg shadow-lg">
      <h2>komponent input FormInput</h2>
      <form onSubmit={handleSubmit} className="">
        <input
          className="border border-slate-300 rounded-md text-slate-600 bg-white"
          type="text"
          placeholder=" ketik ajah..."
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2  font-bold m-2 bg-amber-300 border text-white rounded-md"
        >
          submit
        </button>
      </form>
    </div>
  );
}
