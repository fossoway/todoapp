const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];


const setStorage = (key, value) => {
  const toDoList = getStorage(key);
  toDoList.push(value);
  localStorage.setItem(key, JSON.stringify(toDoList));
};


const removeStorage = (key, number) => {
  const toDoList = getStorage(key);
  const index = toDoList.findIndex(i => i.id === number);
  toDoList.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(toDoList));
};


const editStorage = (key, number) => {
  const toDoList = getStorage(key);
  const index = toDoList.findIndex(i => i.id === number);
  toDoList[index].status = `Выполнено`;
  localStorage.setItem(key, JSON.stringify(toDoList));
};


const editStorageName = (key, number, newText) => {
  const toDoList = getStorage(key);
  const index = toDoList.findIndex(i => i.id === number);
  toDoList[index].name = newText;
  localStorage.setItem(key, JSON.stringify(toDoList));
};


// const editStorageImp = (key, number, value) => {
//   const toDoList = getStorage(key);
//   const index = toDoList.findIndex(i => i.id === number);
//   toDoList[index].importance = value;
//   localStorage.setItem(key, JSON.stringify(toDoList));
// }

export { setStorage, editStorageName, removeStorage, editStorage, getStorage };
