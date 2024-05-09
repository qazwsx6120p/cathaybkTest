import React from "react";

const CalendarCell = ({ item, today, selectedRange, handleDayClick }) => {
  /** 是否為非本月日期 */
  const isNonCurrentMonthDay = !item.inCurrentMonth;

  /** 是否為本月日期 */
  const isToday =
    item.day === today.date() &&
    item.month === today.month() + 1 &&
    item.year === today.year();

  /** 是否為使用者選擇的本月日期範圍 */
  const isSelected =
    selectedRange.includes(item.day) && !isNonCurrentMonthDay;

  return (
    <td
      className={`calendar-day text-center 
      ${isNonCurrentMonthDay ? "non-current-month" : ""} 
      ${isToday ? "today" : ""} 
      ${isSelected ? "selected" : ""}`}
      onClick={() => handleDayClick(item)}
    >
      {`${item.day} 日`}
    </td>
  );
};

export default CalendarCell;
