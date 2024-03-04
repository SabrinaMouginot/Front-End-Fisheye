// Sélectionner la flèche gauche et ajouter un écouteur d'événements
const leftArrow = document.querySelector('.arrow-left');
if (leftArrow) {
    leftArrow.addEventListener('click', navigateToPreviousMedia);
}

export function navigateToPreviousMedia(medias, path) {
    const lightboxContent = document.querySelector('#media-content');
    const currentMedia = lightboxContent.firstChild;

    // Vérifier si currentMedia est null ou s'il n'a pas d'attribut "data-index"
    if (!currentMedia || !currentMedia.getAttribute) {
        return;
    }

    const currentIndex = Number(currentMedia.getAttribute("data-index"));

    // Calcul de l'index précédent en prenant en compte le bouclage
    const previousIndex = (currentIndex - 1 + medias.length) % medias.length;

    const previousMedia = medias[previousIndex];

    // Vide la lightbox avant d'ajouter le nouveau média
    lightboxContent.innerHTML = '';

    // if (previousMedia && previousMedia.image) {
    if (previousMedia.image) {
        const img = document.createElement('img');
        img.setAttribute("data-index", previousIndex);
        img.src = path + previousMedia.image;
        img.alt = previousMedia.title;
        lightboxContent.appendChild(img);
    // } else if (previousMedia && previousMedia.video) {
    } else if (previousMedia.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.src = path + previousMedia.video;
        video.appendChild(source);
        lightboxContent.appendChild(video);
        video.setAttribute("data-index", previousIndex);
        // video.setAttribute('title', previousMedia.title); // Ajout du titre à la balise vidéo
        // source.setAttribute('title', previousMedia.title); // Ajout du titre à la balise vidéo
    }
}

