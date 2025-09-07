document.addEventListener("DOMContentLoaded", () => {
    // Sign in button
    const authBtn = document.getElementById("authBtn");
    authBtn.addEventListener("click", () => {
        window.location.href = "signin.html"; // redirect to sign-in page
    });

    // Book buttons
    const bookBtns = document.querySelectorAll(".book-btn-bike, .book-btn-car");
    bookBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (!localStorage.getItem("user")) {
                alert("Please sign in first!");
            } else {
                alert("Vehicle added to booking!");
            }
        });
    });

    // Contact form -> send to backend
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", async e => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message")
        };

        try {
            const res = await fetch("http://localhost:8080/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert("Failed to send message.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("❌ Failed to fetch (check backend is running).");
        }
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
