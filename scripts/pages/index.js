// import { photographerTemplate } from '../templates/photographer.js';
// //Comme photographerTemplate est définie dans un autre fichier, je dois l'importer dans index.js avant son utilisation.

// // Récupérer les données des photographes à partir d'un fichier JSON. 
// async function getPhotographers() {
//     const photographers = await fetch('http://127.0.0.1:5500/data/photographers.json')
//         .then((res) => res.json())
//     return photographers;
// }

// // Afficher les cartes des utilisateurs
// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerTemplate(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM(photographer.id); // passer l'id du photographe
//         photographersSection.appendChild(userCardDOM);
//     });
// }


// // Récupèration et affichage les données des photographes
// async function init() {
//     // Récupère les datas des photographes
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// }

// // appel la fonction init pour démarrer l'exécution 
// init();

import { photographerTemplate } from '../templates/photographer.js';

async function getPhotographers() {
    const photographers = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM(photographer.id);
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

const main = document.getElementById('main');
    // Gestionnaire d'événements pour intercepter la tabulation
    main.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            // Récupérer tous les éléments focusables dans la lightbox
            const focusableElements = main.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const totalFocusable = focusableElements.length;

            // Récupérer l'index de l'élément actuellement focusé
            let currentIndex = Array.from(focusableElements).indexOf(document.activeElement);

            // Si l'utilisateur appuie sur Maj + Tab, inverser la direction
            const isShiftPressed = event.shiftKey;
            const tabDirection = isShiftPressed ? -1 : 1;

            // Calculer le prochain index
            let nextIndex = currentIndex + tabDirection;

            // Gérer les cas où l'index sort des limites
            if (nextIndex >= totalFocusable) {
                nextIndex = 0; // Retour au début
            } else if (nextIndex < 0) {
                nextIndex = totalFocusable - 1; // Aller à la fin
            }

            // Définir le focus sur le prochain élément focusable
            focusableElements[nextIndex].focus();

            // Empêcher la tabulation de se propager
            event.preventDefault();
        }
    });