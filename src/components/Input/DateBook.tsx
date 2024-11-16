"use client";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";

export default function DateBook({
  date,
  onDateChange,
}: {
  date: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
}) {
  const [bookDate, setBookDate] = useState<Dayjs | null>(date);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              borderColor: "#B9B9B9",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#B9B9B9",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#5B90E8",
                borderWidth: "1px",
              },
            },
            "& .MuiOutlinedInput-input": {
              paddingX: "24px",
              paddingY: "12px",
            },
          }}
          className="w-full"
          format="YYYY-MM-DD"
          value={bookDate}
          onChange={(newValue: Dayjs | null) => {
            setBookDate(newValue);
            onDateChange(newValue);
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
