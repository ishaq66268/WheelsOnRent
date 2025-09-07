// signin.js (or inside a <script> on signin.html)
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm"); // your form ID

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const text = await response.text();
          alert(text); // or redirect to dashboard
          localStorage.setItem("user", username);
          window.location.href = "index.html";
        } else {
          const err = await response.text();
          alert("Login failed: " + err);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server error. Check console.");
      }
    });
  }
});
