// let lastFocus = null;
// const focusPossible = "button, input, a, textarea";
// const focusable = [];

export function openModal() {
	const modal1 = document.querySelector(".modal1");
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");
	// lastFocus = document.querySelector(":focus");
	// if (focusable.length >= 1) {
	// 	focusable[0].focus();
	// }
	modal1.style.display = "flex";
	modal1.removeAttribute("aria-hidden");
	modal1.setAttribute("aria-modal", "true");
	modal1.addEventListener("click", closeModal);
	modalWindow.addEventListener("click", stopPropagation);
	modalWindow2.addEventListener("click", stopPropagation);
	// changeFocusableWindow1();
}

export function closeModal() {
	const modal1 = document.querySelector(".modal1");
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");
	if (modal1.style.display === "none") {
		return;
	}
	modal1.style.display = "none";
	modalWindow2.style.display = "none";
	modalWindow.style.display = "block";
	modal1.setAttribute("aria-hidden", "true");
	modal1.removeAttribute("aria-modal");
	modal1.removeEventListener("click", closeModal);
	modalWindow.removeEventListener("click", stopPropagation);
	modalWindow2.removeEventListener("click", stopPropagation);
	// if (lastFocus !== null) {
	// 	lastFocus.focus();
	// }
}

function stopPropagation(event) {
	console.log(event);
	event.stopPropagation();
}

export function windowEvent(event) {
	const modal1 = document.querySelector(".modal1");
	if (event.key === "Escape" || event.key === "Esc") {
		closeModal();
	}
	// if (event.key === "Tab" && modal1.style.display === "flex") {
	// 	focusAction(event);
	// }
}

// export function changeFocusableWindow1() {
// 	const modalWindow1 = document.getElementById(`modal-window1`);
// 		return [...modalWindow1.querySelectorAll(focusPossible)];
// }
// export function changeFocusableWindow2(arg) {
// 	const modalWindow2 = document.getElementById(`${arg}`);
// 		return [...modalWindow2.querySelectorAll(focusPossible)];
// }

// function focusAction(event) {
// 	event.preventDefault();
// 	const modal1 = document.querySelector(".modal1");
// 	let index = focusable.findIndex(
// 		(f) => f === modal1.querySelector(":focus")
// 		);
// 		console.log(index);
// 	if (event.shiftKey === true) {
// 		index--;
// 	} else {
// 		index++;
// 	}
// 	if (index >= focusable.length) {
// 		index = 0;
// 	}
// 	if (index < 0) {
// 		index = focusable.length - 1;
// 	}
// 	focusable[index].focus();
// }
