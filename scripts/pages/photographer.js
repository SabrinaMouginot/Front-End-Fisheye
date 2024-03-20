import { mediaTemplate } from '../templates/media.js';
//importe la fonction mediaTemplate depuis un fichier media.js situé dans un dossier templates. 

// Extraire l'ID du photographe 
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

/* eslint-disable no-unused-vars */
const dialog = document.querySelector("#contact_modal");
/* eslint-enable no-unused-vars */

// Déplacement de la déclaration de filterSelect
const filterSelect = document.getElementById('filterSelect'); 

// Définition une variable globale pour stocker le nom du journaliste
let journalistName = "";

// Récupération des données des photographes 
async function getPhotographer() {
    const data = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())

    const photographer = data.photographers.find((photo) => photo.id == photographerId)
    return photographer;
}

// Récupération des médias du photographe
async function getPhotographerMedias() {
    const data = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())

    const medias = data.media.filter((media) => media.photographerId == photographerId)
    return medias;
}

// Affichage les infos du photographe dans le DOM 
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

// Affichage des médias du photographe dans le DOM en utilisant les données des médias récupérées.
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

// Affichage de la modale de contact avec le nom du journaliste
async function displayModal() {
    const contactModal = document.querySelector('#contact_modal');
    const journalistHeader = document.querySelector('#journalistName'); // Sélectionnez le h2 où le nom du journaliste doit être inséré
    journalistHeader.textContent = journalistName; // Insérez le nom du journaliste
    contactModal.showModal();
}

async function init() {
    document.getElementById("likesContent").innerHTML = '0 &#10084;';

    // - récupération et affichage des données du photographe, 
    const photographer = await getPhotographer();
    journalistName = photographer.name; // Enregistrez le nom du journaliste
    displayPhotographerInfo(photographer);

    // - Ajout d'un écouteur d'événements au bouton de contact, 
    const contactBtn = document.querySelector("#contact");
    contactBtn.addEventListener("click", displayModal);

    // - Récupération, affichage des médias du photographe, 
    const medias = await getPhotographerMedias();
    displayMedias(medias, photographer.name.split(" ")[0].replace("-", "_"));

    // - Ajout d'un écouteur d'événements au sélecteur de filtre.
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

// Appel la fonction init pour démarrer l'exécution
init();
