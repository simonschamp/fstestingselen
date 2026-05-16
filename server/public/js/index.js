const API_BASE = "http://localhost:8000";

document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    //const form = event.target;
    //const formData = new FormData(form);
    const formData = new FormData(this);
    //formData.append("description", document.getElementById("desc").value);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const responseData = await response.json();
      console.log("Upload successfull", responseData);
    } catch (error) {
      console.log("Error during uploading:", error);
      alert("File upload failed!");
    } finally {
      // Refresh the gallery
      if (response?.ok) {
        await fetchImages();
      }
    }
  });

async function fetchImages() {
  const res = await fetch(`${API_BASE}/api/images`);
  try {
    if (!res.ok) {
      throw new Error("Error while trying to fetch images");
    }
    const data = await res.json();
    displayImages(data);
  } catch (error) {
    console.error("Error while fetching images", error);
  }
}

function displayImages(data) {
  const imageGrid = document.getElementById("imageGrid");
  imageGrid.innerHTML = ""; // clear previous images
  data.forEach((imgData) => {
    const imageItem = document.createElement("div"); // we create a div
    imageItem.classList.add("imageItem"); // we add class to the div

    const img = document.createElement("img"); // we create image tag
    img.src = `${API_BASE}${imgData.path}`;
    img.alt = imgData.description || "Uploaded image";

    const description = document.createElement("p");
    description.textContent = imgData.description || "No description";

    imageItem.appendChild(img);
    imageItem.appendChild(description);
    imageGrid.appendChild(imageItem);
  });
}

const listOfUsers = async () => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return;
  }
  const response = await fetch(`${API_BASE}/user/list`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    document.getElementById("error").textContent = "Error while fetching users";
    throw new Error("Error while fetching users");
  }
  const data = await response.json();
  //console.log(data);

  displayUsers(data);
};

const displayUsers = (data) => {
  const displayDiv = document.getElementById("list-box");
  const uL = document.getElementById("user-list");

  uL.innerHTML = ""; //Clear previous content

  // This method works also
  /*for (let i = 0; i < data.length; i++) {
    console.log(data[i].username);
    console.log(data[i].password);
  }*/

  // This method works also
  /*data.map((item) => {
    console.log(item.username);
  });*/

  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `Username: ${item.username}, password: ${item.password} `;

    uL.appendChild(li);
  });
  displayDiv.appendChild(uL);
};

// Runs at the startup
fetchImages();
listOfUsers();

//Log out btn
const logOut = () => {
  localStorage.removeItem("auth_token");
  window.location.href = "http://127.0.0.1:5500/public/login.html";
};
document.getElementById("logout").addEventListener("click", logOut);

//Register btn
document.getElementById("btn-register").addEventListener("click", (event) => {
  register(event);
});
const register = (event) => {
  event.preventDefault();
  window.location.href = "http://127.0.0.1:5500/public/register.html";
};

//Log in btn
document.getElementById("btn-login").addEventListener("click", (event) => {
  logIn(event);
});
const logIn = (event) => {
  event.preventDefault();
  window.location.href = "http://127.0.0.1:5500/public/login.html";
};
