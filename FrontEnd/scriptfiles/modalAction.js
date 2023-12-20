// export function openModal() {
// 	const modal1 = document.querySelector(".modal1");
// 	const modalWindow = document.querySelector(".modal-window1");
// 	const modalWindow2 = document.querySelector(".modal-window2");
// 	lastFocus = document.querySelector(":focus");
// 	const focusable = changeFocusable();
// 	if (focusable.length >= 1) {
// 		focusable[0].focus();
// 	}
// 	modal1.style.display = "flex";
// 	modal1.removeAttribute("aria-hidden");
// 	modal1.setAttribute("aria-modal", "true");
// 	modal1.addEventListener("click", closeModal);
// 	modalWindow.addEventListener("click", stopPropagation);
// 	modalWindow2.addEventListener("click", stopPropagation);
// }

// export function closeModal() {
// 	const modal1 = document.querySelector(".modal1");
// 	const modalWindow = document.querySelector(".modal-window1");
// 	const modalWindow2 = document.querySelector(".modal-window2");
// 	if (modal1.style.display === "none") {
// 		return;
// 	}
// 	modal1.style.display = "none";
// 	modalWindow2.style.display = "none";
// 	modalWindow.style.display = "block";
// 	modal1.setAttribute("aria-hidden", "true");
// 	modal1.removeAttribute("aria-modal");
// 	modal1.removeEventListener("click", closeModal);
// 	modalWindow.removeEventListener("click", stopPropagation);
// 	modalWindow2.removeEventListener("click", stopPropagation);
// 	if (lastFocus !== null) {
// 		lastFocus.focus();
// 	}
// }

// function stopPropagation(event) {
//   console.log(event);
// 	event.stopPropagation();
// }
