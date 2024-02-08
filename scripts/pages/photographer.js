const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
const dialog = document.querySelector("#contact_modal");

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



function displayMedias(medias, firstname) {
    const mediaContainer = document.getElementById("mediaContainer");
    let totalLikes = 0; // Initialiser le total des likes

    medias.forEach((mediaItem) => {
        const mediaModel = mediaTemplate(mediaItem, firstname);
        const mediaElement = mediaModel.getMediaCardDOM();
        mediaContainer.appendChild(mediaElement);

        // Ajouter les likes de chaque média au total
        totalLikes += mediaItem.likes;
    });

    // Afficher le total des likes dans la modal de likes
    const likesContent = document.getElementById("likesContent");
    const totalLikesSpan = document.createElement("span");
    totalLikesSpan.innerText = `Total Likes: ${totalLikes}`;
    likesContent.appendChild(totalLikesSpan);
}



function displayMedias(medias, firstname) {
    const mediaContainer = document.getElementById("mediaContainer");
    let totalLikes = 0; // Initialiser le total des likes

    medias.forEach((mediaItem) => {
        const mediaModel = mediaTemplate(mediaItem, firstname)
        const mediaElement = mediaModel.getMediaCardDOM();
        mediaContainer.appendChild(mediaElement)

        // Ajouter les likes de chaque média au total
        totalLikes += mediaItem.likes;
    });

    // Afficher le total des likes dans la modal de likes
    const likesContent = document.getElementById("likesContent");
    const totalLikesSpan = document.createElement("span");
    totalLikesSpan.innerText = `Total Likes: ${totalLikes}`;
    likesContent.appendChild(totalLikesSpan);

    let mediaRow; // Variable pour stocker le conteneur de ligne actuel
    medias.forEach((mediaItem, index) => {
        // Créez un nouveau conteneur de ligne pour chaque troisième média
        if (index % 3 === 0) {
            mediaRow = document.createElement("div");
            mediaRow.classList.add("media-row");
            mediaContainer.appendChild(mediaRow);
        }

        const mediaElement = document.createElement("div");
        mediaElement.classList.add("media-item");

        // Ajoutez le contenu de média à l'élément média ici

        mediaRow.appendChild(mediaElement);
    });
}


async function displayModal() {
    const contactModal = document.querySelector('#contact_modal');
    contactModal.showModal();
}

async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    displayPhotographerInfo(photographer);

    const contactBtn = document.querySelector("#contact");
    contactBtn.addEventListener("click", displayModal);

    const medias = await getPhotographerMedias();
    displayMedias(medias, photographer.name.split(" ")[0].replace("-", "_"));


    // CREATION DES FILTRES
    document.addEventListener("DOMContentLoaded", function () {
        const filterSelect = document.getElementById("filterSelect");

        filterSelect.addEventListener("change", function () {
            const selectedOption = filterSelect.value;
            // Appel de la fonction de filtrage appropriée en fonction de l'option sélectionnée
            if (selectedOption === "popularity") {
                // Fonction de filtrage par popularité
                // Par exemple : filterByPopularity();
            } else if (selectedOption === "date") {
                // Fonction de filtrage par date
                // Par exemple : filterByDate();
            } else if (selectedOption === "title") {
                // Fonction de filtrage par titre
                // Par exemple : filterByTitle();
            }
        });
    });

}

init();