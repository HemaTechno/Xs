

  import { db } from "./db/firebase-config.js";
  import { collection, addDoc, serverTimestamp } from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  const form = document.getElementById("signupForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      message.innerHTML = "❌ Passwords do not match";
      return;
    }

    try {
      await addDoc(collection(db, "signup_requests"), {
        username: username,
        password: password, // ⚠️ يفضل تشفيره لاحقًا
        status: "pending",
        createdAt: serverTimestamp()
      });

      message.innerHTML =
        "✅ Request submitted successfully.<br>Your account will be activated within 24 hours.";

      form.reset();
    } catch (error) {
      message.innerHTML = "❌ Error: " + error.message;
    }
  });

