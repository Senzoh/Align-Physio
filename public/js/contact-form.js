const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value,
  };

  try {
    const res = await fetch("/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (result.success) {
      // ✅ Redirect to confirmation page
      window.location.href = `/pages/contact-us/contact-us-confirm.html?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
    } else {
      alert("❌ Failed to send message. Please try again.");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    alert("⚠️ Something went wrong. Please try again.");
  }
});
