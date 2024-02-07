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

    // Ajoutez un gestionnaire d'événements de clic à l'icône de cœur
    btnLike.addEventListener('click', () => {
        data.likes++; // Incrémentation du nombre de likes
        nbLikes.innerText = data.likes; // Mise à jour du contenu du span
    });

        return article;
    }

    return { getMediaCardDOM };
}
