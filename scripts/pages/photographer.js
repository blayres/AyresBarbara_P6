var mediasStock;
var lightboxIsOpen = false;

//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById(id) {
  let photographers = [];
  await fetch("data/photographers.json")
    .then(response => response.json())
    .then((data) => (photographers = data.photographers));

  //On cherche le photographe avec l'id
  let photographer = photographers.find(photograph => photograph.id == id);

  let medias = [];
  await fetch("data/photographers.json")
    .then(response => response.json())
    .then((data) => (medias = data.media));

  //On cherche les medias du photographe avec l'id
  let mediasPhotographer = medias.filter(media => media.photographerId == id);
  photographer.medias = mediasPhotographer;
  return {
    photographer
  };
}

// Pour remplir les éléments avec les datas du json
async function displayData(photographer) {
  const {
    name,
    portrait,
    city,
    country,
    tagline,
    price,
    medias,
  } = photographer;
  const picture = `assets/photographers/${portrait}`;
  document.getElementById("namePhotographer").innerText = name;
  document.getElementById("cityPhotographer").innerText = city + ", " + country;
  document.getElementById("taglinePhotographer").innerText = tagline;
  document.getElementById("picturePhotographer").src = picture;
  document.getElementById("namePhotographerModal").innerText = name;
  document.getElementById("pricePhoto").innerHTML = `${price}€ /jour`; 
  let mediasHTML = "";
  let totalLikes = 0;
  mediasStock = medias;
  let i = 0;
  medias.map(media => {
    totalLikes += media.likes;
    let pictureMedia;
    let imageOrVideo;
    if (media.image) {
      pictureMedia = `assets/photos/${media.image}`;
      imageOrVideo = `<img src="${pictureMedia}" alt="Open Ligthbox" onclick="ouvreLightbox('${media.title}','${pictureMedia}','image','${i}')" style="cursor: pointer;">`;
    } else {
      pictureMedia = `assets/photos/${media.video}`;
      imageOrVideo = `<video src="${pictureMedia}" alt="Open Ligthbox" onclick="ouvreLightbox('${media.title}','${pictureMedia}','video','${i}')" style="cursor: pointer;"></video>`;
    }

    mediasHTML = mediasHTML + `
        <div class="miniature">
        ${imageOrVideo}
        <div class="sous-titre">
          <h4>${media.title}</h4>
          <div class="likes_heart" onclick="addLike(this)">
            <h4 class="nbLike">${media.likes}</h4>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </div>
        `;
    i++;
  })
  document.getElementById("totalLikesPhoto").innerHTML = totalLikes;
  document.getElementById("photosPhotographer").innerHTML = mediasHTML;
}

// Ajouter un like
/* eslint-disable */
async function addLike(el) {
  let nbLike = parseInt(el.querySelector(".nbLike").innerText);
  nbLike++;
  el.querySelector(".nbLike").innerText = nbLike;

  let totalLikesPhoto = parseInt(document.getElementById("totalLikesPhoto").innerText);
  totalLikesPhoto++;
  document.getElementById("totalLikesPhoto").innerText = totalLikesPhoto;
}
/* eslint-enable */

// Initier 
async function init() {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  const id = urlParams.get("id");
  const {
    photographer
  } = await getPhotographerById(id);
  displayData(photographer);
}

// Ouvrir le menu de triage
/* eslint-disable */
async function openDropDown() {
  document.querySelector(".diaporama-main-menu-seul").style.display = "none";
  document.querySelector(".diaporama-main-menu").style.visibility = "visible";
}
/* eslint-enable */

// Filtrer le choix du bouton 
/* eslint-disable */
async function filterBy(type) {

  if (type == 'popularity') {
    document.querySelector(".diaporama-main-menu").style.visibility = "hidden";
    document.querySelector(".diaporama-main-menu-seul").style.display = "flex";
    document.getElementById('activeFilter').innerHTML = "Popularité";
    trier(1);
  }

  if (type == 'date') {
    document.querySelector(".diaporama-main-menu").style.visibility = "hidden";
    document.querySelector(".diaporama-main-menu-seul").style.display = "flex";
    document.getElementById('activeFilter').innerHTML = "Date";
    trier(2);
  }

  if (type == 'title') {
    document.querySelector(".diaporama-main-menu").style.visibility = "hidden";
    document.querySelector(".diaporama-main-menu-seul").style.display = "flex";
    document.getElementById('activeFilter').innerHTML = "Titre";
    trier(3);
  }

}
/* eslint-enable */

