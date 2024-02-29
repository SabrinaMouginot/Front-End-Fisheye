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

    // Rendre la lightbox focusable pour capturer les événements de clavier
    // lightbox.tabIndex = 0;
    // lightbox.focus();


    // Ajouter la croix de fermeture à la lightbox
    const closeButton = document.getElementById("btn-close");
    closeButton.addEventListener('click', () => {
        lightbox.close();
    });

    // Affichez la lightbox
    lightbox.showModal();

}

// NAVIGATION TOUCHES FLECHEES

// Ajouter un écouteur d'événements pour détecter les pressions sur les touches du clavier
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        console.log('Flèche gauche pressée');
        navigateToPreviousMedia(); // Appeler la fonction pour passer au média précédent lors de la pression de la touche flèche gauche
    } else if (event.key === 'ArrowRight') {
        console.log('Flèche droite pressée');
        navigateToNextMedia(); // Appeler la fonction pour passer au média suivant lors de la pression de la touche flèche droite
    }
});
