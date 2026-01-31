const form = document.getElementById("login-form");

const FAKE_USER = {
  email: "test@test.com",
  password: "123",
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Completa los datos.");
    return;
  }

  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    localStorage.setItem("user", JSON.stringify({ email }));
    window.location.href = "index.html"; // tu todolist
  } else {
    alert("Email o contraseña incorrectos");
    email.value = "";
    password.value = "";
  }
});

window.addEventListener("load", () => {
  email.focus();
});

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("email");
  if (input) {
    input.value = input.value; // fuerza repaint
  }
});
