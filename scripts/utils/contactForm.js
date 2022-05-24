/* eslint-disable */
async function displayModal() {
  const modal = document.getElementById("contact_modal");
  const modalbg = document.querySelector(".bground");
  modal.style.display = "block";
  modalbg.style.display = 'block';
}

async function closeModal() {
  const modal = document.getElementById("contact_modal");
  const modalbg = document.querySelector(".bground");
  modal.style.display = "none";
  modalbg.style.display = 'none';
}

async function openConfirmation() {
  const modal = document.getElementById("confirmation_modal");
  const modalbg = document.querySelector(".bground");
  modal.style.display = "block";
  modalbg.style.display = 'block';
}

// async function sendForm()  {
//   let prenom = document.getElementById("form-prenom").value;
//   let nom = document.getElementById("form-nom").value;
//   let email = document.getElementById("form-email").value;
//   let message = document.getElementById("form-message").value;

//   if(prenom == "") {
//       return false;
//   }

//   if(nom == "") {
//       return false;
//   }

//   if(email == "") {
//     return false;
// }

//  if(message == "") {
//   return false;
// }

// return console.log(nom + prenom + email)

// if (prenom(valid) && nom(valid) && email(valid) && message(valid)) {
//   closeModal()
//   document.getElementById("confirmation_modal").style.display = 'block';
// } 

// }

async function confirmForm(e) {
  this.querySelector(".contact_button").addEventListener('click', confirm => {
      // prevent the link for reloading the page
      e.preventDefault();

      // create an object with all the message's data
      let message = {};
      let inputs = this.querySelectorAll("input");
      message.author = inputs[0].value + " " + inputs[1].value;
      message.email = inputs[2].value;
      message.date = new Date().toLocaleDateString();
      message.content = this.querySelector("textarea").value;

      //  print the message on the console
      console.table(message);

      // reset and close the modal
      inputs.forEach(input => {input.value = ""});
      this.querySelector("textarea").value = "";
      this.querySelector("div").style.display = "none";
  })
}