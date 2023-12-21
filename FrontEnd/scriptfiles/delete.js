import { fetchWork } from "./get.js";

export function deleteModalPicture(event) {
	fetch(`http://localhost:5678/api/works/${event.target.id}`, {
		method: "DELETE",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	}).then((response) => {
		if (localStorage.getItem("token")) {
			if (response.ok) {
				document.querySelector(".modal1").style.display = "flex";
				fetchWork();
			} else {
				alert("error");
			}
		} else {
			window.location.replace("./login/login.html");
		}
	});
}
