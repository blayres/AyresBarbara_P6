function displayModal() {
  const modal = document.getElementById("contact_modal");
  const modalbg = document.querySelector(".bground");
  modal.style.display = "block";
  modalbg.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const modalbg = document.querySelector(".bground");
  modal.style.display = "none";
  modalbg.style.display = 'none';
}




// const formData = document.querySelectorAll(".formData");

// // Form elements
// const firstElt = document.getElementById("first");
// const lastElt = document.getElementById("last");
// const emailElt = document.getElementById("email");

// // Validate form
// formElt.addEventListener("submit", validate);

// // Validate form
// function validate(e) {
//   e.preventDefault();
//   // Cacher tous les messages
//   document.querySelectorAll('.error').forEach(elt => elt.style.display = 'none');

//   // Verifier un par un les champs

//   // First name
//   if (!isLongEnough(firstElt.value.length, 2)) {
//     document.querySelector('.errorFirstName').style.display = 'block';
//   }

// }

//   // Functions
// function isLongEnough(currentLength, minimumLength) {
//   return currentLength >= minimumLength ? true : false;
// }

