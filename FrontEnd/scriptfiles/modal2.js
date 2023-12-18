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
	//e.preventDefault(); // modale se ferme tjr
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
			//e.preventDefault(); // modale se ferme tjr
			createModalPicture();
			cleanForm();
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

document.getElementById("picture").addEventListener("change", previewFile);

export {createNewProjet, previewFile}