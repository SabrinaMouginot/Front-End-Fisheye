import { mediaTemplate } from '../templates/media.js';

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
/* eslint-disable no-unused-vars */
const dialog = document.querySelector("#contact_modal");
/* eslint-enable no-unused-vars */
//L'ajout de la directive ESLint eslint-disable et eslint-enable ne change pas réellement le code, 
//mais il permet à ESLint d'ignorer temporairement cette erreur spécifique sur cette ligne. 
//ça peut être utile quand je sais qu'une erreur est inoffensive ou lorsqu'elle est difficile à corriger tout de suite. 

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
    // const totalLikesSpan = document.createElement('span');
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
        // errorMessage.innerText = "Photographer object is undefined.";
        console.error("Photographer object is undefined.");
    }
}


async function displayMedias(medias, firstname) {
    const mediaContainer = document.getElementById("mediaContainer");
    mediaContainer.innerHTML = ''; // Effacer le contenu actuel du conteneur


    // TRI DES MEDIAS
// eslint-disable-next-line no-undef
const selectedOption = filterSelect.value;
// eslint-enable no-undef

    if (selectedOption === "popularity") {
        // Trier les médias par popularité (nombre de likes décroissant)
        medias.sort((a, b) => b.likes - a.likes);
    } else if (selectedOption === "title") {
        // Trier les médias par titre (ordre alphabétique)
        medias.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedOption === "date") {
        // Trier les médias par titre (ordre alphabétique)
        medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    let totalLikes = 0; // Initialiser le total des likes

    medias.forEach((mediaItem, index) => {
        // Générer l'élément de média en utilisant la fonction de modèle du fichier media.js
        const mediaModel = mediaTemplate(mediaItem, firstname)
        const mediaElement = mediaModel.getMediaCardDOM(index, medias);

        // Ajouter l'élément de média au conteneur
        mediaContainer.appendChild(mediaElement);

        // Ajouter les likes de chaque média au total
        totalLikes += mediaItem.likes;
    });

    // Afficher le total des likes dans la modal de likes
    const likesContent = document.getElementById("likesContent");
    likesContent.innerHTML = `${totalLikes} &#10084;`; // Cœur noir Unicode
}


async function displayModal() {
    const contactModal = document.querySelector('#contact_modal');
    contactModal.showModal();
}

async function init() {

    // Initialiser la somme totale des likes dans la modale à zéro
    document.getElementById("likesContent").innerHTML = '0 &#10084;';


    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    displayPhotographerInfo(photographer);

    const contactBtn = document.querySelector("#contact");
    contactBtn.addEventListener("click", displayModal);

    const medias = await getPhotographerMedias();
    displayMedias(medias, photographer.name.split(" ")[0].replace("-", "_"));


    // Ecouteur d'événement pour le changement de sélection du filtre
    const filterSelect = document.getElementById('filterSelect');
    filterSelect.addEventListener('change', async () => {
        // Récupérer la valeur sélectionnée du filtre
        const selectedOption = filterSelect.value;

        // Récupérer les médias du photographe
        const medias = await getPhotographerMedias();

        // Trier les médias selon l'option sélectionnée
        if (selectedOption === 'title') {
            medias.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedOption === 'popularity') {
            medias.sort((a, b) => b.likes - a.likes);
        }

        // Afficher les médias triés
        displayMedias(medias, photographer.name.split(" ")[0].replace("-", "_"));
    });

}

init();