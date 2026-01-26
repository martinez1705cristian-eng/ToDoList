const toDolistText = document.getElementById("toDo-list-text");
const alertMsg = document.getElementById("alertMsg");
const listItems = document.getElementById("list-items");

let toDoListItems = [];

function addTask() {
  const text = toDolistText.value.trim().toLowerCase();

  if (text === "") {
    alertMsg.innerText = "Escribe una tarea!";
    toDolistText.focus();
    return; // Detenemos la funcion si el campo esta vacio
  }

  // Buscamos el text en el array usando el metodo some()
  const IsPresent = toDoListItems.some(item => item.item === text);

  if (IsPresent) { // si es true es porque encontro concidencia en el array
    alertMsg.innerText = "Esta tarea ya existe!";
    toDolistText.focus()
    return; // Detenemos la funcion si la tarea existe
  }

  // Creamos el li 
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <div class="icon-controls">
      <img class="edit task-controls" src="/img/pincel.png" />
      <img class="delete task-controls" src="/img/delete.png" />
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