// LIGHTBOX
// Fonction pour ouvrir la lightbox avec le média sélectionné
function openLightbox(mediaData, path) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('#media-content');

    // Vide la div #media-content avant d'ajouter un nouveau média
    lightboxContent.innerHTML = '';

    // Créez l'élément de média approprié en fonction du type (image ou vidéo)
    if (mediaData.image) {
        const img = document.createElement('img');
        img.src = `${path}/${mediaData.image}`;
        img.alt = mediaData.title;
        lightboxContent.appendChild(img);
    } else if (mediaData.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.src = `${path}/${mediaData.video}`;
        video.appendChild(source);
        lightboxContent.appendChild(video);
    }

    // Ajouter la croix de fermeture à la lightbox
    const closeButton = document.getElementById("btn-close");
    closeButton.addEventListener('click', () => {
        lightbox.close();
    });



// // // Sélectionner la flèche droite
// // const rightArrow = document.querySelector('.arrow-container img[src="assets/fleches/right.svg"]');

// // // Ajouter un écouteur d'événements à la flèche droite
// // rightArrow.addEventListener('click', () => {
// //     // Récupérer l'article suivant dans la liste des médias
// //     const nextArticle = article.nextElementSibling;

// //     // Si un article suivant existe
// //     if (nextArticle) {
// //         // Récupérer le contenu de l'article suivant
// //         const nextMedia = nextArticle.querySelector('img, video');

// //         // Vider le contenu de la lightbox
// //         lightboxContent.innerHTML = '';

// //         // Insérer le contenu de l'article suivant dans la lightbox
// //         lightboxContent.appendChild(nextMedia.cloneNode(true));
// //     }
// // });



    // Affichez la lightbox
    lightbox.showModal();
}


// Sélectionner la flèche droite et ajouter un écouteur d'événements
const rightArrow = document.querySelector('.arrow-right');
if (rightArrow) {
    rightArrow.addEventListener('click', navigateToNextMedia);
}

// Fonction pour naviguer vers le média suivant
function navigateToNextMedia() {
    const lightboxContent = document.querySelector('#media-content');
    const currentMedia = lightboxContent.querySelector('img, video');
    const currentArticle = currentMedia.parentElement;
    const nextArticle = currentArticle.nextElementSibling;

    // Si un article suivant existe
    if (nextArticle) {
        const nextMedia = nextArticle.querySelector('img, video');
        lightboxContent.innerHTML = ''; // Vider le contenu de la lightbox
        lightboxContent.appendChild(nextMedia.cloneNode(true)); // Insérer le nouveau média
    }
}

// LIGHTBOX
// Fonction pour ouvrir la lightbox avec le média sélectionné
function openLightbox(mediaData, path) {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('#media-content');

    // Vide la div #media-content avant d'ajouter un nouveau média
    lightboxContent.innerHTML = '';

    // Créez l'élément de média approprié en fonction du type (image ou vidéo)
    if (mediaData.image) {
        const img = document.createElement('img');
        img.src = `${path}/${mediaData.image}`;
        img.alt = mediaData.title;
        lightboxContent.appendChild(img);
    } else if (mediaData.video) {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.controls = true;
        source.src = `${path}/${mediaData.video}`;
        video.appendChild(source);
        lightboxContent.appendChild(video);
    }

    // Ajouter la croix de fermeture à la lightbox
    const closeButton = document.getElementById("btn-close");
    closeButton.addEventListener('click', () => {
        lightbox.close();
    });

    // Affichez la lightbox
    lightbox.showModal();
}
