

// LIGHTBOX
// Fonction pour ouvrir la lightbox avec le média sélectionné
function openLightbox(mediaData) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const mediaContainer = document.createElement('div');

    // Effacez le contenu précédent de la lightbox
    lightboxContent.innerHTML = '';

    // Créez l'élément de média approprié en fonction du type (image ou vidéo)
    if (mediaData.image) {
        const img = document.createElement('img');
        img.src = `assets/photographers/Sample_Photos/${mediaData.firstname}/${mediaData.image}`;
        img.alt = mediaData.title;
        mediaContainer.appendChild(img);
    } else if (mediaData.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.src = `assets/photographers/Sample_Photos/${mediaData.firstname}/${mediaData.video}`;
        video.appendChild(source);
        mediaContainer.appendChild(video);
    }

    // Ajoutez le média à la lightbox
    lightboxContent.appendChild(mediaContainer);

    // Affichez la lightbox
    lightbox.showModal();
}