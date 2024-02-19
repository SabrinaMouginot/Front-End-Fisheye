

// LIGHTBOX
// Fonction pour ouvrir la lightbox avec le média sélectionné
function openLightbox(mediaData) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    // const mediaContainer = document.createElement('div');

    // const closeButton = document.createElement('span'); // Ajout de la croix de fermeture
    // closeButton.classList.add('close-button'); // Ajout de la classe pour les styles CSS

    // // Ajout d'un gestionnaire d'événements pour fermer la lightbox lors du clic sur la croix
    // closeButton.addEventListener('click', () => {
    //     lightbox.close();
    // });

    // Effacez le contenu précédent de la lightbox
    lightboxContent.innerHTML = '';

    // Créez l'élément de média approprié en fonction du type (image ou vidéo)
    if (mediaData.image) {
        const img = document.createElement('img');
        img.src = `assets/photographers/Sample_Photos/${mediaData.firstname}/${mediaData.image}`;
        img.alt = mediaData.title;
        // mediaContainer.appendChild(img);
        lightboxContent.appendChild(img);
    } else if (mediaData.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.src = `assets/photographers/Sample_Photos/${mediaData.firstname}/${mediaData.video}`;
        video.appendChild(source);
        // mediaContainer.appendChild(video);
        lightboxContent.appendChild(video);
    }

        // Ajouter la croix de fermeture à la lightbox
        const closeButton = document.createElement('img');
        closeButton.src = 'assets/icons/close.svg';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', () => {
            lightbox.close();
        });
    // Ajoutez le média à la lightbox
    // lightboxContent.appendChild(mediaContainer);
    lightboxContent.appendChild(closeButton);

    // Affichez la lightbox
    lightbox.showModal();
}