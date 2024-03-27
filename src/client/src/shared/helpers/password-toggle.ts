const initPasswordToggle = () => {
	const passwordInput = document.getElementById("password");
	const togglePasswordBtn = document.getElementById("togglePassword");
	const showPasswordIcon = togglePasswordBtn.querySelector(
		".show-password-icon",
	);

	togglePasswordBtn.addEventListener("click", () => {
		const type =
			passwordInput.getAttribute("type") === "password" ? "text" : "password";
		passwordInput.setAttribute("type", type);

		// Change the icon based on the password visibility
		if (type === "password") {
			showPasswordIcon.setAttribute("src", "/icons/eye-closed.svg");
		} else {
			showPasswordIcon.setAttribute("src", "/icons/eye-visible.svg");
		}
	});
};

export { initPasswordToggle };
