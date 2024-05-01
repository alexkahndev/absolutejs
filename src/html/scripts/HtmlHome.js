document.addEventListener("DOMContentLoaded", (event) => {
	const greeting = document.getElementById("greeting");
	const date = new Date();
	const hours = date.getHours();

	if (hours < 12) {
		greeting.textContent = "Good Morning!";
	} else if (hours < 18) {
		greeting.textContent = "Good Afternoon!";
	} else {
		greeting.textContent = "Good Evening!";
	}

	const button = document.getElementById("counter-button");
	const counter = document.getElementById("counter");
	let count = 0;

	button.addEventListener("click", () => {
		count++;
		counter.textContent = count;
	});
});
