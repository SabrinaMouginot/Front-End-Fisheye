// Cette fonction est exportée pour être utilisée à l'extérieur de ce module. 
// Elle prend en paramètre data, qui contient les informations sur le photographe.
export function photographerTemplate(data) { //export permet à d'autres fichiers d'importer et d'utiliser cette fonction. 
    const { name, portrait, city, country, tagline, price } = data;
    // Cela déstructure l'objet data pour extraire les propriétés suivantes : name, portrait, city, country, tagline et price.

    const picture = `assets/photographers/Sample_Photos/Photographers ID Photos/${portrait}`;
    // Cela définit la variable picture contenant le chemin vers l'image du portrait du photographe, 
    // en utilisant le nom de fichier du portrait extrait des données du photographe.

    function getUserCardDOM(id) {
        // Cette fonction est chargée de créer et retourner le contenu HTML représentant la carte d'utilisateur du photographe.
        // Création des éléments HTML pour représenter les informations du photographe
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
// la fonction retourne également le nom du photographe et le chemin vers son portrait, 
// ainsi que la fonction getUserCardDOM pour permettre l'accès à ces données depuis l'extérieur du module.
}


// En résumé, ce code définit une fonction photographerTemplate qui génère une carte HTML 
// pour représenter un photographe avec ses informations, 
// et exporte cette fonction pour être utilisée dans d'autres parties de l'application.