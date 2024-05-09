import React, { useState } from "react";

const SearchBox = () => {
  // ========================= useState ===============================
  const [inputValue, setInputValue] = useState("");

  // ========================= 變數 ===============================

  let timeoutId;

  // ========================= 函式 ===============================

  // 執行 Ajax 請求的函式
  const makeAjaxCall = (value) => {
    // 在此實現你的 Ajax 請求
    console.log("執行帶有值的 Ajax 請求:", value);
  };

  /**  Debounce 函式 */
  const debounce = (callBack, delay) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callBack, delay);
  };

  // 處理輸入變化
  const handleOnChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    debounce(() => makeAjaxCall(value), 500); // 延遲 500 毫秒後執行
  };

  return (
    <input
      type="search"
      name="p"
      value={inputValue}
      onChange={handleOnChange}
    />
  );
};

export default SearchBox;
