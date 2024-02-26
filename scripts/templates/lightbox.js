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

    // Vérifier si currentMedia est null
    if (!currentMedia) {
        return;
    }

    const currentIndex = Number(currentMedia.getAttribute("data-index"));
    const nextIndex = (currentIndex + 1) % medias.length; // Utilisation de modulo pour boucler à la fin de la liste
    const nextMedia = medias[nextIndex];

    // Vide la lightbox avant d'ajouter le nouveau média
    lightboxContent.innerHTML = '';

    if (nextMedia.image) {
        const img = document.createElement('img');
        img.setAttribute("data-index", nextIndex);
        img.src = path + nextMedia.image;
        img.alt = nextMedia.title;
        lightboxContent.appendChild(img);
    } else if (nextMedia.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.src = path + nextMedia.video;
        video.appendChild(source);
        lightboxContent.appendChild(video);
        video.setAttribute("data-index", nextIndex);
    }
}


// FLECHE GAUCHE

// Sélectionner la flèche gauche et ajouter un écouteur d'événements
const leftArrow = document.querySelector('.arrow-left');
if (leftArrow) {
    leftArrow.addEventListener('click', navigateToPreviousMedia);
}

function navigateToPreviousMedia() {
    const lightboxContent = document.querySelector('#media-content');
    const currentMedia = lightboxContent.firstChild;
    const currentIndex = Number(currentMedia.getAttribute("data-index"));

    // Calcul de l'index précédent en prenant en compte le bouclage
    const previousIndex = (currentIndex - 1 + medias.length) % medias.length;

    const previousMedia = medias[previousIndex];

    // Vide la lightbox avant d'ajouter le nouveau média
    lightboxContent.innerHTML = '';

    if (previousMedia.image) {
        const img = document.createElement('img');
        img.setAttribute("data-index", previousIndex);
        img.src = path + previousMedia.image;
        img.alt = previousMedia.title;
        lightboxContent.appendChild(img);
    } else if (previousMedia.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.src = path + previousMedia.video;
        video.appendChild(source);
        lightboxContent.appendChild(video);
        video.setAttribute("data-index", previousIndex);
    }
}


// NAVIGATION TOUCHES FLECHEES

// Ajouter un écouteur d'événements pour détecter les pressions sur les touches du clavier
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        navigateToPreviousMedia(); // Appeler la fonction pour passer au média précédent lors de la pression de la touche flèche gauche
    } else if (event.key === 'ArrowRight') {
        navigateToNextMedia(); // Appeler la fonction pour passer au média suivant lors de la pression de la touche flèche droite
    }
});
