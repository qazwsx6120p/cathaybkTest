// Calendar.js

import React, { useState } from "react";
import moment from "moment";
import "../styles/calendar.css";
import CalendarTitle from "./components/calendarTitle";

const Calendar = ({ date }) => {
  // ===================== 常數 =====================

  /** 日曆的列數 (日曆有幾周) */
  const CALENDAR_HAS_FIVE_WEEKS = 5;

  /** 日曆的行數 (一週 7 天) */
  const DAYS_IN_WEEK = 7;

  /** 日曆總格數 */
  const ALL_TD_COUNT = 35;

  // ===================== 狀態 =====================

  /** 儲存所選日期 */
  const [selectedDate, setSelectedDate] = useState(moment(date));

  /** 儲存所選範圍 */
  const [selectedRange, setSelectedRange] = useState([]);
  // ===================== 函數 =====================

  /** 處理點擊上一個月的事件 */
  const handlePreviousMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().subtract(1, "month"));
  };

  /** 處理點擊下一個月的事件 */
  const handleNextMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().add(1, "month"));
  };

  /** 處理日期點擊事件，並且設置使用者選擇的範圍
   *  @param day 日曆的日期 */
  const handleDayClick = (day) => {
    if (!day.inCurrentMonth) return; // 如果是非本月日期，則返回

    let newRange = [];

    // 檢查是否已選擇範圍的第一個日期
    if (selectedRange.length === 0) {
      newRange = [day.day];
    }
    // 檢查是否已選擇範圍的第二個日期
    else if (selectedRange.length === 1) {
      const startDay = selectedRange[0];
      const endDay = day.day;

      // 確保較小的日期作為範圍的起始點，較大的日期作為範圍的終點
      if (startDay < endDay) {
        for (let i = startDay; i <= endDay; i++) {
          newRange.push(i);
        }
      } else {
        for (let i = endDay; i <= startDay; i++) {
          newRange.push(i);
        }
      }
    }
    // 如果已經選擇了兩個日期，則清空選擇範圍
    else {
      newRange = [];
    }
    setSelectedRange(newRange);
  };

  /** 渲染日曆上的日期 */
  const renderCalendarCells = () => {
    return [...Array(CALENDAR_HAS_FIVE_WEEKS)].map((_, weekIndex) => (
      <tr key={weekIndex}>
        {[...Array(DAYS_IN_WEEK)].map((_, dayIndex) => {
          const index = weekIndex * DAYS_IN_WEEK + dayIndex;
          const item = calendarDays[index];
          if (item) {
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
                key={index}
                className={`calendar-day text-center ${
                  isNonCurrentMonthDay ? "non-current-month" : ""
                } ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
                onClick={() => handleDayClick(item)}
              >
                {`${item.day} 日`}
              </td>
            );
          }
        })}
      </tr>
    ));
  };

  //============== 計算這個月的相關資訊 ==============

  /** 當前日期 */
  const today = moment();

  /** 本月的第一天 */
  const firstDayOfMonth = moment(selectedDate).startOf("month");

  /** 本月的最後一天 */
  const lastDayOfMonth = moment(selectedDate).endOf("month");

  /** 本月的第一天是星期幾 */
  const startDayOfWeek = firstDayOfMonth.day();

  /** 本月的總天數 */
  const totalDaysInMonth = lastDayOfMonth.date();

  /** 日曆日期陣列 */
  const calendarDays = [];

  //============== 計算上或下個月的相關資訊 ==============

  /** 上個月 */
  const previousMonth = moment(firstDayOfMonth).subtract(1, "month");

  /** 上個月的天數 */
  const daysInPreviousMonth = previousMonth.daysInMonth();

  /** 上個月需要顯示的尾月日期數量 */
  const previousMonthDaysToShow = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  /** 添加上個月的尾月日期到日曆中 */
  for (let i = 0; i < previousMonthDaysToShow; i++) {
    const day = daysInPreviousMonth - i;
    calendarDays.unshift({
      day: day,
      month: previousMonth.month() + 1,
      year: previousMonth.year(),
      inCurrentMonth: false,
    });
  }

  /** 計算需要顯示的本月日期數量 */
  const totalDaysToShow =
    ALL_TD_COUNT - (previousMonthDaysToShow + totalDaysInMonth);

  /** 添加本月的日期到日曆中 */
  for (let i = 1; i <= totalDaysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: firstDayOfMonth.month() + 1,
      year: firstDayOfMonth.year(),
      inCurrentMonth: true,
    });
  }

  /** 添加下個月的日期到日曆中 */
  for (let i = 1; i <= totalDaysToShow; i++) {
    calendarDays.push({
      day: i,
      month: lastDayOfMonth.month() + 1,
      year: lastDayOfMonth.year(),
      inCurrentMonth: false,
    });
  }

  return (
    <main className="main d-flex justify-content-center align-items-center">
      <div className="calendar">
        <CalendarTitle
          selectedDate={selectedDate}
          handlePreviousMonth={handlePreviousMonth}
          handleNextMonth={handleNextMonth}
        />
        <table className="calendar-table">
          <tbody>{renderCalendarCells()}</tbody>
        </table>
      </div>
    </main>
  );
};
export default Calendar;
