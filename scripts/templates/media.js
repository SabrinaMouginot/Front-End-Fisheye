import { openLightbox } from '../utils/lightbox.js'; //pour importer la fonction openLightbox
let medias = []; // Définir et initialiser medias

export function mediaTemplate(data, firstname) {
    const path = `assets/photographers/Sample_Photos/${firstname}/`;
    console.log('Path:', path);
    console.log('Medias:', medias);

    function getMediaCardDOM(index, medias) {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const video = document.createElement('video');
        img.setAttribute("data-index", index);
        video.setAttribute("data-index", index);
        // video.setAttribute('title', data.title); // Ajout du titre à la balise vidéo
        const div = document.createElement('div');
        const mediaTitle = document.createElement('h3');
        const nbLikes = document.createElement('span');
        const btnLike = document.createElement('i');

        article.classList.add("media-item");
        div.classList.add("media-content");

        if (data.image) {
            article.appendChild(img)
            img.src = path + data.image;
            img.alt = "Image dont le titre est " + data.title;
        } else if (data.video) {
            const source = document.createElement('source')
            video.appendChild(source)
            source.src = path + data.video;
            // source.setAttribute('title', data.title); // Ajout du titre à la balise vidéo
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

        // LIGHTBOX (GESTIONNAIRE D'EVENEMENT)
        // Ajoutez un gestionnaire d'événements de clic pour ouvrir la lightbox
        img.addEventListener('click', () => {
            openLightbox(data, path, medias, index);
        });
        video.addEventListener('click', () => {
            openLightbox(data, path, medias, index);
        });

        return article;
    }

    // Ajouter le média actuel à la liste des médias
    medias.push(data);

    return { getMediaCardDOM };
}

export { medias }; // Exporter la variable medias