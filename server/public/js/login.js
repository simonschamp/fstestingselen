const API_BASE = "http://localhost:8000";

const initializeLogin = (event) => {
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    fetchData(event);
  });
};

const fetchData = async (event) => {
  event.preventDefault();

  const formData = {
    username: event.target.username.value,
    password: event.target.password.value,
  };

  try {
    const response = await fetch(`${API_BASE}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("error").innerHTML = "Wrong username or password";
      return;
    } else {
      console.log("Log in successful", data);

      if (data.token) {
        localStorage.setItem("auth_token", data.token);
        window.location.href = "http://127.0.0.1:5500/public/index.html";
      }
    }
  } catch (error) {
    console.log("Error while trying to login", error);
    document.getElementById("error").textContent =
      "Unable to connect to server. Try again later.";
  }
};

// Register btn
document.getElementById("btn-register").addEventListener("click", (event) => {
  register(event);
});
const register = (event) => {
  event.preventDefault();
  window.location.href = "http://127.0.0.1:5500/public/register.html";
};

// Home btn
document.getElementById("btn-index").addEventListener("click", (event) => {
  home(event);
});
const home = (event) => {
  event.preventDefault();
  window.location.href = "http://127.0.0.1:5500/public/index.html";
};

initializeLogin();
