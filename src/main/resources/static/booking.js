document.addEventListener("DOMContentLoaded", function () {
  // const BASE_URL = "http://localhost:8080";
  const BASE_URL = "https://wheelsonrent-0ml1.onrender.com";


  const bookingForm = document.getElementById("bookingForm");
  const vehicleSelect = document.getElementById("vehicleType");
  const modelSelect = document.getElementById("vehicleName");
  const previewImage = document.getElementById("vehiclePreview");

  const bikeModels = ["hero", "shine", "splender", "bmw", "yamaha", "royalenfield"];
  const carModels = ["tata", "maruti", "hyundai", "honda", "mahindra", "kia"];

  function populateModels(type) {
    modelSelect.innerHTML = `<option value="">--Choose Model--</option>`;
    let models = [];
    if (type === "Bike") {
      models = bikeModels;
    } else if (type === "Car") {
      models = carModels;
    }
    models.forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model.charAt(0).toUpperCase() + model.slice(1);
      modelSelect.appendChild(option);
    });
  }

  function updatePreview() {
    const model = modelSelect.value.toLowerCase().replace(/\s+/g, "");
    const type = vehicleSelect.value.toLowerCase();
    if (type && model) {
      const imgPath = `images/${type}${model}.jpg`;
      console.log("Trying to load:", imgPath);
      previewImage.onerror = () => {
        previewImage.onerror = null;
        previewImage.src = "images/notfound.jpg";
      };
      previewImage.src = imgPath;
    } else {
      previewImage.src = "";
    }
  }

  vehicleSelect.addEventListener("change", function () {
    populateModels(this.value);
    updatePreview();
  });

  modelSelect.addEventListener("change", updatePreview);
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) {
      alert("❌ Please sign in to confirm booking.");
      return;
    }

    const bookingData = {
      username: document.getElementById("username").value,
      vehicleType: vehicleSelect.value,
      vehicleName: modelSelect.value,
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
      paymentMethod: document.getElementById("payment").value
    };

    // Send booking to backend
    fetch(`${BASE_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    })
      .then(response => response.json())
      .then(data => {
        alert(`✅ ${data.message}`);
        bookingForm.reset();
        previewImage.src = "";
      })
      .catch(error => {
        console.error("Error:", error);
        alert("❌ Failed to save booking. Try again.");
      });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  const authBtn = document.getElementById("authBtn");
  const user = localStorage.getItem("user");

  if (authBtn) {
    if (user) {
      // Show first letter in a circle
      authBtn.textContent = user.charAt(0).toUpperCase();
      authBtn.style.width = "35px";
      authBtn.style.height = "35px";
      authBtn.style.borderRadius = "50%";
      authBtn.style.textAlign = "center";
      authBtn.style.lineHeight = "35px";
      authBtn.style.fontWeight = "bold";
      authBtn.style.backgroundColor = "#007bff";
      authBtn.style.color = "white";
      authBtn.style.cursor = "pointer";

      // Optional: Click to log out
      authBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "signin.html";
      });
    } else {
      // Default: show "Sign in" button
      authBtn.textContent = "Sign in";
      authBtn.style.width = "";
      authBtn.style.height = "";
      authBtn.style.borderRadius = "";
      authBtn.style.backgroundColor = "";
      authBtn.style.color = "";
      authBtn.style.cursor = "pointer";
      authBtn.addEventListener("click", () => {
        window.location.href = "signin.html";
      });
    }
  }
});
// booking.js
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "signin.html"; // redirect if not logged in
  } else {
    const authBtn = document.getElementById("authBtn");
    if (authBtn) {
      authBtn.textContent = user.charAt(0).toUpperCase();
      authBtn.classList.add("user-circle");
    }
  }
});
