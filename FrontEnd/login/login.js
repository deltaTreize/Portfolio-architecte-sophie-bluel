const email = document.getElementById("email");
const mdp = document.getElementById("mdp");
const erreur = document.getElementById("erreur");
const formconnection = document.getElementById("formconnection");
const formconnectionInput = document.querySelectorAll("#formconnection input");
const inputs = Array.from(formconnectionInput);


async function users(e) {
	e.preventDefault();
	const response = await fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			email: `${email.value}`,
			password: `${mdp.value}`,
		}),
	});
	const usersjson = await response.json();
	const token = usersjson.token;
	localStorage.setItem("token", token);
	if (token) {
		window.location.replace("../index.html");
	} else if (usersjson.error) {
		erreur.innerText = "mot de passe n'est pas valide!";
		erreur.style.backgroundColor = "red";
		erreur.style.color = "#fff";
	} else if (usersjson.message) {
		erreur.innerText = "l'email n'est pas valide!";
		erreur.style.backgroundColor = "red";
		erreur.style.color = "#fff";
	}
}

formconnection.addEventListener("submit", users);
