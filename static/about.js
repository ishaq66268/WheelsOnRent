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
