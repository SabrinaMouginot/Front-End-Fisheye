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

function displayMedias(media) {
    const mediaSection = document.querySelector(".media_section")
    // Vérifiez si la réponse est un objet JSON, sinon, traitez directement comme un média
    if (media) {
        media.forEach(media => {
            // const mediaModel = mediaTemplate(media);
            // const mediaCardDOM = mediaModel.getMediaCardDOM(media.photographerId); 
            // mediaSection.appendChild(mediaCardDOM); 
        })
    } else {
        console.error("No media data available.");
        }
}

async function init() {
    // const { media } = await getPhotographerMedias();
    // displayMedias(media);
    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    displayPhotographerInfo(photographer);

    const contactBtn = document.querySelector(".contact");
    contactBtn.addEventListener("click", displayModal);

    const media = await getPhotographerMedias();
    displayMedias(media);

}

init();

