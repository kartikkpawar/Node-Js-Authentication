const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const signInButton = document.getElementById("signInButton");

signInButton.addEventListener("click", (e) => {
  const email = signInEmail.value;
  const password = signInPassword.value;
  if (email === "" || password === "") return alert("Enter email and password");

  fetch("/create-session", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    window.location.href = "/user-profile";
  });
});
