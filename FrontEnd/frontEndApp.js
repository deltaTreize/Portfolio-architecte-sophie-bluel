const gallery = document.querySelector(".gallery");
const editionModeBar = document.querySelector(".edition-mode-bar");
const logout = document.querySelector(".logout");
const login = document.querySelector(".login");
const filterBar = document.querySelector(".filterBar");
const modifierProjet = document.querySelector(".modifier-projet");
const modal1 = document.querySelector(".modal1");
const modalWindow = document.querySelector(".modal-window1");
const modalWindow2 = document.querySelector(".modal-window2");
const modalArrow = document.querySelector(".modal-arrow");
const modalCross1 = document.getElementById("modal1-cross");
const modalCross2 = document.getElementById("modal2-cross");
const modal1Btn = document.getElementById("modal1-btn");
const modal2Btn = document.getElementById("modal2-btn");
const pictureAddProjet = document.getElementById("picture");
const formAddProjet = document.getElementById("formAddProjet");
const titleAddProjet = document.querySelector(".inputAddProjet");
const preview = document.querySelector(".preview");
const importImg = document.querySelector(".importImg");
const category = document.getElementById("category");
const token = localStorage.getItem("token");
const admin = document.querySelectorAll(".admin");
const adminArray = Array.from(admin);
const noAdmin = document.querySelectorAll(".noAdmin");
const noAdminArray = Array.from(noAdmin);
const modalProjets = document.getElementById("modal1-projets");
const modalFigure = modalProjets.childNodes;
const modalFigureArray = [...modalFigure];
let Modal0 = null;
const focusPossible = "button, input";
let focusable = [];
let lastFocus = null;

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

function changeFocusable() {
    if (modalWindow2.style.display === "block") {
        focusable = [...modalWindow2.querySelectorAll(focusPossible)];
    } else {
        focusable = [...modalWindow.querySelectorAll(focusPossible)];
    }
}

const focusAction = (e) => {
    e.preventDefault();
    let index = focusable.findIndex(
        (f) => f === modal1.querySelector(":focus")
    );
    if (e.shiftKey === true) {
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
};

const openModal = (e) => {
    e.preventDefault();
    lastFocus = document.querySelector(":focus");
    changeFocusable();
    focusable[0].focus();
    Modal0 = document.querySelector(e.target.getAttribute("href"));
    Modal0.style.display = "flex";
    Modal0.removeAttribute("aria-hidden");
    Modal0.setAttribute("aria-modal", "true");
    Modal0.addEventListener("click", closeModal);
    modalWindow.addEventListener("click", stopPropagation);
    modalWindow2.addEventListener("click", stopPropagation);
};

const closeModal = (e) => {
    if (Modal0 === null) {
        return;
    }
    e.preventDefault();
    Modal0.style.display = "none";
    modalWindow2.style.display = "none";
    modalWindow.style.display = "block";
    Modal0.setAttribute("aria-hidden", "true");
    Modal0.removeAttribute("aria-modal");
    Modal0.removeEventListener("click", closeModal);
    modalWindow.removeEventListener("click", stopPropagation);
    modalWindow2.removeEventListener("click", stopPropagation);
    Modal0 = null;
    if (lastFocus !== null) {
        lastFocus.focus();
    }
};

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modal1.style.display === "flex") {
        focusAction(e);
    }
});

const stopPropagation = (e) => {
    e.stopPropagation();
};

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


function previewFile() {
    const file = pictureAddProjet.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageDataUrl = e.target.result;
            preview.src = imageDataUrl;
            if (preview.src) {
                importImg.style.display = "none";
                preview.style = "z-index: 0;";
            }
        };

        reader.readAsDataURL(file);
    }
}

function cleanForm() {
    preview.src = "";
    preview.style = "z-index: -1;";
    importImg.style.display = "flex";
    titleAddProjet.value = "";
    category.value = "0";
}

async function createNewProjet() {
    const formData = new FormData(formAddProjet);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + `${token}`,
        },
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        cleanForm();
}

modifierProjet.addEventListener("click", openModal);
modalCross1.addEventListener("click", closeModal);
modalCross2.addEventListener("click", closeModal);
modal1.addEventListener("click", closeModal);
modal1Btn.addEventListener("click", () => {
    modalWindow.style.display = "none";
    modalWindow2.style.display = "block";
    changeFocusable();
});
modalArrow.addEventListener("click", () => {
    modalWindow.style.display = "block";
    modalWindow2.style.display = "none";
    preview.src = "";
    preview.style = "z-index: -1;";
    importImg.style.display = "flex";
    cleanForm();
    changeFocusable();
});
modal2Btn.addEventListener("click", createNewProjet);
pictureAddProjet.addEventListener("change", previewFile);
