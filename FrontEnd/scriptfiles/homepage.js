import { fetchWork } from "./get.js";
import { createNewProjet } from "./post.js";
import { windowEvent,changeFocusableWindow1,changeFocusableWindow2,openModal,closeModal,} from "./modalAction.js";

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
			const blockPreview = document.querySelector(".blockPreview");
			const importImg = document.querySelector(".importImg");
			const imageDataUrl = e.target.result;
			const preview = document.createElement("img");
			preview.id = "preview";
			blockPreview.appendChild(preview);
			preview.src = imageDataUrl;
			if (preview.src) {
				importImg.style.display = "none";
			}
		};
		reader.readAsDataURL(file);
	}
}

export function cleanForm() {
	const preview = document.getElementById("preview");
	const blockPreview = document.querySelector(".blockPreview");
	const errortext = document.querySelector(".error-text");
	const importImg = document.querySelector(".importImg");
	const picture = document.getElementById("picture");

	document.querySelector(".inputAddProjet").value = "";
	document.getElementById("category").value = "";
	if (preview) {
		preview.remove();
	}
	picture.value = "";
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
	changeFocusableWindow2();
}

function modalArrow() {
	window1Visible();
}

export function window1Visible() {
	const modal1 = document.querySelector(".modal1");
	const modalWindow = document.querySelector(".modal-window1");
	const modalWindow2 = document.querySelector(".modal-window2");

	modal1.style.display = "flex";
	modal1.removeAttribute("aria-hidden");
	modal1.setAttribute("aria-modal", "true");
	modalWindow.style.display = "block";
	modalWindow2.style.display = "none";
	changeFocusableWindow1();
	cleanForm();
}

function launch() {
	connectedDisplay();
	fetchWork();
	document.querySelector(".modifier-projet").addEventListener("click", () => {
		openModal();
	});
	window.addEventListener("click", (event) => {
		const modal1 = document.querySelector(".modal1");
		if (event.target === modal1) {
			closeModal();
		}
	});
	document.getElementById("modal1-cross").addEventListener("click", () => {
		closeModal();
	});
	document.getElementById("modal2-cross").addEventListener("click", () => {
		closeModal();
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
