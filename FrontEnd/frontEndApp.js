const gallery = document.querySelector(".gallery");
const editionModeBar = document.querySelector(".edition-mode-bar");
const logout = document.querySelector(".logout");
const login = document.querySelector(".login");
const filterBar = document.querySelector(".filterBar");
const modifierProjet = document.querySelector(".modifier-projet");
const modal1 = document.querySelector(".modal1");
const modalWindow = document.querySelector(".modal-window");
const modalCross = document.querySelector(".modal1-cross");
const modalBtn = document.getElementById("modal1-btn");
const token = localStorage.getItem("token");
const admin = document.querySelectorAll(".admin");
const adminArray = Array.from(admin);
const noAdmin = document.querySelectorAll(".noAdmin");
const noAdminArray = Array.from(noAdmin);
const modalProjets = document.getElementById("modal1-projets");
const modalFigure = modalProjets.childNodes;
const modalFigureArray = [...modalFigure];

if (token) {
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
logout.addEventListener("click", () => {
    localStorage.removeItem("token");
});

async function createProjet(arg) {
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
createProjet();

/********* fenetre modale *********/
let Modal0 = null;

const openModal = (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    console.log(target);
    target.style.display = "flex";
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    Modal0 = target;
    Modal0.addEventListener("click", closeModal);
    modalWindow.addEventListener("click", stopPropagation);
};

const closeModal = (e) => {
    e.preventDefault();
    Modal0.style.display = "none";
    Modal0.setAttribute('aria-hidden', 'true');
    Modal0.removeAttribute('aria-modal');
    Modal0.removeEventListener("click", closeModal);
    modalWindow.removeEventListener("click", stopPropagation);
}

const stopPropagation = (e) =>{
    e.stopPropagation();
}
modifierProjet.addEventListener("click", openModal);
modalCross.addEventListener("click", closeModal);
modal1.addEventListener("click", closeModal);



async function deleteModalPicture(arg) {
    const fetchResult = await fetch(`http://localhost:5678/api/works/${arg}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
    });
    const response = await fetchResult.json();
    console.log(response.status);
    if (response.status === 200) {
        createModalPicture();
    } else if (response.status === 401) {
        window.location.replace("./login/login.html");
    } else {
        alert("error");
    }
}

async function createModalPicture() {
    const response = await fetch("http://localhost:5678/api/works");
    const projets = await response.json();

    for (let i = 0; i < projets.length; i++) {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const trash = document.createElement("button");
        modalProjets.appendChild(figure);
        figure.appendChild(trash);
        figure.appendChild(image);
        figure.classList.add("modal1-figure");
        image.classList.add("modal1-image");
        trash.classList.add("modal1-trash");
        trash.id = projets[i].id;
        image.src = projets[i].imageUrl;
        image.alt = projets[i].title;
        trash.innerHTML = `<i class="fa-solid fa-trash-can fa-2xs" style="color: #ffffff;" onclick="deleteModalPicture(${trash.id})"></i>`;
        trash.addEventListener("click", () => deleteModalPicture(trash.id));
    }
}
createModalPicture();

