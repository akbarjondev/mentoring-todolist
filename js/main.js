let body = document.body;
let box = body.querySelector(".box");
let form = body.querySelector(".form");
let formInput = body.querySelector(".form__input");
let formSelect = body.querySelector(".form__select");
let searchInput = body.querySelector(".controllers__search");
let langSelect = document.body.querySelector(".theme__lang");

// buttons
const themeBtn = document.body.querySelector(".theme__btn");

// sort and filter
const sortSelect = body.querySelector(".controllers__sort");
const filterSelect = body.querySelector(".controllers__filter");

// modal
let modalInput = body.querySelector(".modal__input");
let modalSelect = body.querySelector(".modal__select");
let modalSave = body.querySelector(".modal__button");

// database
let tasksArr = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let task = formInput.value.trim();
  let priority = formSelect.value;

  tasksArr.push({
    id: new Date().getTime(),
    task: task,
    priority: priority,
    isCompleted: false,
  });

  if (task.length === 0) {
    return;
  }

  render(tasksArr);

  formInput.value = "";
  formSelect.value = "";
});

function render(arr) {
  box.innerHTML = "";

  arr.forEach((task) => {
    const taskDiv = createElementWithTaskText(task);
    box.appendChild(taskDiv);
  });
}

function createElementWithTaskText(elementObj) {
  const taskInput = document.createElement("input");
  taskInput.checked = elementObj.isCompleted;
  taskInput.type = "checkbox";
  taskInput.className = "task__input";
  taskInput.onclick = function (event) {
    const taskId = +event.target.parentNode.dataset.id;

    tasksArr = tasksArr.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    render(tasksArr);
  };

  const taskDesc = document.createElement("div");
  taskDesc.textContent = elementObj.task;
  taskDesc.className = "task__desc";

  const taskPriority = document.createElement("div");
  taskPriority.textContent = elementObj.priority;
  taskPriority.className = "task__priority";

  const taskEdit = document.createElement("button");
  taskEdit.textContent = "Edit";
  // modal bilan edit qilish
  taskEdit.onclick = function (event) {
    /**** bu modalda taskni edit qilish uchun*/
    modal.style.display = "flex";
    const taskId = +event.target.parentNode.dataset.id;
    const task = tasksArr.find((task) => task.id === taskId);

    modalInput.value = task.task;
    modalSelect.value = task.priority;
    modalSave.dataset.id = task.id;
  };

  const taskDelete = document.createElement("button");
  taskDelete.onclick = function (event) {
    let parent = event.target.parentNode;
    let parentId = Number(parent.dataset.id);

    tasksArr = tasksArr.filter((element) => element.id !== parentId);
    parent.remove();

    render(tasksArr);
  };
  taskDelete.textContent = "Delete";

  const taskDiv = document.createElement("div");
  taskDiv.dataset.id = elementObj.id;
  taskDiv.className = elementObj.isCompleted ? "task task--done" : "task";
  taskDiv.append(taskInput, taskDesc, taskPriority, taskEdit, taskDelete);

  return taskDiv;
}

modal.addEventListener("click", (e) => {
  if (e.target.getAttribute("class") === "modal") {
    modal.style.display = "none";
  }
});

modalSave.addEventListener("click", (event) => {
  const taskId = +event.target.dataset.id;
  const editedTask = modalInput.value;
  const editedPriority = modalSelect.value;

  tasksArr = tasksArr.map((oldTask) => {
    if (oldTask.id === taskId) {
      return {
        ...oldTask,
        task: editedTask,
        priority: editedPriority,
      };
    }

    return oldTask;
  });

  render(tasksArr);
  modal.style.display = "none";
});

// sortni tinglash
sortSelect.addEventListener("change", (event) => {
  const sortingType = event.target.value;

  let a = tasksArr.sort((a, b) => {
    if (sortingType === "a-z") {
      return a.task.toLowerCase() > b.task.toLowerCase();
    } else if (sortingType === "time") {
      return a.id > b.id;
    } else {
      return b.task.toLowerCase() > a.task.toLowerCase();
    }
  });

  render(tasksArr);
});

// filterni tinglash
filterSelect.addEventListener("change", (event) => {
  const filterType = event.target.value;

  let filteredArr = tasksArr.filter((task) => task.priority === filterType);

  render(filteredArr);
});

// SEARCH
searchInput.addEventListener("input", (event) => {
  let keyword = event.target.value.trim().toLowerCase();

  let foundTasks = tasksArr.filter((element) => {
    if (element.task.toLowerCase().includes(keyword)) {
      return element;
    }
  });

  render(foundTasks);
});

// tillar

let lang = {
  night: {
    uz: "Tun",
    en: "Night",
  },
  light: {
    uz: "Kun",
    en: "Light",
  },
};

let currentLang = langSelect.value;

langSelect.addEventListener("change", (event) => {
  currentLang = event.target.value;

  themeBtn.textContent =
    lang[themeBtn.dataset.type == "light" ? "night" : "light"][currentLang];
});

themeBtn.addEventListener("click", (event) => {
  let type = event.target.dataset.type;

  if (type === "light") {
    event.target.textContent = lang["light"][currentLang];
    event.target.dataset.type = "night";
  } else {
    event.target.textContent = lang["night"][currentLang];
    event.target.dataset.type = "light";
  }

  if (document.body.className.length === 0) {
    document.body.classList.add("night", "boshqa");
  } else {
    document.body.classList.remove("night", "boshqa");
  }
});
