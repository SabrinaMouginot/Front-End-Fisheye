export function photographerTemplate(data) { //export permet à d'autres fichiers d'importer et d'utiliser cette fonction. 
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Sample_Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM(id) {
        const article = document.createElement('article');
        article.setAttribute('role', 'article'); // Ajout d'un attribut ARIA pour définir le rôle

        // Création de la balise ancre (<a>) avec le lien vers la page d'accueil et l'ID du photographe
        const anchor = document.createElement('a');
        anchor.href = `photographer.html?id=${id}`;
        anchor.setAttribute('aria-label', `${name}, ${city}, ${country}`); // Ajout d'un attribut ARIA pour décrire le contenu de l'ancre

        // Création de l'image (<img>) et ajout à la balise ancre
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `${name}'s portrait`);
        anchor.appendChild(img);

        // Création de la balise titre (<h2>) et ajout à la balise ancre
        const h2 = document.createElement('h2');
        h2.textContent = name;
        anchor.appendChild(h2);

        // Ajout de la ville et du pays (<p>) et ajout à la balise ancre
        const location = document.createElement('h3');
        location.textContent = `${city}, ${country}`;
        anchor.appendChild(location);

        // Ajout de la tagline avec retour à la ligne (<p>) et ajout à la balise ancre
        const taglineParagraph = document.createElement('p');
        taglineParagraph.textContent = tagline;
        anchor.appendChild(taglineParagraph);

        // Ajout du prix avec retour à la ligne (<p>) et ajout à la balise ancre
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `${price}€/jour`;
        anchor.appendChild(priceParagraph);

        // Ajout de la balise ancre (<a>) à <article>)
        article.appendChild(anchor);

        return article;
    }

    return { name, picture, getUserCardDOM };
}
