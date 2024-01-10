// function photographerTemplate(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement('article');


//         // Création de la balise ancre (<a>) et de l'image (<img>)
//         const anchor = document.createElement('a');
//         anchor.href = '#';

//         const img = document.createElement('img');
//         img.setAttribute("src", picture);
//         // img.setAttribute("src", picture);

//         // Ajout de l'image et du titre h2 à la balise ancre
//         anchor.appendChild(img);

//         // Ajout de la balise ancre (<a>) et de la balise titre (<h2>) à <article>
//         const h2 = document.createElement('h2');
//         h2.textContent = name;
//         anchor.appendChild(h2);


//         // Ajout de la balise ancre (<a>) et de la balise titre (<h2>) à <article>
//         article.appendChild(anchor);
//         // article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }



// function photographerTemplate(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement('article');

//         // Création de la balise ancre (<a>) et de l'image (<img>)
//         const anchor = document.createElement('a');
//         anchor.href = '#'; // Vous pouvez remplacer '#' par le lien réel si nécessaire
//         const img = document.createElement('img');
//         img.setAttribute('src', picture);

//         // Ajout de l'image à la balise ancre
//         anchor.appendChild(img);

//         // Création de la balise titre (<h2>) et ajout au <article>
//         const h2 = document.createElement('h2');
//         h2.textContent = name;

//         // Ajout de la balise ancre (<a>) et de la balise titre (<h2>) à <article>
//         article.appendChild(anchor);
//         article.appendChild(h2);

//         return article;
//     }

//     return { name, picture, getUserCardDOM };
// }


function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/Sample Photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        // Création de la balise ancre (<a>)
        const anchor = document.createElement('a');
        anchor.href = '#'; // Vous pouvez remplacer '#' par le lien réel si nécessaire

        // Création de l'image (<img>) et ajout à la balise ancre
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        anchor.appendChild(img);

        // Création de la balise titre (<h2>) et ajout à la balise ancre
        const h2 = document.createElement('h2');
        h2.textContent = name;
        anchor.appendChild(h2);

        // Ajout de la balise ancre (<a>) à <article>
        article.appendChild(anchor);

        return article;
    }

    return { name, picture, getUserCardDOM };
}

