import { createRow, createTable } from "./createElement.js";
import {createForm } from "./createElement.js";


export const addTask = (task, list) => {
  list.append(createRow(task));
};


export const setNumbers = (list) => {
  const numbers = list.querySelectorAll('.number');
  let i = 1;
  numbers.forEach(task => {
    task.textContent = i;
    i += 1;
  });
};


export const renderToDoApp = (app, key) => {
  const {wrapper, table} = createTable();
  const {title, form, formSelect, btnSave, btnClear} = createForm(key);
  app.append(title, form, wrapper);
  return {
    list: table.tbody,
    form,
    formSelect,
    btnSave,
    btnClear,
  }
};


export const renderTasks = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};
