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

  listItems.appendChild(li); // lo añadimos al UL

  toDoListItems.push({ item: text, status: false }); // añadimos el objeto al array

  alertMsg.innerText = "Tarea creada exitosamente!";
  toDolistText.value = ""; // vaciamo sel input
  toDolistText.focus(); // damos foco
}

toDolistText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask(); // Si tenemos foco en el input y damos enter, llamamos la funcion
  }
});

// Eschuamos el evento en el li que contenga la clase completed
listItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("completed")) {
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
    const li = e.target.closest("li");
    const text = li.querySelector("span").innerText;

    toDoListItems = toDoListItems.filter((task) => task.item !== text); // filtra todo menos el array encontrado
    li.remove(); // eliminamos el li del ul
    alertMsg.innerText = "Tarea eliminada exitosamente"; // Da la alerta que se ha eliminado
  }
});

// Eschuamos el evento en el li que contenga la clase delete
listItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    if (editing) {
      alert("Se esta editando una tarea!");
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
  if (editing) editing = false;
  alertMsg.innerText = "Tarea editada exitosamente";
});
