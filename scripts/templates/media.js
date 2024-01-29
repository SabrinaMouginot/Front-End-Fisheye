function mediaTemplate(data, portrait) {
    const picture = `assets/photographers/Sample_Photos/Photographers ID Photos/${portrait}`;
    function getMediaCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const div = document.createElement('div');
        const mediaTitle = document.createElement('h3');
        const nbLikes = document.createElement('span');
        const btnLike = document.createElement('i');

        article.appendChild(img)
        article.appendChild(div)
        div.appendChild(mediaTitle)
        div.appendChild(nbLikes)
        div.appendChild(btnLike)

        return article;
    }

    return { getMediaCardDOM };
}