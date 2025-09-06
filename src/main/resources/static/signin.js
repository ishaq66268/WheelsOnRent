document.addEventListener("DOMContentLoaded", () => {
  // Change BASE_URL from localhost → Render backend
  const BASE_URL = "https://wheelsonrent-0ml1.onrender.com"; 

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginMsg = document.getElementById("loginMessage");
  const signupMsg = document.getElementById("signupMessage");

  // POST request helper
  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await res.text();
    if (!res.ok) throw new Error(text || "Server error");
    return text;
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      loginMsg.style.color = "black";
      loginMsg.textContent = "⏳ Logging in...";

      try {
        const msg = await postData(`${BASE_URL}/login`, {
          username: loginForm.username.value.trim(),
          password: loginForm.password.value.trim()
        });
        loginMsg.style.color = "green";
        loginMsg.textContent = "✅ " + msg;
        localStorage.setItem("user", loginForm.username.value.trim());
        setTimeout(() => window.location.href = "index.html", 1500);
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

      try {
        const msg = await postData(`${BASE_URL}/register`, {
          username: signupForm.username.value.trim(),
          password: signupForm.password.value.trim()
        });
        signupMsg.style.color = "green";
        signupMsg.textContent = "✅ " + msg;
        setTimeout(() => {
          signupMsg.textContent = "";
          toggleForm();
        }, 1500);
      } catch (err) {
        signupMsg.style.color = "red";
        signupMsg.textContent = "❌ " + err.message;
      }
    });
  }
});

// Toggle between login & signup
function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  document.getElementById("loginMessage").textContent = "";
  document.getElementById("signupMessage").textContent = "";

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
}
