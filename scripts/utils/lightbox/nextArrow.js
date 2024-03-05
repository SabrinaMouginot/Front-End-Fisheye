// Importez les variables path et medias de lightbox.js
import { path, medias } from '../lightbox.js';
// Dans la fonction navigateToNextMedia, supprimez les paramètres medias et path
// Modifiez les références de medias et path pour utiliser les variables importées

/* eslint-disable no-unused-vars */
// import { path, medias } from '../../templates/media.js';
/* eslint-enable no-unused-vars */


// Sélectionner la flèche droite et ajouter un écouteur d'événements
const rightArrow = document.querySelector('.arrow-right');
if (rightArrow) {
    rightArrow.addEventListener('click', () => {
        console.log('Right arrow clicked');
        navigateToNextMedia();
    });
}

// Sélectionner la flèche droite et ajouter un écouteur d'événements
// const rightArrow = document.querySelector('.arrow-right');
// if (rightArrow) {
//     rightArrow.addEventListener('click', navigateToNextMedia);
// }


export function navigateToNextMedia() {
    console.log('Medias received:', medias);
    console.log('Path received:', path);
    const lightboxContent = document.querySelector('#media-content');
    const currentMedia = lightboxContent.firstChild;

    // // Vérifier si currentMedia est null
    // if (!currentMedia) {
    //     return;
    // }

    if (!currentMedia || !currentMedia.getAttribute) {
        return;
    }

    const currentIndex = Number(currentMedia.getAttribute("data-index"));
    console.log('Current index:', currentIndex);
    const nextIndex = (currentIndex + 1) % medias.length;
    console.log('Next index:', nextIndex);
    const nextMedia = medias[nextIndex];

    lightboxContent.innerHTML = '';


    if (nextMedia) {
        if (nextMedia.image) {
            const img = document.createElement('img');
            img.setAttribute("data-index", nextIndex);
            img.src = path + nextMedia.image;
            img.alt = nextMedia.title;
            lightboxContent.appendChild(img);
            console.log('Next media (image) added to lightbox:', img);
        } else if (nextMedia.video) {
            const video = document.createElement('video');
            const source = document.createElement('source');
            video.controls = true;
            source.src = path + nextMedia.video;
            video.appendChild(source);
            lightboxContent.appendChild(video);
            console.log('Next media (video) added to lightbox:', video);
            // video.setAttribute("data-index", nextIndex);
        }
    }
}
