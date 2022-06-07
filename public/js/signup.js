const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const emailInput = document.getElementById("signUpEmail");
const passwordInput = document.getElementById("signUpPassword");
const confirmPasswordInput = document.getElementById("signUpConfirmPassword");
const signupButton = document.getElementById("signupButton");

signupButton.addEventListener("click", (e) => {
  const name = firstname.value + " " + lastname.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (name === "" || email === "" || password === "" || confirmPassword === "")
    return alert("Enter all fields");
  if (password !== confirmPassword) return alert("Passwords dont match");

  fetch("/signup-user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    window.location.href = "/sign-in";
  });
});
