// Importez les variables path et medias de lightbox.js
import { path, medias } from '../lightbox.js';
// Dans la fonction navigateToNextMedia, supprimez les paramètres medias et path
// Modifiez les références de medias et path pour utiliser les variables importées

// Sélectionner la flèche droite et ajouter un écouteur d'événements
const rightArrow = document.querySelector('.arrow-right');
if (rightArrow) {
    rightArrow.addEventListener('click', () => {
        navigateToNextMedia();
    });
}

export function navigateToNextMedia() {
    const lightboxContent = document.querySelector('#media-content');
    const currentMedia = lightboxContent.firstChild;

    if (!currentMedia || !currentMedia.getAttribute) {
        return;
    }

    const currentIndex = Number(currentMedia.getAttribute("data-index"));
    const nextIndex = (currentIndex + 1) % medias.length;
    const nextMedia = medias[nextIndex];

    lightboxContent.innerHTML = '';


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
