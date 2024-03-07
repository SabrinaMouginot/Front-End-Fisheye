import { mediaTemplate } from '../templates/media.js';
//import { photographerTemplate } from '../templates/photographer.js'; // Ajoutez cette ligne pour importer le template du photographe

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
/* eslint-disable no-unused-vars */
const dialog = document.querySelector("#contact_modal");
/* eslint-enable no-unused-vars */

const filterSelect = document.getElementById('filterSelect'); // Déplacement de la déclaration de filterSelect

// Définissez une variable globale pour stocker le nom du journaliste
let journalistName = "";

async function getPhotographer() {
    const data = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())

    const photographer = data.photographers.find((photo) => photo.id == photographerId)
    return photographer;
}

async function getPhotographerMedias() {
    const data = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())

    const medias = data.media.filter((media) => media.photographerId == photographerId)
    return medias;
}

function displayPhotographerInfo(photographer) {
    const photographerName = document.querySelector("#photographer-name");
    const photographerLocation = document.querySelector("#photographer-location");
    const photographerTagline = document.querySelector("#photographer-desc");
    const photographerImg = document.querySelector("#photographer-photo");
    const photographersLikes = document.querySelector('.photographersLikes');
    const priceSpan = document.createElement('span');

    if (photographer) {
        photographerName.innerText = photographer.name;
        photographerLocation.innerText = photographer.city + ", " + photographer.country;
        photographerTagline.innerText = photographer.tagline;
        photographerImg.src = `assets/photographers/Sample_Photos/Photographers ID Photos/${photographer.portrait}`;
        photographerImg.alt = photographer.name;

        // Afficher le prix du photographe dans la modal de likes
        priceSpan.innerText = `${photographer.price} €/jour`;
        photographersLikes.appendChild(priceSpan);
    } else {
        console.error("Photographer object is undefined.");
    }
}

async function displayMedias(medias, firstname) {
    const mediaContainer = document.getElementById("mediaContainer");
    mediaContainer.innerHTML = '';

    // TRI DES MEDIAS
    const selectedOption = filterSelect.value;

    if (selectedOption === "popularity") {
        medias.sort((a, b) => b.likes - a.likes);
    } else if (selectedOption === "title") {
        medias.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedOption === "date") {
        medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    let totalLikes = 0;

    medias.forEach((mediaItem, index) => {
        const mediaModel = mediaTemplate(mediaItem, firstname)
        const mediaElement = mediaModel.getMediaCardDOM(index, medias);
        mediaContainer.appendChild(mediaElement);
        totalLikes += mediaItem.likes;
    });

    const likesContent = document.getElementById("likesContent");
    likesContent.innerHTML = `${totalLikes} &#10084;`;
}

async function displayModal() {
    const contactModal = document.querySelector('#contact_modal');
    const journalistHeader = document.querySelector('#journalistName'); // Sélectionnez le h2 où le nom du journaliste doit être inséré
    journalistHeader.textContent = journalistName; // Insérez le nom du journaliste
    contactModal.showModal();
}

async function init() {
    document.getElementById("likesContent").innerHTML = '0 &#10084;';

    const photographer = await getPhotographer();
    journalistName = photographer.name; // Enregistrez le nom du journaliste
    displayPhotographerInfo(photographer);

    const contactBtn = document.querySelector("#contact");
    contactBtn.addEventListener("click", displayModal);

    const medias = await getPhotographerMedias();
    displayMedias(medias, photographer.name.split(" ")[0].replace("-", "_"));

    filterSelect.addEventListener('change', async () => {
        const selectedOption = filterSelect.value;
        const medias = await getPhotographerMedias();

        if (selectedOption === 'title') {
            medias.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedOption === 'popularity') {
            medias.sort((a, b) => b.likes - a.likes);
        }

        displayMedias(medias, photographer.name.split(" ")[0].replace("-", "_"));
    });
}

init();

// Dans la fonction displayModal(), insérez le nom du journaliste dans le HTML du formulaire de contact
