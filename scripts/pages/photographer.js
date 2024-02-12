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



// // Fonction pour trier les médias par titre
// function sortByTitle(mediaList) {
//     return mediaList.sort((a, b) => a.title.localeCompare(b.title));
// }

// // Fonction pour trier les médias par popularité (nombre de likes décroissant)
// function sortByPopularity(mediaList) {
//     return mediaList.sort((a, b) => b.likes - a.likes);
// }

// // Fonction pour appliquer le filtre sélectionné
// function applyFilter(filterType) {
//     let mediaList = [...currentPhotographer.media]; // Copie des médias du photographe actuellement affiché

    // // Application du filtre selon le type
    // switch (filterType) {
    //     case 'title':
    //         mediaList = sortByTitle(mediaList);
    //         break;
    //     case 'popularity':
    //         mediaList = sortByPopularity(mediaList);
    //         break;
    //     default:
    //         break;
    // }

    // Affichage des médias triés
//     displayMedia(mediaList);
// }

// Fonction pour afficher les médias sur la page
// function displayMedia(mediaList) {
    // Code pour afficher les médias sur la page en fonction de la liste triée
// }

// // Fonction pour afficher les médias sur la page
// function displayMedia(mediaList) {

//     // Sélection du conteneur où afficher les médias
//     var mediaContainer = document.getElementById('mediaContainer');
//     // Suppression de tout contenu précédent dans le conteneur
//     mediaContainer.innerHTML = '';

//     // Parcours de la liste triée des médias
//     mediaList.forEach(function(media) {
//         // Création d'un élément HTML pour afficher le média
//         var mediaElement = document.createElement('div');
//         mediaElement.classList.add('media');
//         // Ajout du contenu du média à l'élément
//         mediaElement.innerHTML = `
//             <img src="${media.url}" alt="${media.title}">
//             <div class="media-info">
//                 <h3>${media.title}</h3>
//                 <span>${media.likes} Likes</span>
//             </div>
//         `;
//         // Ajout du nouvel élément au conteneur
//         mediaContainer.appendChild(mediaElement);
//     });
// }



// document.addEventListener('DOMContentLoaded', function() {
//     // Sélection de l'élément <select>
//     var filterSelect = document.getElementById('filterSelect');

//     // Ajout d'un écouteur d'événements pour détecter les changements de sélection
//     filterSelect.addEventListener('change', function() {
//         // Récupération de la valeur sélectionnée
//         var sortBy = filterSelect.value;

//         // Appel d'une fonction pour trier les médias en fonction de la valeur sélectionnée
//         if (sortBy === 'popularity') {
//             // Tri par popularité
//             // Code pour trier les médias par popularité
//         } else if (sortBy === 'title') {
//             // Tri par titre
//             // Code pour trier les médias par titre
//         } else {
//             // Par défaut, tri par date
//             // Code pour trier les médias par date
//         }

//         // Actualiser l'affichage des médias triés
//         // Vous devrez implémenter cette partie en fonction de votre application
//     });
// });




async function displayMedias(medias, firstname) {
    const mediaContainer = document.getElementById("mediaContainer");
    mediaContainer.innerHTML = ''; // Effacer le contenu actuel du conteneur


    // TRI DES MEDIAS
    const selectedOption = filterSelect.value;

    if (selectedOption === "popularity") {
        // Trier les médias par popularité (nombre de likes décroissant)
        medias.sort((a, b) => b.likes - a.likes);
    } else if (selectedOption === "title") {
        // Trier les médias par titre (ordre alphabétique)
        medias.sort((a, b) => a.title.localeCompare(b.title));
    }

    // let totalLikes = 0; // Initialiser le total des likes

    // medias.forEach((mediaItem) => {
    //     // Générer l'élément de média en utilisant la fonction de modèle du fichier media.js
    //     const mediaModel = mediaTemplate(mediaItem, firstname)
    //     const mediaElement = mediaModel.getMediaCardDOM();
        
    //     // Ajouter l'élément de média au conteneur
    //     mediaContainer.appendChild(mediaElement);

    //     // Ajouter les likes de chaque média au total
    //     totalLikes += mediaItem.likes;
    // });

    // // Afficher le total des likes dans la modal de likes
    // const likesContent = document.getElementById("likesContent");
    // const totalLikesSpan = document.createElement("span");
    // totalLikesSpan.innerHTML = `${totalLikes} &#10084;`; // Cœur noir Unicode
    // likesContent.appendChild(totalLikesSpan);

    let totalLikes = 0; // Initialiser le total des likes
    let mediaRow; // Variable pour stocker le conteneur de ligne actuel

    medias.forEach((mediaItem, index) => {
        // Créez un nouveau conteneur de ligne pour chaque troisième média
        if (index % 3 === 0) {
            mediaRow = document.createElement("div");
            mediaRow.classList.add("media-row");
            mediaContainer.appendChild(mediaRow);
        }

        // Générer l'élément de média en utilisant la fonction de modèle du fichier media.js
        const mediaModel = mediaTemplate(mediaItem, firstname);
        const mediaElement = mediaModel.getMediaCardDOM();

        // Ajouter l'élément de média à la ligne actuelle
        mediaRow.appendChild(mediaElement);

        // Ajouter les likes de chaque média au total
        totalLikes += mediaItem.likes;
    });

    // Afficher le total des likes dans la modal de likes
    const likesContent = document.getElementById("likesContent");
    const totalLikesSpan = document.createElement("span");
    totalLikesSpan.innerHTML = `${totalLikes} &#10084;`; // Cœur noir Unicode
    likesContent.appendChild(totalLikesSpan);
// }

    // let mediaRow; // Variable pour stocker le conteneur de ligne actuel
    // medias.forEach((mediaItem, index) => {
    //     // Créez un nouveau conteneur de ligne pour chaque troisième média
    //     if (index % 3 === 0) {
    //         mediaRow = document.createElement("div");
    //         mediaRow.classList.add("media-row");
    //         mediaContainer.appendChild(mediaRow);
    //     }

    //     const mediaElement = document.createElement("div");
    //     mediaElement.classList.add("media-item");

    //     // Ajoutez le contenu de média à l'élément média ici

    //     mediaRow.appendChild(mediaElement);
    // });

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