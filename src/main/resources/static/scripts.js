document.addEventListener("DOMContentLoaded", () => {
  // 🔄 Update Auth Button
  const authBtn = document.getElementById("authBtn");

  if (authBtn) {
    const user = localStorage.getItem("user");

    if (user) {
      authBtn.textContent = "Logout";
      authBtn.onclick = () => {
        localStorage.removeItem("user");
        window.location.href = "signin.html";
      };
    } else {
      authBtn.textContent = "Sign in";
      authBtn.onclick = () => {
        window.location.href = "signin.html";
      };
    }
  }

  // 🔎 Search Filter
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const bikes = document.querySelectorAll(".card-bikes");
      const cars = document.querySelectorAll(".card-cars");

      bikes.forEach(card => {
        const name = card.querySelector(".bike-name").textContent.toLowerCase();
        card.style.display = name.includes(query) ? "block" : "none";
      });

      cars.forEach(card => {
        const name = card.querySelector(".car-name").textContent.toLowerCase();
        card.style.display = name.includes(query) ? "block" : "none";
      });
    });
  }

  // 🚗 Book Now Buttons
  document.querySelectorAll('.book-btn-bike, .book-btn-car').forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = "booking.html";
    });
  });
});
