const focusPossible = "button, input, a, textarea";
let lastFocus = null;


function changeFocusable() {
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");
	let focusable = [];
	if (modalWindow2.style.display === "block") {
		return (focusable = [...modalWindow2.querySelectorAll(focusPossible)]);
	} else {
		return (focusable = [...modalWindow.querySelectorAll(focusPossible)]);
	}
}

function focusAction(event) {
	event.preventDefault();
	const modal1 = document.querySelector(".modal1");
	let index = focusable.findIndex(
		(f) => f === modal1.querySelector(":focus")
	);
	if (event.shiftKey === true) {
		index--;
	} else {
		index++;
	}
	if (index >= focusable.length) {
		index = 0;
	}
	if (index < 0) {
		index = focusable.length - 1;
	}
	focusable[index].focus();
}

export function openModal() {
	const modal1 = document.querySelector(".modal1");
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");
	lastFocus = document.querySelector(":focus");
	changeFocusable();
	focusable[0].focus();
	modal1.style.display = "flex";
	modal1.removeAttribute("aria-hidden");
	modal1.setAttribute("aria-modal", "true");
	modal1.addEventListener("click", closeModal);
	modalWindow.addEventListener("click", stopPropagation);
	modalWindow2.addEventListener("click", stopPropagation);
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
	if (lastFocus !== null) {
		lastFocus.focus();
	}
}

function stopPropagation(event) {
	event.stopPropagation();
}

function deleteModalPicture(event) {
	// event.preventDefault();
	// console.log(event);
	// return
	fetch(`http://localhost:5678/api/works/${event.target.id}`, {
		method: "DELETE",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	}).then((response) => {
		console.log(response);

		if (response.status === 204) {
			event.preventDefault();
			console.log(event);
			alert("204");
			return;
			createModalPicture();
		}
		if (response.status === 401) {
			event.preventDefault();
			console.log(event);
			alert("401");
			return;
			window.location.replace("./login/login.html");
		}
		if (response.status === 500) {
			event.preventDefault();
			console.log(event);
			alert("500");
			return;
			window.location.replace("./login/login.html");
		} else {
			event.preventDefault();
			console.log(event);
			alert("other");
			return;
			alert("alerte");
		}
	});
}

export async function createModalPicture() {
	const response = await fetch("http://localhost:5678/api/works");
	const projets = await response.json();

	for (let i = 0; i < projets.length; i++) {
		const modalProjets = document.getElementById("modal1-projets");
		const figure = document.createElement("figure");
		const image = document.createElement("img");
		const trash = document.createElement("button");
		modalProjets.appendChild(figure);
		figure.appendChild(trash);
		figure.appendChild(image);
		figure.classList.add("modal1-figure");
		image.classList.add("modal1-image");
		trash.classList.add("modal1-trash");
		trash.classList.add("fa-solid");
		trash.classList.add("fa-trash-can");
		trash.classList.add("fa-2xs");
		trash.addEventListener("click", deleteModalPicture);
		trash.id = projets[i].id;
		image.src = projets[i].imageUrl;
		image.alt = projets[i].title;
	}
}

function windowEvent(event) {
	const modal1 = document.querySelector(".modal1");
	if (event.key === "Escape" || event.key === "Esc") {
		closeModal(event);
	}
	if (event.key === "Tab" && modal1.style.display === "flex") {
		focusAction(event);
	}
}

document.querySelector(".modal1").addEventListener("click", closeModal);
window.addEventListener("keydown", windowEvent);
