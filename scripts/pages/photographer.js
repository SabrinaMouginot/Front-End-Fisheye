//Mettre le code JavaScript lié à la page photographer.html

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
const dialog = document.querySelector("#contact_modal");

async function getPhotographer() {
    const data = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())

    const photographer = data.photographers.find((photo) => photo.id == photographerId)
    return photographer;
}

function displayPhotographerInfo(photographer) {
    const photographerName = document.querySelector("#photographer-name");
    const photographerLocation = document.querySelector("#photographer-location");
    const photographerTagline = document.querySelector("#photographer-desc");
    const photographerImg = document.querySelector("#photographer-photo");
    photographerName.innerText = photographer.name;
    photographerLocation.innerText = photographer.city+", "+photographer.country;
    photographerTagline.innerText = photographer.tagline;
    photographerImg.src = `assets/photographers/Sample Photos/Photographers ID Photos/${photographer.portrait}`;
    photographerImg.alt = photographer.name;
}

function displayModal() {
    dialog.showModal();
}

async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    console.log(photographer);
    displayPhotographerInfo(photographer);
    const contactBtn = document.querySelector("#contact");
    contactBtn.addEventListener("click", displayModal);
}



init();