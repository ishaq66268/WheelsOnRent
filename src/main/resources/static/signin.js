console.log("signin.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "http://localhost:8080";

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginMsg = document.getElementById("loginMessage");
  const signupMsg = document.getElementById("signupMessage");
  const authBtn = document.getElementById("authBtn");

  // Update nav button if user is already logged in
  const loggedUser = localStorage.getItem("user");
  if (loggedUser && authBtn) {
    authBtn.textContent = loggedUser.charAt(0).toUpperCase();
    authBtn.classList.add("user-circle");
  }

  // Nav "Sign in" button
  if (authBtn && !loggedUser) {
    authBtn.addEventListener("click", () => {
      window.location.href = "signin.html";
    });
  }

  // POST request helper
  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Server error");
    return json.message;
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      loginMsg.style.color = "black";
      loginMsg.textContent = "⏳ Logging in...";

      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      try {
        await postData(`${BASE_URL}/login`, { username, password });
        localStorage.setItem("user", username);

        // Update nav button
        if (authBtn) {
          authBtn.textContent = username.charAt(0).toUpperCase();
          authBtn.classList.add("user-circle");
        }

        loginMsg.style.color = "green";
        loginMsg.textContent = "✅ Logged in!";
        setTimeout(() => (window.location.href = "index.html"), 1000);
      } catch (err) {
        loginMsg.style.color = "red";
        loginMsg.textContent = "❌ " + err.message;
      }
    });
  }

  // SIGNUP
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      signupMsg.style.color = "black";
      signupMsg.textContent = "⏳ Registering...";

      const username = document.getElementById("signupUsername").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      try {
        await postData(`${BASE_URL}/register`, { username, password });
        signupMsg.style.color = "green";
        signupMsg.textContent = "✅ Registered!";
        setTimeout(() => {
          signupMsg.textContent = "";
          toggleForm();
        }, 1000);
      } catch (err) {
        signupMsg.style.color = "red";
        signupMsg.textContent = "❌ " + err.message;
      }
    });
  }
});

// Toggle login/signup forms
function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  document.getElementById("loginMessage").textContent = "";
  document.getElementById("signupMessage").textContent = "";

  loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
}
