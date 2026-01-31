const toDolistText = document.getElementById("toDo-list-text");
const alertMsg = document.getElementById("alertMsg");
const listItems = document.getElementById("list-items");
const addTaskBtn = document.getElementById("add-task-btn");
let editing = false;

let toDoListItems = [];

function addTask() {
  const text = toDolistText.value.trim().toLowerCase();

  if (text === "") {
    alertMsg.innerText = "Escribe una tarea!";
    toDolistText.focus();
    return; // Detenemos la funcion si el campo esta vacio
  }

  // Buscamos el text en el array usando el metodo some()
  const IsPresent = toDoListItems.some((item) => item.item === text);

  if (IsPresent) {
    // si es true es porque encontro concidencia en el array
    alertMsg.innerText = "Esta tarea ya existe!";
    toDolistText.focus();
    return; // Detenemos la funcion si la tarea existe
  }

  // Creamos el li
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${text}</span>
    <div class="icon-controls">
    <svg class="edit task-controls" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
       <!-- SVG INLINE -->
    <svg class="delete task-controls"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>

    <svg class="completed task-controls" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></svg>
  
    </div>
  `;
  const taskId = Date.now();

  li.dataset.id = taskId;

  toDoListItems.push({
    id: taskId,
    item: text,
    status: false,
  });
  listItems.appendChild(li); // lo añadimos al UL

  if (editing) {
    alertMsg.innerText = "Tarea editada exitosamente!";
  } else {
    alertMsg.innerText = "Tarea creada exitosamente!";
  }

  toDolistText.value = ""; // vaciamo sel input
  toDolistText.focus(); // damos foco
  editing = false;
}

toDolistText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask(); // Si tenemos foco en el input y damos enter, llamamos la funcion
  }
});

// Eschuamos el evento en el li que contenga la clase completed
listItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("completed")) {
    if (editing) {
      editingTrue();
      return;
    }

    const li = e.target.closest("li");
    const span = li.querySelector("span");
    const textTask = span.innerText;
    const edit = li.querySelector(".edit");

    edit.classList.add("done");
    span.classList.add("done");
    e.target.classList.add("done");

    const task = toDoListItems.find((t) => t.item === textTask.toLowerCase());

    task.status = true;
  }
});

// Eschuamos el evento en el li que contenga la clase delete
listItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const btnYes = document.getElementById("btnYes");
    const btnNo = document.getElementById("btnNo");
    const overplay = document.getElementById("overplay");
    const textTask = document.getElementById("textTaskDelete");
    const li = e.target.closest("li");
    const text = li.querySelector("span").innerText;
    console.log(text);

    if (editing) {
      editingTrue();
      return;
    }

    overplay.classList.remove("hidden"); // aparece el overplay - modal
    textTask.innerText = `* ${text} *`; // mostramos en el modal el texto de la tarea a borrar

    btnYes.onclick = () => {
      toDoListItems = toDoListItems.filter((task) => task.item !== text); // filtra todo menos el array encontrado
      li.remove(); // eliminamos el li del ul
      alertMsg.innerText = "Tarea eliminada exitosamente"; // Da la alerta que se ha eliminado
      overplay.classList.add("hidden");
    };
    btnNo.onclick = () => {
      overplay.classList.add("hidden");
    };
  }
});

// Eschuamos el evento en el li que contenga la clase delete
listItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    if (editing) {
      editingTrue();
      return;
    }
    editing = true;
    const li = e.target.closest("li");
    const span = li.querySelector("span");

    toDolistText.value = span.innerText;
    toDolistText.focus();
    toDoListItems = toDoListItems.filter(
      (task) => task.item !== span.innerText,
    );
    li.remove();
  }
});

addTaskBtn.addEventListener("click", (e) => {
  if (editing) {
    if (toDolistText.value === "") {
      alertMsg.innerText = "Escribe una tarea!";
      toDolistText.focus();
      return;
    }
  }
  addTask();
});

window.addEventListener("load", () => {
  toDolistText.focus(); // hacemos focus al iniciar la pagina
});

function editingTrue() {
  alert("Se esta editando una tarea!");
  toDolistText.focus();
}

const allFilter = document.getElementById("all-control");
const completedFilter = document.getElementById("completed-control");
const activeFilter = document.getElementById("active-control");

function filterTask(condicion) {
  const items = [...listItems.children];
  items.forEach((li) => {
    const id = Number(li.dataset.id);
    const task = toDoListItems.find((task) => task.id === id);

    li.style.display = condicion(task) ? "flex" : "none";
  });
}

completedFilter.onclick = () => {
  filterTask((task) => task.status === true);
};

allFilter.onclick = () => {
  filterTask(() => true);
};

activeFilter.onclick = () => {
  filterTask((task) => task.status === false);
};

const user = localStorage.getItem("user");

if (!user) {
  window.location.href = "login.html";
}

let userText = document.getElementById("user-email");
const userString = JSON.parse(user);

userText.innerText = userString.email;

const layout= document.getElementById("layout");

layout.addEventListener("click", () =>{
  localStorage.removeItem("user");
  window.location.href="login.html";
  
})
