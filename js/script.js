import { getStorage } from "./storage.js";
import { taskControl, buttonEnabled, editTask, completeTask, deleteRow } from "./control.js";
import { setNumbers, renderTasks, renderToDoApp } from "./render.js";
import { welcomePrompt } from "./createElement.js";


const init = (selectorApp) => {
  const app = document.querySelector(selectorApp);
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column')
  const key = welcomePrompt();
  const {list, form, formSelect, btnSave, btnClear} = renderToDoApp(app, key);
  console.log(formSelect);
  const data = getStorage(key);
  const input = form[0];
  const allRow = renderTasks(list, data);
  taskControl(form, list, key, btnSave);
  setNumbers(list);
  deleteRow(list, key);
  buttonEnabled(input, btnSave, btnClear);
  completeTask(list, key);
  editTask(list, key);
};


window.toDoList = init;
