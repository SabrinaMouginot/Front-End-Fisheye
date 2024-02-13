function mediaTemplate(data, firstname) {
    const picture = `assets/photographers/Sample_Photos/${firstname}/`;
    function getMediaCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const video = document.createElement('video');
        const div = document.createElement('div');
        const mediaTitle = document.createElement('h3');
        const nbLikes = document.createElement('span');
        const btnLike = document.createElement('i');

        article.classList.add("media-item");
        div.classList.add("media-content");

        if (data.image) {
            article.appendChild(img)
            img.src = picture + data.image;
            img.alt = data.title;
        } else if (data.video) {
            const source = document.createElement('source')
            video.appendChild(source)
            source.src = picture + data.video;
            article.appendChild(video)
        }

        mediaTitle.innerText = data.title;
        nbLikes.innerText = data.likes;


        // Ajoutez la classe de l'icône de cœur et définissez son contenu Unicode ou utilisez une bibliothèque d'icônes
        btnLike.classList.add("like-icon");
        btnLike.innerHTML = "&#10084;"; // Exemple de cœur en utilisant Unicode

        article.appendChild(div)
        div.appendChild(mediaTitle)
        div.appendChild(nbLikes)
        div.appendChild(btnLike)


        function updateTotalLikesModal(change) {
            const likesContent = document.getElementById("likesContent");
            let totalLikes = parseInt(likesContent.innerHTML);
            totalLikes += change;
            likesContent.innerHTML = totalLikes + ' &#10084;';
        }

        let isLiked = false; // Variable pour garder une trace de l'état du cœur
        
        btnLike.addEventListener('click', () => {
            if (!isLiked) {
                data.likes++;
                nbLikes.innerText = data.likes;
                isLiked = true;
                updateTotalLikesModal(1); // Appel de la fonction de rappel avec +1
            } else {
                data.likes--;
                nbLikes.innerText = data.likes;
                isLiked = false;
                updateTotalLikesModal(-1); // Appel de la fonction de rappel avec -1
            }
        });


        // Ajoutez un gestionnaire d'événements de clic pour ouvrir la lightbox
        article.addEventListener('click', () => {
            openLightbox(data);
        });

        return article;
    }

    return { getMediaCardDOM };
}




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