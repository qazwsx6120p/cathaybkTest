import React, { useState, useCallback, useMemo } from "react";
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
  const handlePreviousMonth = useCallback(() => {
    setSelectedDate((prevDate) => prevDate.clone().subtract(1, "month"));
  }, []);

  /** 處理點擊下一個月的事件 */
  const handleNextMonth = useCallback(() => {
    setSelectedDate((prevDate) => prevDate.clone().add(1, "month"));
  }, []);

  /** 處理日期點擊事件，並且設置使用者選擇的範圍
   *  @param day 日曆的日期 */
  const handleDayClick = useCallback(
    (day) => {
      if (!day.inCurrentMonth) return;

      let newRange = [];

      if (selectedRange.length === 0) {
        newRange = [day.day];
      } else if (selectedRange.length === 1) {
        const startDay = selectedRange[0];
        const endDay = day.day;

        for (
          let i = Math.min(startDay, endDay);
          i <= Math.max(startDay, endDay);
          i++
        ) {
          newRange.push(i);
        }
      } else {
        newRange = [];
      }

      setSelectedRange(newRange);
    },
    [selectedRange]
  );

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

  //============== 計算上或下個月的相關資訊 ==============

  /** 上個月 */
  const previousMonth = moment(firstDayOfMonth).subtract(1, "month");

  /** 上個月的天數 */
  const daysInPreviousMonth = previousMonth.daysInMonth();

  /** 上個月需要顯示的尾月日期數量 */
  const previousMonthDaysToShow = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  /** 處理要渲染的日曆天數陣列
   *  @return 日曆天數陣列 */
  const calendarDays = useMemo(() => {
    const days = [];

    /** 添加上個月的尾月日期到日曆中 */
    for (let i = 0; i < previousMonthDaysToShow; i++) {
      const day = daysInPreviousMonth - i;
      days.unshift({
        day: day,
        month: previousMonth.month() + 1,
        year: previousMonth.year(),
        inCurrentMonth: false,
      });
    }

    /** 添加本月的日期到日曆中 */
    for (let i = 1; i <= totalDaysInMonth; i++) {
      days.push({
        day: i,
        month: firstDayOfMonth.month() + 1,
        year: firstDayOfMonth.year(),
        inCurrentMonth: true,
      });
    }
    /** 計算需要顯示的本月日期數量 */
    const totalDaysToShow =
      ALL_TD_COUNT - (previousMonthDaysToShow + totalDaysInMonth);

    /** 添加下個月的日期到日曆中 */
    for (let i = 1; i <= totalDaysToShow; i++) {
      days.push({
        day: i,
        month: lastDayOfMonth.month() + 1,
        year: lastDayOfMonth.year(),
        inCurrentMonth: false,
      });
    }

    return days;
  }, [
    firstDayOfMonth,
    lastDayOfMonth,
    previousMonth,
    daysInPreviousMonth,
    previousMonthDaysToShow,
    totalDaysInMonth,
  ]);

  /** 渲染日曆上的日期 */
  const renderCalendarCells = useMemo(() => {
    return (
      <>
        {[...Array(CALENDAR_HAS_FIVE_WEEKS)].map((_, weekIndex) => (
          <tr key={weekIndex}>
            {[...Array(DAYS_IN_WEEK)].map((_, dayIndex) => {
              /** 索引 */
              const index = weekIndex * DAYS_IN_WEEK + dayIndex;

              /** 日曆值 */
              const item = calendarDays[index];

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
                  className={`calendar-day text-center 
                  ${isNonCurrentMonthDay ? "non-current-month" : ""} 
                  ${isToday ? "today" : ""} 
                  ${isSelected ? "selected" : ""}`}
                  onClick={() => handleDayClick(item)}
                >
                  {`${item.day} 日`}
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  }, [calendarDays, handleDayClick, selectedRange, today]);

  return (
    <main className="main d-flex justify-content-center align-items-center">
      <div className="calendar">
        <CalendarTitle
          selectedDate={selectedDate}
          handlePreviousMonth={handlePreviousMonth}
          handleNextMonth={handleNextMonth}
        />
        <table className="calendar-table">
          <tbody>{renderCalendarCells}</tbody>
        </table>
      </div>
    </main>
  );
};

export default Calendar;
