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

    //On cherche le photographe avec l'id
    let mediasPhotographer = medias.filter(media => media.photographerId == id);
    photographer.medias = mediasPhotographer;
    return {photographer};

  }


async function displayData(photographer)
{
    const { name, portrait, city, country, tagline, price, id, medias } = photographer;
    const picture = `assets/photographers/${portrait}`;
    document.getElementById("namePhotographer").innerText = name;
}

async function init()
{
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id"); 
    const {photographer} = await getPhotographerById(id); 
    displayData(photographer);
}

init();