const cpCurrentPassword = document.getElementById("cpCurrentPassword");
const cpNewPassword = document.getElementById("cpNewPassword");
const cpConfirmPassword = document.getElementById("cpConfirmPassword");
const changepasswordButton = document.getElementById("changepasswordButton");

changepasswordButton.addEventListener("click", (e) => {
  const currentPassword = cpCurrentPassword.value;
  const newPassword = cpNewPassword.value;
  const confirmPassword = cpConfirmPassword.value;
  if (currentPassword === "" || newPassword === "" || confirmPassword === "")
    return alert("Enter email and password");

  if (newPassword !== confirmPassword) return alert("Passwords don't match");

  fetch("/change-password", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  }).then(async (res) => {
    const message = await res.json();
    console.log(message);
    if (message.type == "error") return alert(message.msg);
    if (message.type == "success") window.location.href = "/signout";
  });
});
