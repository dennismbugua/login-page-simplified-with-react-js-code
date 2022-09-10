import React, { useState, useEffect, Fragment } from "react";

let dayArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const useHolidayCalendarTable = (
  holidayCalendarData,
  handleDelHolidayCalendar,
  handleEditHolidayCalendar,
  onClickToggleFromTable
) => {
  const [thead] = useState(["Year", "Title", "Date", "Day", "Type", "Action"]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    console.log(holidayCalendarData);
    let trowArr = holidayCalendarData.map((el) => {
      return {
        Year: new Date(el.holidayDate).getFullYear(),
        Title: el.title,
        Date: el.holidayDate.substring(0, 10),
        Day: dayArr[el.day],
        Action: (
          <Fragment>
            <i
              className="fas fa-trash"
              onClick={() => handleDelHolidayCalendar(el.holidayCalendarId)}
            ></i>
            <i
              className="fas fa-edit ml-4"
              onClick={() => {
                handleEditHolidayCalendar(el, el.holidayCalendarId);
                onClickToggleFromTable();
              }}
            ></i>
          </Fragment>
        ),
      };
    });

    setTrow(trowArr);
  }, [
    holidayCalendarData,
    handleDelHolidayCalendar,
    handleEditHolidayCalendar,
    onClickToggleFromTable,
  ]);

  return { thead, trow };
};

export default useHolidayCalendarTable;
