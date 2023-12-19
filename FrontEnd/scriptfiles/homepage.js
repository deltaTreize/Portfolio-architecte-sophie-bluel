const focusPossible = "button, input, a, textarea";
let lastFocus = null;

function connectedDisplay() {
	const admin = document.querySelectorAll(".admin");
	const adminArray = Array.from(admin);
	const noAdmin = document.querySelectorAll(".noAdmin");
	const noAdminArray = Array.from(noAdmin);

	if (localStorage.getItem("token")) {
		adminArray.forEach((element) => {
			element.style.display = "flex";
		});

		noAdminArray.forEach((element) => {
			element.style.display = "none";
		});
	} else {
		adminArray.forEach((element) => {
			element.style.display = "none";
		});
		noAdminArray.forEach((element) => {
			element.style.display = "flex";
		});
	}
}

async function createProjet(arg) {
	const gallery = document.querySelector(".gallery");
	gallery.replaceChildren();
	const response = await fetch("http://localhost:5678/api/works");
	const projets = await response.json();
	const projet = projets.filter((projet) => projet.categoryId === arg);

	if (projet.length > 0) {
		for (let i = 0; i < projet.length; i++) {
			const figure = document.createElement("figure");
			const image = document.createElement("img");
			const figcaption = document.createElement("figcaption");
			gallery.appendChild(figure);
			figure.appendChild(image);
			figure.appendChild(figcaption);
			figure.classList.add("figure");
			image.src = projet[i].imageUrl;
			image.alt = projet[i].title;
			figcaption.innerText = projet[i].title;
		}
	} else {
		for (let i = 0; i < projets.length; i++) {
			const figure = document.createElement("figure");
			const image = document.createElement("img");
			const figcaption = document.createElement("figcaption");
			gallery.appendChild(figure);
			figure.appendChild(image);
			figure.appendChild(figcaption);
			figure.classList.add("figure");
			image.src = projets[i].imageUrl;
			image.alt = projets[i].title;
			figcaption.innerText = projets[i].title;
		}
	}
}

function changeFocusable() {
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");
	//const focusable = [];
	if (modalWindow2.style.display === "block") {
		return [...modalWindow2.querySelectorAll(focusPossible)];
	} else {
		return [...modalWindow.querySelectorAll(focusPossible)];
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

function openModal() {
	const modal1 = document.querySelector(".modal1");
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");
	lastFocus = document.querySelector(":focus");
	const focusable = changeFocusable();
	if (focusable.length >= 1) {
		focusable[0].focus();
	}
	modal1.style.display = "flex";
	modal1.removeAttribute("aria-hidden");
	modal1.setAttribute("aria-modal", "true");
	modal1.addEventListener("click", closeModal);
	modalWindow.addEventListener("click", stopPropagation);
	modalWindow2.addEventListener("click", stopPropagation);
}

function closeModal() {
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

async function createModalPicture() {
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

function previewFile() {
	const pictureAddProjet = document.getElementById("picture");
	const file = pictureAddProjet.files[0];

	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const preview = document.querySelector(".preview");
			const importImg = document.querySelector(".importImg");
			const imageDataUrl = e.target.result;
			preview.src = imageDataUrl;
			if (preview.src) {
				importImg.style.display = "none";
			}
		};
		reader.readAsDataURL(file);
	}
}

function cleanForm() {
	const preview = document.querySelector(".preview");
	const errortext = document.querySelector(".error-text");
	const importImg = document.querySelector(".importImg");

	preview.src = "";
	importImg.style.display = "flex";
	document.querySelector(".inputAddProjet").value = "";
	document.getElementById("category").value = "0";
	errortext.style.display = "none";
}

async function createNewProjet(e) {
	console.log(e)
	e.preventDefault(); // modale se ferme tjr
 const ludo = document.getElementById("formAddProjet");
 const photo = document.getElementById('picture');
 const projectName = document.getElementById('titleProject');
 const categorySelect = document.getElementById('category');
 const photo2 = photo.files[0];
 const projectName2 = projectName.value;
 const categorySelect2 = categorySelect.value;
 const formData2 = new FormData ();
 formData2.append("image", photo2);
  formData2.append("title", projectName2);
  formData2.append("category",categorySelect2);
 console.log(ludo);
 fetch("http://localhost:5678/api/works", {
	method: "POST",
	headers: {
		Authorization: "Bearer " + `${localStorage.getItem("token")}`,
	},
	body: formData2,
})
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error("Erreur lors de l'ajout de la photo.");
      }
    })
 return;
	const formData = new FormData(document.getElementById("formAddProjet"));
	const errortext = document.querySelector(".error-text");
	 fetch("http://localhost:5678/api/works", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + `${localStorage.getItem("token")}`,
		},
		body: formData,
	}).then((response) => {
	
		if (response.status === 201) {
			console.log(response.json())
			//e.preventDefault(); // modale se ferme tjr
			// createModalPicture();
			// cleanForm();
		}
		if (response.status === 400) {
			console.log(response.status);
			errortext.style.display = "flex";
			alert("stop");
		}
		if (response.status === 500) {
			console.log(response.status);
			errortext.style.display = "flex";
		}
	});
}

function window2Visible() {
	const modal1 = document.querySelector(".modal1");
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");
	modal1.style.display = "flex";
	modal1.removeAttribute("aria-hidden");
	modal1.setAttribute("aria-modal", "true");
	modalWindow.style.display = "none";
	modalWindow2.style.display = "block";
	changeFocusable();
}

function modalArrow() {
	window1Visible();
	cleanForm();
}

function window1Visible() {
	const modal1 = document.querySelector(".modal1");
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");
	const preview = document.querySelector(".preview");
	const importImg = document.querySelector(".importImg");

	modal1.style.display = "flex";
	modal1.removeAttribute("aria-hidden");
	modal1.setAttribute("aria-modal", "true");
	modalWindow.style.display = "block";
	modalWindow2.style.display = "none";
	preview.src = "";
	importImg.style.display = "flex";
	changeFocusable();
}

function launch() {
	connectedDisplay();
	createProjet();
	createModalPicture();
	document
		.querySelector(".modifier-projet")
		.addEventListener("click", openModal);
	document
		.querySelector(".modal-cross")
		.addEventListener("click", closeModal);
	document
		.getElementById("modal1-btn")
		.addEventListener("click", window2Visible);
	document
		.getElementById("modal2-title")
		.addEventListener("click", modalArrow);
		document.getElementById("picture").addEventListener("change", previewFile);
	document
		.getElementById("modal2-btn")
		.addEventListener("click", createNewProjet);
		alert('toto)')
	// document.querySelector(".logout").addEventListener("click", () => {
	// 	localStorage.removeItem("token");
	// });
	// document.querySelector(".modal1").addEventListener("click", closeModal);
	// window.addEventListener("keydown", windowEvent);
}
launch();
