import { fetchWork } from "./get.js";
import { createNewProjet } from "./post.js";
import { windowEvent } from "./modalAction.js";

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

export function cleanForm() {
	const preview = document.querySelector(".preview");
	const errortext = document.querySelector(".error-text");
	const importImg = document.querySelector(".importImg");

	document.querySelector(".inputAddProjet").value = "";
	document.getElementById("category").value = "0";
	preview.src = "";
	importImg.style.display = "flex";
	errortext.style.display = "none";
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
}

function launch() {
	connectedDisplay();
	fetchWork();
	document.querySelector(".modifier-projet").addEventListener("click", () => {
		document.querySelector(".modal1").style.display = "flex";
	});
	window.addEventListener("click", (event) => {
		const modal1 = document.querySelector(".modal1");
		if (event.target === modal1) {
			window1Visible();
			document.querySelector(".modal1").style.display = "none";
		}
	});
	document.getElementById("modal1-cross").addEventListener("click", () => {
		window1Visible();
		document.querySelector(".modal1").style.display = "none";
	});
	document.getElementById("modal2-cross").addEventListener("click", () => {
		window1Visible();
		document.querySelector(".modal1").style.display = "none";
	});
	document.getElementById("modal1-btn").addEventListener("click", () => {
		window2Visible();
	});
	document
		.querySelector(".modal-arrow")
		.addEventListener("click", modalArrow);
	document.getElementById("picture").addEventListener("change", previewFile);
	document.getElementById("modal2-btn").addEventListener("click", () => {
		createNewProjet();
	});
	document.querySelector(".logout").addEventListener("click", () => {
		localStorage.removeItem("token");
	});
	window.addEventListener("keydown", windowEvent);
}
launch();
