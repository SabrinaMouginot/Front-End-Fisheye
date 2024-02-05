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

    if (photographer) {
        photographerName.innerText = photographer.name;
        photographerLocation.innerText = photographer.city + ", " + photographer.country;
        photographerTagline.innerText = photographer.tagline;
        photographerImg.src = `assets/photographers/Sample_Photos/Photographers ID Photos/${photographer.portrait}`;
        photographerImg.alt = photographer.name;

    } else {
        // errorMessage.innerText = "Photographer object is undefined.";
        console.error("Photographer object is undefined.");
    }
}

// function displayMedias(media) {
//     const mediaSection = document.querySelector(".media_section")
//     // Vérifiez si la réponse est un objet JSON, sinon, traitez directement comme un média
//     if (media) {
//         media.forEach((media) => {
//             // const mediaModel = mediaTemplate(media);
//             // const mediaCardDOM = mediaModel.getMediaCardDOM(media.photographerId); 
//             // mediaSection.appendChild(mediaCardDOM); 
//         })
//     } else {
//         console.error("No media data available.");
//     }
// }

function displayMedias(media) {
    const mediaContainer = document.getElementById("mediaContainer");

    media.forEach((mediaItem) => {
        const mediaElement = document.createElement("div");
        mediaElement.classList.add("media-item");

        const mediaContent = document.createElement("div");
        mediaContent.classList.add("media-content");

        if (mediaItem.image) {
            const imageElement = document.createElement("img");
            imageElement.src = `assets/photographers/Sample_Photos/Elie_Rose/${mediaItem.image}`;
            imageElement.alt = mediaItem.title;
            mediaElement.appendChild(imageElement);
        } else if (mediaItem.video) {
            const videoElement = document.createElement("video");
            videoElement.src = `assets/photographers/Sample_Photos/Elie_Rose/${mediaItem.video}`;
            videoElement.controls = true;
            videoElement.alt = mediaItem.title;
            mediaElement.appendChild(videoElement);
        }

        const titleElement = document.createElement("h3");
        titleElement.innerText = mediaItem.title;
        // mediaElement.appendChild(titleElement);

        const likesElement = document.createElement("span");
        likesElement.innerText = `Likes: ${mediaItem.likes}`;

        mediaContent.appendChild(titleElement);
        mediaContent.appendChild(likesElement);
        
        mediaElement.appendChild(mediaContent);
        mediaContainer.appendChild(mediaElement);
    });

    let mediaRow; // Variable pour stocker le conteneur de ligne actuel
    media.forEach((mediaItem, index) => {
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



// async function displayMedias(medias) {
//     const mediaContainer = document.getElementById('mediaContainer');

//     medias.forEach(media => {
//         const mediaModel = mediaTemplate(media);
//         const mediaCardDOM = mediaModel.getMediaCardDOM();
//         mediaContainer.appendChild(mediaCardDOM);
//     });
// }



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

    const media = await getPhotographerMedias();
    displayMedias(media);


// CREATION DES FILTRES

    document.addEventListener("DOMContentLoaded", function() {
        const filterSelect = document.getElementById("filterSelect");
      
        filterSelect.addEventListener("change", function() {
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