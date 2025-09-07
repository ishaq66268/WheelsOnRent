document.addEventListener("DOMContentLoaded", function () {
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
      name: document.getElementById("username").value,
      vehicleType: vehicleSelect.value,
      model: modelSelect.value,
      date: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
      paymentMethod: document.getElementById("payment").value,
    };

    let allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    allBookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(allBookings));

    alert("✅ Booking confirmed!\n\n" +
      `Name: ${bookingData.name}\n` +
      `Vehicle: ${bookingData.vehicleType} - ${bookingData.model}\n` +
      `Start: ${bookingData.date}\n` +
      `End: ${bookingData.endDate}\n` +
      `Payment: ${bookingData.paymentMethod}`
    );

    bookingForm.reset();
    previewImage.src = "";
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
