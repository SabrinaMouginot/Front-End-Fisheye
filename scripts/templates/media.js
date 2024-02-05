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

        article.appendChild(div)
        div.appendChild(mediaTitle)
        div.appendChild(nbLikes)
        div.appendChild(btnLike)

        return article;
    }

    return { getMediaCardDOM };
}
