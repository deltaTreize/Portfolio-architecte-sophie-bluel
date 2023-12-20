import { fetchWork } from "./get.js";
import { cleanForm } from "./homepage.js";

export function createNewProjet() {
	const title = document.getElementById("titleProject");
	const category = document.getElementById("category");
	const image = document.getElementById("picture");
	const formNew = new FormData();
	formNew.append("title", title.value);
	formNew.append("category", category.value);
	formNew.append("image", image.files[0]);

	fetch("http://localhost:5678/api/works", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formNew,
	}).then((response) => {
		if (response.ok) {
			document.querySelector(".modal1").style.display = "flex";
			fetchWork();
			cleanForm();
		} else {
			alert("erreur");
		}
	});
}
