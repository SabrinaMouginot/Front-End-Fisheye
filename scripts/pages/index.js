import { photographerTemplate } from '../templates/photographer.js';
//Comme photographerTemplate est définie dans un autre fichier, je dois l'importer dans index.js avant son utilisation.

async function getPhotographers() {
    // const photographers = await fetch('http://127.0.0.1:5500/data/photographers.json')
    const photographers = await fetch('https://sabrinamouginot.github.io/Front-End-Fisheye/data/photographers.json')
        .then((res) => res.json())
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM(photographer.id); // passer l'id du photographe
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
