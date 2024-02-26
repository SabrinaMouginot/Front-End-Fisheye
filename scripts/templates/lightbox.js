// LIGHTBOX
let medias = [];
let path = "";
// Fonction pour ouvrir la lightbox avec le média sélectionné
function openLightbox(mediaData, pathFromPage, mediasFromPage, index) {
    path = pathFromPage;
    medias = mediasFromPage;
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('#media-content');

    // Vide la div #media-content avant d'ajouter un nouveau média
    lightboxContent.innerHTML = '';

    // Créez l'élément de média approprié en fonction du type (image ou vidéo)
    if (mediaData.image) {
        const img = document.createElement('img');
        img.setAttribute("data-index", index);
        img.src = `${path}/${mediaData.image}`;
        img.alt = mediaData.title;
        lightboxContent.appendChild(img);
    } else if (mediaData.video) {
        const video = document.createElement('video');
        video.setAttribute("data-index", index);
        const source = document.createElement('source');
        video.controls = true;
        source.src = `${path}/${mediaData.video}`;
        video.appendChild(source);
        lightboxContent.appendChild(video);
    }

    // Ajouter la croix de fermeture à la lightbox
    const closeButton = document.getElementById("btn-close");
    closeButton.addEventListener('click', () => {
        lightbox.close();
    });

    // Affichez la lightbox
    lightbox.showModal();
}


//FLECHE DROITE

// Sélectionner la flèche droite et ajouter un écouteur d'événements
const rightArrow = document.querySelector('.arrow-right');
if (rightArrow) {
    rightArrow.addEventListener('click', navigateToNextMedia);
}

function navigateToNextMedia() {
    const lightboxContent = document.querySelector('#media-content');
    const currentMedia = lightboxContent.firstChild;
    const currentIndex = Number(currentMedia.getAttribute("data-index"));
    const nextIndex = (currentIndex + 1) % medias.length; // Utilisation de modulo pour boucler à la fin de la liste
    const nextMedia = medias[nextIndex];

    if (nextMedia.image) {
        currentMedia.src = path + nextMedia.image;
        currentMedia.alt = nextMedia.title;
    } else if (nextMedia.video) {
        currentMedia.firstChild.src = path + nextMedia.video;
    }

    // Mettre à jour l'attribut data-index du média actuel avec l'index du média suivant
    currentMedia.setAttribute("data-index", nextIndex);
}


// FLECHE GAUCHE

// Sélectionner la flèche gauche et ajouter un écouteur d'événements
const leftArrow = document.querySelector('.arrow-left');
if (leftArrow) {
    leftArrow.addEventListener('click', navigateToPreviousMedia);
}

// Fonction pour naviguer vers le média précédent
function navigateToPreviousMedia() {
    const lightboxContent = document.querySelector('#media-content');
    const currentMedia = lightboxContent.querySelector('img, video');
    const currentArticle = currentMedia.parentElement;
    const previousArticle = currentArticle.previousElementSibling;

    // Si un article précédent existe
    if (previousArticle) {
        const previousMedia = previousArticle.querySelector('img, video');
        lightboxContent.innerHTML = ''; // Vider le contenu de la lightbox
        lightboxContent.appendChild(previousMedia.cloneNode(true)); // Insérer le nouveau média
    }
}