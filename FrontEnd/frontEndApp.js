const focusPossible = "button, input, a, textarea";
let lastFocus = null;

function connectedDisplay() {
    if (localStorage.getItem("token")) {
        const admin = document.querySelectorAll(".admin");
        const adminArray = Array.from(admin);
        const noAdmin = document.querySelectorAll(".noAdmin");
        const noAdminArray = Array.from(noAdmin);

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
connectedDisplay();

async function createProjet(arg) {
    const gallery = document.querySelector(".gallery");
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
    const modalWindow = document.querySelector(".modal-window1");
    const modalWindow2 = document.querySelector(".modal-window2");
    if (modalWindow2.style.display === "block") {
        return (focusable = [...modalWindow2.querySelectorAll(focusPossible)]);
    } else {
        return (focusable = [...modalWindow.querySelectorAll(focusPossible)]);
    }
}

function focusAction(e) {
    e.preventDefault();
    const modal1 = document.querySelector(".modal1");
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
}

function openModal(e) {
    e.preventDefault();
    const modal1 = document.querySelector(".modal1");
    const modalWindow = document.querySelector(".modal-window1");
    const modalWindow2 = document.querySelector(".modal-window2");
    lastFocus = document.querySelector(":focus");
    changeFocusable();
    focusable[0].focus();
    modal1.style.display = "flex";
    modal1.removeAttribute("aria-hidden");
    modal1.setAttribute("aria-modal", "true");
    modal1.addEventListener("click", closeModal);
    modalWindow.addEventListener("click", stopPropagation);
    modalWindow2.addEventListener("click", stopPropagation);
}

function closeModal(e) {
    const modal1 = document.querySelector(".modal1");
    const modalWindow = document.querySelector(".modal-window1");
    const modalWindow2 = document.querySelector(".modal-window2");
    if (modal1.style.display === "none") {
        return;
    }
    e.preventDefault();
    modal1.style.display = "none";
    modalWindow2.style.display = "none";
    modalWindow.style.display = "block";
    modal1.setAttribute("aria-hidden", "true");
    modal1.removeAttribute("aria-modal");
    modal1.removeEventListener("click", closeModal);
    modalWindow.removeEventListener("click", stopPropagation);
    modalWindow2.removeEventListener("click", stopPropagation);
    if (lastFocus !== null) {
        lastFocus.focus();
    }
}

function stopPropagation(e) {
    e.stopPropagation();
}

async function deleteModalPicture(arg) {
    const fetchResult = await fetch(`http://localhost:5678/api/works/${arg}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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
        const modalProjets = document.getElementById("modal1-projets");
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

async function createNewProjet() {
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

document.querySelector(".modifier-projet").addEventListener("click", openModal);
document.getElementById("modal1-cross").addEventListener("click", closeModal);
document.getElementById("modal2-cross").addEventListener("click", closeModal);
document.querySelector(".modal1").addEventListener("click", closeModal);
document.getElementById("modal1-btn").addEventListener("click", window2Visible);
document.querySelector(".modal-arrow").addEventListener("click", () => {
    window1Visible();
    cleanForm();
});
document
    .getElementById("modal2-btn")
    .addEventListener("click", createNewProjet);
document.getElementById("picture").addEventListener("change", previewFile);
window.addEventListener("keydown", (e) => {
    const modal1 = document.querySelector(".modal1");
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modal1.style.display === "flex") {
        focusAction(e);
    }
});
document.querySelector(".logout").addEventListener("click", () => {
    localStorage.removeItem("token");
});
