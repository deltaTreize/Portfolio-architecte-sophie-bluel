export async function deleteModalPicture(event) {
	const call = await fetch(`http://localhost:5678/api/works/${event.target.id}`, {
		method: "DELETE",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	});
  const response = await call.json();

		if (response.ok) {
      event.preventdefault();
      document.querySelector(".modal1").style.display = "flex";
      } else {
			alert('error');
		}
  }
