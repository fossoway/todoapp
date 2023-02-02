import { removeStorage, editStorage, editStorageName, setStorage } from "./storage.js";
import { setNumbers, addTask } from "./render.js";


const confirmDelete = () => confirm(`Вы уверены?`);


const deleteRow = (list, key) => {
  list.addEventListener('click', e => {
    if (e.target.closest('.delete')) {
      const confirm = confirmDelete();
      if (confirm) {
        e.target.closest('.task').remove();
        const id = e.target.closest('.task').innerId;
        removeStorage(key, id);
        setNumbers(list);
      }
    }
  });
};


const completeTask = (list, key) => {
  list.addEventListener('click', e => {
    if (e.target.closest('.complete')) {
      const id = e.target.closest('.task').innerId;
      e.target.closest('.task').tdStatus.innerText = `Выполнено`;
      e.target.closest('.task').classList = 'task table-success';
      e.target.closest('.task').tdNameTask.classList.add('text-decoration-line-through');
      editStorage(key, id);
      setNumbers(list);
    }
  });
};


const editTask = (list, key) => {
  list.addEventListener('click', e => {
    if (e.target.closest('.edit')) {
      const id = e.target.closest('.task').innerId;
      const nameTask = e.target.closest('.task').tdNameTask
      nameTask.contentEditable = 'true';
      nameTask.focus();
      nameTask.addEventListener('blur', e => {
        nameTask.removeAttribute('contentEditable');
        editStorageName(key, id, nameTask.innerText);
      })
    }
  })
};


const buttonEnabled = (input, btnSave, btnClear) => {
  input.addEventListener('input', e => {
    btnSave.disabled = false;
  });
  input.addEventListener('input', e => {
    if (e.target.value.length === 0) {
      btnSave.disabled = true;
    }
  });
  btnClear.addEventListener('click', e => {
    btnSave.disabled = true;
  })
};


const taskControl = (form, list, key, btnSave) => {
  const submitTask = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTask = Object.fromEntries(formData);
    console.log(newTask);
    newTask.id = Math.round(Math.random() * 100000).toString();
    newTask.status = `В процессе`;
    setStorage(key, newTask);
    addTask(newTask, list);
    setNumbers(list);
    form.reset();
    btnSave.disabled = true;
  };
  form.addEventListener('submit', submitTask);
};


export { taskControl, buttonEnabled, editTask, completeTask, deleteRow };
