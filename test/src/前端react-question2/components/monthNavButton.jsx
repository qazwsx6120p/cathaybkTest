import React from "react";

const MonthNavButton = ({ direction, handleClick }) => {
  return (
    <button onClick={handleClick} className="month-selector-button">
      {direction === "prev" ? "<" : ">"}
    </button>
  );
};

export default MonthNavButton;
