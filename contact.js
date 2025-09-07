 document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission

    // You can send form data to the server here using fetch/AJAX
    // Example:
    // const formData = new FormData(this);
    // fetch("/contact", { method: "POST", body: formData });

    setTimeout(() => {
      alert("✅ Your message has been sent successfully!");
      this.reset(); // optional: clears the form
    }, 100); // small delay to mimic server response
  });

