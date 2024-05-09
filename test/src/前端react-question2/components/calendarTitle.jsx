import React from "react";
import MonthNavButton from "./monthNavButton";

const CalendarTitle = ({ selectedDate, handlePreviousMonth, handleNextMonth }) => {
  return (
    <h2 className="calendar-title d-flex justify-content-between">
      <MonthNavButton direction="prev" handleClick={handlePreviousMonth} />
      {selectedDate.format("YYYY年M月")}
      <MonthNavButton direction="next" handleClick={handleNextMonth} />
    </h2>
  );
};

export default CalendarTitle;
