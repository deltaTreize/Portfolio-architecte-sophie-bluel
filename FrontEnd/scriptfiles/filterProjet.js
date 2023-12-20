import { projects, createProjet } from "./get.js";


const filtrer0 = document.querySelector(".filter0");
filtrer0.addEventListener("click", function () {
	createProjet();
});

const filtrer1 = document.querySelector(".filter1");
filtrer1.addEventListener("click", function () {
	const projetsFiltres = projects.filter(function (project) {
		return project.category.id === 1;
	});
	createProjet(projetsFiltres);
});

const filtrer2 = document.querySelector(".filter2");
filtrer2.addEventListener("click", function () {
	const projetsFiltres = projects.filter(function (project) {
		return project.category.id === 2;
	});
	createProjet(projetsFiltres);
});

const filtrer3 = document.querySelector(".filter3");
filtrer3.addEventListener("click", function () {
	const projetsFiltres = projects.filter(function (project) {
		return project.category.id === 3;
	});
	createProjet(projetsFiltres);
});

