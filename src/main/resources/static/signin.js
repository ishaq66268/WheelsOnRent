document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginMsg = document.getElementById("loginMessage");
  const signupMsg = document.getElementById("signupMessage");

  // 🔒 LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = loginForm.username.value;
      const password = loginForm.password.value;

      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then(response => response.text())
        .then(msg => {
          if (msg.trim() === "Login Successful") {
            loginMsg.style.color = "green";
            loginMsg.textContent = "✅ Login Successful!";
            localStorage.setItem("user", username);
            setTimeout(() => window.location.href = "index.html", 1500);
          } else {
            loginMsg.style.color = "red";
            loginMsg.textContent = "❌ " + msg;
          }
        })
        .catch(error => {
          loginMsg.style.color = "red";
          loginMsg.textContent = "⚠️ Login failed. Check backend.";
        });
    });
  }

  // 📝 SIGNUP
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = signupForm.username.value;
      const password = signupForm.password.value;

      fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then(response => response.text())
        .then(msg => {
          signupMsg.style.color = "green";
          signupMsg.textContent = "✅ " + msg;
          setTimeout(() => {
            signupMsg.textContent = "";
            toggleForm();
          }, 1500);
        })
        .catch(error => {
          signupMsg.style.color = "red";
          signupMsg.textContent = "⚠️ Registration failed.";
        });
    });
  }
});
function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginMsg = document.getElementById("loginMessage");
  const signupMsg = document.getElementById("signupMessage");

  // Clear old messages
  loginMsg.textContent = "";
  signupMsg.textContent = "";

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
}
