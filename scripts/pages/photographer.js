//Mettre le code JavaScript lié à la page photographer.html

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function getPhotographer() {
    const data = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())

}

function displayPhotographerInfo(photographer) {
    const photographerName = document.querySelector("#photographer-name");

    photographerName.innerText = photographer.name;

}

async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    console.log(photographer);
    displayPhotographerInfo(photographer);
}

init();