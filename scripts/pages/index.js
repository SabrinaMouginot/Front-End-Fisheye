import { photographerTemplate } from '../templates/photographer.js';
//Comme photographerTemplate est définie dans un autre fichier, je dois l'importer dans index.js avant son utilisation.

// Récupérer les données des photographes à partir d'un fichier JSON. 
async function getPhotographers() {
    const photographers = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())
    return photographers;
}

// Afficher les cartes des utilisateurs
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM(photographer.id); // passer l'id du photographe
        photographersSection.appendChild(userCardDOM);
    });
}

// Récupèration et affichage les données des photographes
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

// appel la fonction init pour démarrer l'exécution 
init();