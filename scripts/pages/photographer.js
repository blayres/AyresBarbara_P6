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
    const { name, portrait, city, country, tagline, price, id, media, title, likes } = photographer;
    const picture = `assets/photographers/${portrait}`;
    document.getElementById("namePhotographer").innerText = name;
    document.getElementById("cityPhotographer").innerText = city + ", " + country;
    document.getElementById("taglinePhotographer").innerText = tagline;
    document.getElementById("photosPhotographer").innerText = media;
    document.getElementById("titrePhoto").innerText = title;
    document.getElementById("titrePhoto").innerText = likes;
    
}

// async function displayData(medias)
// {
//     const { id, medias, title, likes } = medias;
//     const picture = `assets/photos/${portrait}`;
//     document.getElementById("photosPhotographer").innerText = medias;
//     document.getElementById("titrePhoto").innerText = title;
//     document.getElementById("titrePhoto").innerText = likes;
    
// }

async function init()
{
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get("id"); 
    const {photographer} = await getPhotographerById(id); 
    displayData(photographer);
}

init();