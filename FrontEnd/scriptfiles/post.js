// export async function createModalPicture() {
// 	const response = await fetch("http://localhost:5678/api/works");
// 	const projets = await response.json();

// 	for (let i = 0; i < projets.length; i++) {
// 		const modalProjets = document.getElementById("modal1-projets");
// 		const figure = document.createElement("figure");
// 		const image = document.createElement("img");
// 		const trash = document.createElement("button");
// 		modalProjets.appendChild(figure);
// 		figure.appendChild(trash);
// 		figure.appendChild(image);
// 		figure.classList.add("modal1-figure");
// 		image.classList.add("modal1-image");
// 		trash.classList.add("modal1-trash");
// 		trash.classList.add("fa-solid");
// 		trash.classList.add("fa-trash-can");
// 		trash.classList.add("fa-2xs");
// 		trash.addEventListener("click", deleteModalPicture);
// 		trash.id = projets[i].id;
// 		image.src = projets[i].imageUrl;
// 		image.alt = projets[i].title;
// 	}
// }
const title = document.getElementById('titleProject');
const category = document.getElementById('category');
const image = document.getElementById('picture');
const formNew = new FormData();
formNew.append("title", `${title}`);
formNew.append("category", `${category}`);
formNew.append("image", `${image}`);
document.getElementById('picture').addEventListener('change', ()=>{
  console.log(title.value);
  console.log(category.value);
  console.log(image.files[0]);
  console.log(formNew);
})

export function createNewProjet(event) {
	const formAddProject = document.getElementById("formAddProjet");
  const title = document.getElementById('titleProject');
  const category = document.getElementById('category');
  const image = document.getElementById('picture');
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
	})
	.then((response) =>{
	if (response.ok) {
    document.querySelector(".modal1").style.display = "flex";
    alert('yes');
    event.preventdefault();
	} else {
    alert("erreur")
		// throw new Error("Erreur lors de l'ajout de la photo.");
	}
})}
//  return;
// 	const formData = new FormData(document.getElementById("formAddProjet"));
// 	const errortext = document.querySelector(".error-text");
// 	 fetch("http://localhost:5678/api/works", {
// 		method: "POST",
// 		headers: {
// 			Authorization: "Bearer " + `${localStorage.getItem("token")}`,
// 		},
// 		body: formData,
// 	}).then((response) => {

// 		if (response.status === 201) {
// 			console.log(response.json())
// 			//e.preventDefault(); // modale se ferme tjr
// 			// createModalPicture();
// 			// cleanForm();
// 		}
// 		if (response.status === 400) {
// 			console.log(response.status);
// 			errortext.style.display = "flex";
// 			alert("stop");
// 		}
// 		if (response.status === 500) {
// 			console.log(response.status);
// 			errortext.style.display = "flex";
// 		}
// 	});
// }
