const welcomePrompt = () => {
  const userName = prompt('Добро пожаловать в ToDo. Введите имя пользователя:');
  if (!userName) {
    alert(`Вы не указали имя пользователя.`);
    welcomePrompt();
  }
  return userName;
};


const createButtonsGroup = params => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('mb-3');
  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    return button;
  });
  btnWrapper.append(...btns);
  return {
    btnWrapper,
    btns,
  };
};


const createSelectForm = params => {
  const formSelect = document.createElement('select');
  formSelect.required = true;
  // const selected = document.createElement('option');
  // selected.disabled = true;
  // selected.innerText = 'Выберите значение';
  // selected.selected = true;
  const formOptions = params.map(({value, text}) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = text;
    return option;
  });
  formSelect.append(...formOptions);
  return formSelect;
};


const createForm = (name) => {
  const title = document.createElement('h1');
  title.classList.add('fs-3');
  title.textContent = `${name}, ваш список задач:`;
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  const label = document.createElement('label');
  label.classList.add('form-group', 'me-3', 'mb-0');
  const input = document.createElement('input');
  input.classList.add('form-control');
  input.name = 'name';
  input.placeholder = 'ввести задачу';
  label.append(input);

  const formSelect = createSelectForm([
    {
      value: 'regular',
      text: 'Обычная'
    },
    {
      value: 'important',
      text: 'Важная'
    },
    {
      value: 'urgent',
      text: 'Срочная'
    },
  ]);
  formSelect.classList.add('me-3');
  formSelect.name = 'importance';

  const button = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
  ]);
  button.btns[0].disabled = 'true';
  form.append(label, formSelect, ...button.btns);

  return {
    title,
    form,
    formSelect,
    btnSave: button.btns[0],
    btnClear: button.btns[1],
  }
};


const createTable = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('table-wrapper');
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-hover', 'table-bordered');
  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th>№</th>
        <th class="name">Задача</th>
        <th class="imp d-none">Важность</th>
        <th class="status">Статус</th>
        <th>Действия</th>
      </tr>
    `);
  table.thead = thead;
  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;

  wrapper.append(table);

  return {
    wrapper,
    table,
  };
};


const createRow = ({name, importance, id, status}) => {
  const tr = document.createElement('tr');
  tr.classList.add('task');
  const tdImportance = document.createElement('td');
  tdImportance.classList.add('imp', 'd-none');
  switch (importance) {
    case 'regular':
      tr.classList.add('table-light');
      tdImportance.innerText = 'Обычная';
      break;
    case 'important':
      tr.classList.add('table-warning');
      tdImportance.innerText = 'Важная';
      break;
    case 'urgent':
      tr.classList.add('table-danger');
      tdImportance.innerText = 'Срочная';
      break;
  }

  const tdNumber = document.createElement('td');
  tr.innerId = id;
  tdNumber.classList.add('number');
  const tdNameTask = document.createElement('td');
  tdNameTask.textContent = name;
  if (status === 'Выполнено') {
    tr.classList = 'task table-success';
    tdNameTask.classList.add('text-decoration-line-through');
  }
  const tdStatus = document.createElement('td');
  tdStatus.classList.add('status');
  tdStatus.textContent = status;
  const buttons = createButtonsGroup([
    {
      className: 'delete btn btn-danger mx-2',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'complete btn btn-success mx-2',
      type: 'button',
      text: 'Завершить',
    },
    {
      className: 'edit btn btn-info',
      type: 'button',
      text: 'Редактировать',
    },
  ]);
  const tdAction = document.createElement('td');
  tdAction.append(buttons.btnWrapper);

  tr.tdStatus = tdStatus;
  tr.tdNameTask = tdNameTask;
  tr.tdImportance = tdImportance;

  tr.append(tdNumber, tdNameTask, tdImportance, tdStatus, tdAction);

  return tr;
};


export { createRow, createForm, createTable, welcomePrompt };
