import { navigateToPreviousMedia } from './lightbox/previousArrow.js';
import { navigateToNextMedia } from './lightbox/nextArrow.js';

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
        } else if (event.key === 'Enter') {
            // Récupérer l'élément qui a le focus
            const focusedElement = document.activeElement;
            // Vérifier si l'élément a une classe spécifique pour le traitement de la touche Enter
            if (focusedElement.classList.contains('arrow-left')) {
                navigateToNextMedia();
            } else if (focusedElement.classList.contains('arrow-right')) {
                navigateToPreviousMedia();
            } else if (focusedElement.id === 'btn-close') {
                lightbox.close();
            }
        }
    }, true);

    // Gestionnaire d'événements pour intercepter la tabulation
    lightbox.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            // Récupérer tous les éléments focusables dans la lightbox
            const focusableElements = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const totalFocusable = focusableElements.length;

            // Récupérer l'index de l'élément actuellement focusé
            let currentIndex = Array.from(focusableElements).indexOf(document.activeElement);

            // Si l'utilisateur appuie sur Maj + Tab, inverser la direction
            const isShiftPressed = event.shiftKey;
            const tabDirection = isShiftPressed ? -1 : 1;

            // Calculer le prochain index
            let nextIndex = currentIndex + tabDirection;

            // Gérer les cas où l'index sort des limites
            if (nextIndex >= totalFocusable) {
                nextIndex = 0; // Retour au début
            } else if (nextIndex < 0) {
                nextIndex = totalFocusable - 1; // Aller à la fin
            }

            // Définir le focus sur le prochain élément focusable
            focusableElements[nextIndex].focus();

            // Empêcher la tabulation de se propager
            event.preventDefault();
        }
    });

}