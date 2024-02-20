

// LIGHTBOX
// Fonction pour ouvrir la lightbox avec le média sélectionné
function openLightbox(mediaData, path) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('#media-content');
    // const mediaContainer = document.createElement('div');

    // const closeButton = document.createElement('span'); // Ajout de la croix de fermeture
    // closeButton.classList.add('close-button'); // Ajout de la classe pour les styles CSS

    // // Ajout d'un gestionnaire d'événements pour fermer la lightbox lors du clic sur la croix
    // closeButton.addEventListener('click', () => {
    //     lightbox.close();
    // });

    // Créez l'élément de média approprié en fonction du type (image ou vidéo)
    if (mediaData.image) {
        const img = document.createElement('img');
        img.src = `${path}/${mediaData.image}`;
        img.alt = mediaData.title;
        // mediaContainer.appendChild(img);
        lightboxContent.appendChild(img);
    } else if (mediaData.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.src = `${path}/${mediaData.video}`;
        video.appendChild(source);
        // mediaContainer.appendChild(video);
        lightboxContent.appendChild(video);
    }

        // Ajouter la croix de fermeture à la lightbox
        const closeButton = document.getElementById("btn-close");
        closeButton.addEventListener('click', () => {
            lightbox.close();
        });
    // Ajoutez le média à la lightbox
    // lightboxContent.appendChild(closeButton);

    // Affichez la lightbox
    lightbox.showModal();
}