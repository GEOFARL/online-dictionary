document.getElementById("togglePassword").addEventListener("click", () => {
	const passwordInput = document.getElementById("password");
	const type =
		passwordInput.getAttribute("type") === "password" ? "text" : "password";
	passwordInput.setAttribute("type", type);
});
