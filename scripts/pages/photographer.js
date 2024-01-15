//Mettre le code JavaScript lié à la page photographer.html

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function getPhotographer() {
    const data = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())


}

function displayPhotographerInfo(photographer) {
    const photographerName = document.querySelector("#photographer-name");
    const photographerLocation = document.querySelector("#photographer-location");
    const photographerTagline = document.querySelector("#photographer-desc");

    photographerName.innerText = photographer.name;
    photographerLocation.innerText = photographer.city+", "+photographer.country;
    photographerTagline.innerText = photographer.tagline;

}

async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    console.log(photographer);
    displayPhotographerInfo(photographer);
}

init();