import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComp = React.memo(({ handleDateSelection }) => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
    handleDateSelection(date);
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        // showFixedNumberOfWeeks={true}
        showNeighboringMonth={true}
      />
    </div>
  );
});

export default CalendarComp;
