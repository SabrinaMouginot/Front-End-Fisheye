// Importe les variables path et medias de lightbox.js
import { path, medias } from '../lightbox.js';

// Sélectionner la flèche droite et ajout d'un écouteur d'événements
const rightArrow = document.querySelector('.arrow-right');
if (rightArrow) {
    rightArrow.addEventListener('click', () => {
        navigateToNextMedia();
    });
}

export function navigateToNextMedia() {
    // Sélectionne l'élément HTML représentant le contenu de la lightbox.
    const lightboxContent = document.querySelector('#media-content');

    // Récupèration du premier enfant de l'élément représentant le contenu de la lightbox : média actuellement affiché.
    const currentMedia = lightboxContent.firstChild;

    // Vérification si le média actuel existe et s'il a un attribut.
    if (!currentMedia || !currentMedia.getAttribute) {
        return;
    }

    // Récupèration de l'index du média actuel
    const currentIndex = Number(currentMedia.getAttribute("data-index"));
    // Calcul de l'index du média suivant 
    const nextIndex = (currentIndex + 1) % medias.length;
    // Sélectionne le média suivant
    const nextMedia = medias[nextIndex];

    lightboxContent.innerHTML = '';

    // Affichage du média suivant dans la lightbox 
    if (nextMedia) {
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
        }
    }
}