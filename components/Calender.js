"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CalendarCompact() {
  const [selected, setSelected] = useState();

  return (
    <div className="hidden lg:w-[300px] xl:w-[390px] h-[430px] bg-[#f6fdfc] rounded-2xl  xl:flex flex-col items-center justify-center  shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="w-full px-4 pt-1 flex justify-center items-center">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          className="text-black"
          styles={{
            months: { display: "flex", justifyContent: "center" },
            caption: { textAlign: "center" },
            table: { width: "100%", fontSize: "0.75rem" },
            head_cell: { padding: "0.25rem", fontWeight: 500 },
            cell: { padding: "0.25rem", textAlign: "center" },
          }}
          modifiersClassNames={{
            selected: "bg-blue-600 text-white rounded-full",
            today: "text-blue-600 font-bold",
          }}
        />
      </div>

      {selected && (
        <button
          onClick={console.log("click   ")}
          className="text-sm text-white mt-1 bg-blue-500 p-3 rounded-2xl cursor-pointer"
        >
          Add for {format(selected, "PPP")}
        </button>
      )}
    </div>
  );
}
