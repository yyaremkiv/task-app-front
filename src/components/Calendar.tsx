import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const DateCalendar = ({ updateDate }: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(value: any) => {
          if (value) {
            const dateString = value.toISOString().substr(0, 10);
            updateDate(dateString);
          }
        }}
      />
    </LocalizationProvider>
  );
};
