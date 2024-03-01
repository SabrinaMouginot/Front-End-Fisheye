// Sélectionner la flèche droite et ajouter un écouteur d'événements
// const rightArrow = document.querySelector('.arrow-right');
// if (rightArrow) {
//     rightArrow.addEventListener('click', navigateToNextMedia);
// }

export function navigateToNextMedia(medias, path) {
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
