const fpEmail = document.getElementById("fpEmail");
const fpNewPass = document.getElementById("fpNewPass");
const fpConfirmPass = document.getElementById("fpConfirmPass");
const forgotPasswordButton = document.getElementById("forgotPasswordButton");

forgotPasswordButton.addEventListener("click", (e) => {
  const email = fpEmail.value;
  const newPassword = fpNewPass.value;
  const confirmPassword = fpConfirmPass.value;
  if (email === "" || newPassword === "" || confirmPassword === "")
    return alert("Enter email all fields");

  if (newPassword !== confirmPassword) return alert("Passwords don't match");

  fetch("/forgot-password", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  }).then(async (res) => {
    const message = await res.json();
    console.log(message);
    if (message.type == "error") return alert(message.msg);
    if (message.type == "success") window.location.href = "/signout";
  });
});
