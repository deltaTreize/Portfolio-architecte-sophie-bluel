import { deleteModalPicture } from "./delete.js";

export let projects;

export async function fetchWork() {
  try{
	const response = await fetch("http://localhost:5678/api/works");
	projects = await response.json();
	createProjetHome();
  }catch{
    console.error("Error while fetching projects:", error);
    alert("Erreur lors du chargement de la gallerie.");
  }
}

export async function createProjetHome(projets = projects) {
	const homeGallery = document.querySelector(".gallery");
	homeGallery.replaceChildren();
	const modalGallery = document.querySelector(".modal1-projets");
	modalGallery.replaceChildren();

	for (let i = 0; i < projets.length; i++) {
		const figcaption = document.createElement("figcaption");
		const figure = document.createElement("figure");
		const image = document.createElement("img");
		const figureModal = document.createElement("figure");
		const imageModal = document.createElement("img");
		const trash = document.createElement("button");
		homeGallery.appendChild(figure);
		figure.appendChild(image);
		figure.appendChild(figcaption);
		figure.classList.add("figure");
		image.src = projets[i].imageUrl;
		image.alt = projets[i].title;
		figcaption.innerText = projets[i].title;
		/********modal************/
		modalGallery.appendChild(figureModal);
		figureModal.appendChild(trash);
		figureModal.appendChild(imageModal);
		figureModal.classList.add("modal1-figure");
		imageModal.classList.add("modal1-image");
		trash.classList.add("modal1-trash");
		trash.classList.add("fa-solid");
		trash.classList.add("fa-trash-can");
		trash.classList.add("fa-2xs");
		trash.addEventListener("click", (event) =>{
      deleteModalPicture(event);
      event.preventDefault();
  });
		trash.id = projets[i].id;
		imageModal.src = projets[i].imageUrl;
		imageModal.alt = projets[i].title;

	}
}

// fetchWork();
