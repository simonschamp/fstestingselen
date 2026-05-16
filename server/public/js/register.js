const API_BASE = "http://localhost:8000";

const initializeRegister = () => {
  document
    .getElementById("registerForm")
    .addEventListener("submit", (event) => {
      fetchData(event);
    });
};

const fetchData = async (event) => {
  event.preventDefault();

  const formData = {
    username: event.target.username.value,
    password: event.target.password.value,
  };

  console.log(formData.username, formData.password);
  try {
    const response = await fetch(`${API_BASE}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      document.getElementById("error").innerText =
        "Error while trying to register. Please try aagain";
    } else {
      window.location.href = "/login.html";
    }
  } catch (error) {
    console.log(`Error while trying to register: ${error.message}`);
  }
};

initializeRegister();

// Log in btn
const logIn = () => {
  window.location.href = "http://127.0.0.1:5500/public/login.html";
};
document.getElementById("login").addEventListener("click", logIn);

// Home btn
document.getElementById("btn-index").addEventListener("click", (event) => {
  home(event);
});
const home = (event) => {
  event.preventDefault();
  window.location.href = "http://127.0.0.1:5500/public/index.html";
};
