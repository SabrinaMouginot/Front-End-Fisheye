import { navigateToPreviousMedia } from './lightbox/previousArrow.js';
import { navigateToNextMedia } from './lightbox/nextArrow.js';
// Importe des fonctions de navigation vers les médias précédents et suivants 

// LIGHTBOX
export let medias = [];
export let path = "";
// Exportations des variables pour être utilisées à l'extérieur de ce module. 

export function openLightbox(mediaData, pathFromPage, mediasFromPage, index) {
    // Mise à jour des variables path et medias avec les valeurs passées en paramètres.
    path = pathFromPage;
    medias = mediasFromPage;

    // Récupération les éléments HTML de la lightbox et de son contenu.
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('#media-content');

    // Vide le contenu précédent de la lightbox.
    lightboxContent.innerHTML = '';

    // Création et affichage du média dans la lightbox
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

    // Gestionnaire d'événements pour fermer la lightbox lorsque le bouton de fermeture est cliqué.
    const closeButton = document.getElementById("btn-close");
    closeButton.addEventListener('click', () => {
        lightbox.close();
    });

    // Affichage de la lightbox
    lightbox.showModal();

    // Ecouteur d'événements clavier dans la lightbox. 
    lightbox.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            navigateToPreviousMedia();
        } else if (event.key === 'ArrowRight') {
            navigateToNextMedia();
        }
    }, true);
}