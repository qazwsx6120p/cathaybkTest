// 請寫下一個用於建立唯一值陣列的函數

const numberArray = [
  1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5, 4,
  4, 7, 8, 8, 0, 1, 2, 3, 1,
];

/** 使用 Set 去除重複值
 *  @param 需要去除重複值的陣列 */
function getUniqueNumber1(array) {
  // 將陣列轉換為 Set，去除重複值
  const uniqueSet = new Set(array);
  // 將 Set 轉換回陣列
  const uniqueArray = Array.from(uniqueSet);
  return uniqueArray;
}

/** 使用迴圈比較值是否重複
 *  @param 需要去除重複值的陣列 */
function getUniqueNumber2(array) {
  const uniqueArray = [];
  for (let i = 0; i < array.length; i++) {
    // 檢查當前值是否已存在於 uniqueArray 中
    if (uniqueArray.indexOf(array[i]) === -1) {
      // 如果不存在，將其添加到 uniqueArray 中
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}
const result1 = getUniqueNumber1(numberArray);
const result2 = getUniqueNumber2(numberArray);
console.log(result1);
console.log(result2);
