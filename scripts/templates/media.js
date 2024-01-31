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


        // const mediaElement = media.type === 'image' ? document.createElement('img') : document.createElement('video');
        
        // mediaElement.src = `assets/${media.type}s/${media.fileName}`;
        // mediaElement.alt = media.title;
        // mediaElement.controls = true;

        // article.appendChild(mediaElement);


        return article;
    }

    return { getMediaCardDOM };
}