// Triage
async function trier(choixTrier) {
  
  switch (choixTrier) {
      case 1:
          mediasStock.sort(function (a, b) {
              return b.likes - a.likes;
          });
          break;
      case 2:
          mediasStock.sort(function (a, b) {
              return a.date.localeCompare(b.date);
          });
          break;
      case 3:
          mediasStock.sort(function (a, b) {
              return a.title.localeCompare(b.title);
          });
          break;
      default:
          break;
  }
  document.getElementById("photosPhotographer").innerHTML = '';
  let mediasHTML = "";
  let i = 0;
  mediasStock.map(media => {
    let pictureMedia;
    let imageOrVideo;
    if (media.image) {
      pictureMedia = `assets/photos/${media.image}`;
      imageOrVideo = `<img src="${pictureMedia}" alt="image closeup view" onclick="ouvreLightbox('${media.title}','${pictureMedia}','image','${i}')" style="cursor: pointer;">`;
    } else {
      pictureMedia = `assets/photos/${media.video}`;
      imageOrVideo = `<video src="${pictureMedia}" alt="image closeup view" onclick="ouvreLightbox('${media.title}','${pictureMedia}','video','${i}')" style="cursor: pointer;"></video>`;
    }

    mediasHTML = mediasHTML + `
        <article class="miniature">
        ${imageOrVideo}
        <div class="sous-titre">
          <h4>${media.title}</h4>
          <div class="likes_heart" onclick="addLike(this)">
            <h4 class="nbLike" aria-label=”likes”>${media.likes}</h4>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </article>
        `;
    i++;
  })
  document.getElementById("photosPhotographer").innerHTML = mediasHTML;

}

// Ouvrir la lightbox
async function ouvreLightbox(titre, pictureMedia, type, index) {
  localStorage.setItem('index', index);
  let imageOrVideo;
  if (type == 'image') {
    imageOrVideo = `<img src="${pictureMedia}" alt="">`;
  } else {
    imageOrVideo = `<video controls src="${pictureMedia}" alt=""></video>`;
  }
  document.getElementById("contenu-photo-lightbox").innerHTML = imageOrVideo;
  document.getElementById("titre-photo-lightbox").innerHTML = titre;

  /* Affiche la lightbox */
  document.getElementsByTagName("main")[0].style.overflow = "hidden";
  document.getElementById("lightbox").style.display = "block"; 
  lightboxIsOpen = true;
}

// Passer à l'image suivante 
async function next() {
  let index = localStorage.getItem('index');
  let nextIndex = parseInt(index) + 1;
  console.log(mediasStock.length, index)
  if (mediasStock.length == nextIndex) {
    nextIndex = 0;
  }
  let nextMedia = mediasStock[nextIndex];
  console.log(index);
  let pictureMedia;
    if (nextMedia.image) {
      pictureMedia = `assets/photos/${nextMedia.image}`;
      ouvreLightbox(nextMedia.title, pictureMedia, 'image', nextIndex);
    } else {
      pictureMedia = `assets/photos/${nextMedia.video}`;
      ouvreLightbox(nextMedia.title, pictureMedia, 'video', nextIndex);
    }

}

// Passer à l'image précédente 
async function previous() {
  let index = localStorage.getItem('index');
  let previousIndex = parseInt(index) - 1;
  console.log(mediasStock.length, index)
  if (previousIndex < 0) {
    previousIndex = mediasStock.length - 1;  
  }
  let previousMedia = mediasStock[previousIndex];
  console.log(index);
  let pictureMedia;
    if (previousMedia.image) {
      pictureMedia = `assets/photos/${previousMedia.image}`;
      ouvreLightbox(previousMedia.title, pictureMedia, 'image', previousIndex);
    } else {
      pictureMedia = `assets/photos/${previousMedia.video}`;
      ouvreLightbox(previousMedia.title, pictureMedia, 'video', previousIndex);
    }

}

// Fermer la ligthbox
async function closeLightbox() {
  document.getElementById("lightbox").style.display = "none"; 
  document.getElementsByTagName("main")[0].style.overflow = "visibility";
  lightboxIsOpen = false;
}

document.addEventListener('keydown', (key) => {

  
  //ESC KEY
  if(key.code == "Escape") {
    if(lightboxIsOpen){
      closeLightbox();
    } 
  }

  //LEFT KEY
  else if(key.code == "ArrowLeft"){
    if(lightboxIsOpen) {
      previous();
    }
  }

  //RIGHT KEY
  else if(key.code == "ArrowRight"){
    if(lightboxIsOpen) {
      next();
    }
  }
})




init();