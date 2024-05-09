/** 用於生成假資料
 *  @param  要產出多少筆假資料
 *  @return 假資料陣列 */
const generateFakeData = (count) => {
  // 職業
  const professions = [
    "student",
    "freelancer",
    "productOwner",
    "engineer",
    "systemAnalytics",
  ];

  const firstNames = ["Alice", "Bob", "Charlie", "David", "Eva"]; // 姓氏
  const lastNames = ["Smith", "Johnson", "Brown", "Lee", "Wong"]; // 名子
  const fakeData = []; // 假資料

  for (let i = 0; i < count; i++) {
    const customerID = generateUniqueID(
      fakeData.map((item) => item.customerID)
    );

    // 取得隨機姓氏
    const firstName = `${
      firstNames[Math.floor(Math.random() * firstNames.length)]
    }`;

    // 取得隨機名
    const lastName = `${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`;

    // 取得隨機職業
    const profession =
      professions[Math.floor(Math.random() * professions.length)];
    const note = `${i + 1}`;
    fakeData.push({ firstName, lastName, customerID, profession, note });
  }

  return fakeData;
};

/** 生成唯一的客戶ID
 *  @existingIDs 現有的id
 *  @return 新的 id */
const generateUniqueID = (existingIDs) => {
  let newID;
  do {
    newID = Math.floor(Math.random() * 1000000); // 生成隨機數字
  } while (existingIDs.includes(newID)); // 檢查是否 ID 已存在
  return newID;
};

/**  排序使用者名稱 */
function sortUserName(users) {
  users.sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName} ${a.customerID}`;
    const nameB = `${b.firstName} ${b.lastName} ${b.customerID}`;
    return nameA.localeCompare(nameB);
  });

  console.log(users);
}

function sortByType(users) {
  const professionOrder = {
    systemAnalytics: 1,
    engineer: 2,
    productOwner: 3,
    freelancer: 4,
    student: 5,
  };

  users.sort((a, b) => {
    return professionOrder[a.profession] - professionOrder[b.profession];
  });

  // 輸出排序後的使用者
  console.log(users);
}

const customData = generateFakeData(10);
// Q1
sortUserName(customData);

// Q2
sortByType(customData);
