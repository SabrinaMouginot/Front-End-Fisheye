

function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');



        // Création de la balise ancre (<a>)
        const anchor = document.createElement('a');
        anchor.href = '#';



        // Création de l'image (<img>) et ajout à la balise ancre
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        anchor.appendChild(img);

        // Création de la balise titre (<h2>) et ajout à la balise ancre
        const h2 = document.createElement('h2');
        h2.textContent = name;
        anchor.appendChild(h2);



        // Ajout de la ville et du pays (<p>) et ajout à la balise ancre
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        anchor.appendChild(location);

        // Ajout de la tagline avec retour à la ligne (<p>) et ajout à la balise ancre
        const taglineParagraph = document.createElement('p');
        taglineParagraph.textContent = tagline;
        anchor.appendChild(taglineParagraph);

        // Ajout du prix avec retour à la ligne (<p>) et ajout à la balise ancre
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `Price: ${price}$`;
        anchor.appendChild(priceParagraph);

        

        // Ajout de la balise ancre (<a>) à <article>
        article.appendChild(anchor);

        return article;
    }

    return { name, picture, getUserCardDOM };
}


