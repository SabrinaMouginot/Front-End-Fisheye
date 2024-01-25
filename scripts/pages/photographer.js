//Mettre le code JavaScript lié à la page photographer.html

const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
const dialog = document.querySelector("#contact_modal");

async function getPhotographer() {
    const data = await fetch('http://127.0.0.1:5500/data/photographers.json')
        .then((res) => res.json())

    const photographer = data.photographers.find((photo) => photo.id == photographerId)
    return photographer;
}

function displayPhotographerInfo(photographer) {
    const photographerName = document.querySelector("#photographer-name");
    const photographerLocation = document.querySelector("#photographer-location");
    const photographerTagline = document.querySelector("#photographer-desc");
    const photographerImg = document.querySelector("#photographer-photo");

    if (photographer) {
        photographerName.innerText = photographer.name;
        photographerLocation.innerText = photographer.city + ", " + photographer.country;
        photographerTagline.innerText = photographer.tagline;
        photographerImg.src = `assets/photographers/Sample_Photos/Photographers ID Photos/${photographer.portrait}`;
        photographerImg.alt = photographer.name;
 
    } else {
        // errorMessage.innerText = "Photographer object is undefined.";
        console.error("Photographer object is undefined.");
    }
}

function displayModal() {
    dialog.showModal();
}

async function init() {
    // Récupère les datas des photographes
    const photographer = await getPhotographer();
    // console.log(photographer);
    displayPhotographerInfo(photographer);

    const contactBtn = document.querySelector("#contact");
    contactBtn.addEventListener("click", displayModal);



    
    // Récupère et affiche les médias du photographe
    const mediaDataImage = await fetch(`http://127.0.0.1:5500/assets/photographers/Sample_Photos/${photographer.name}/${photographer.image}`).then(res => res.blob());
    const mediaDataVideo = await fetch(`http://127.0.0.1:5500/assets/photographers/Sample_Photos/${photographer.name}/${photographer.video}`).then(res => res.blob());

    // mediaData.forEach(media => {
    //     const mediaFactory = new TypedataFactory({ image: media.image, video: media.video });
    //     const mediaHTML = mediaFactory.generateMediaHTML();

    //     // Ajoute le HTML des médias à un conteneur dans votre page de photographe
    //     // Remplacez 'mediaContainer' par l'ID ou la classe réelle du conteneur où vous souhaitez afficher les médias
    //     document.getElementById('mediaContainer').innerHTML += mediaHTML;
    // });


    
    // Vérifiez si la réponse est un objet JSON, sinon, traitez directement comme un média
    if (mediaData) {
        mediaData.forEach(media => {
            const mediaFactory = new TypedataFactory({ image: media.image, video: media.video });
            const mediaHTML = mediaFactory.generateMediaHTML();

            // Ajoute le HTML des médias à un conteneur dans votre page de photographe
            // Remplacez 'mediaContainer' par l'ID ou la classe réelle du conteneur où vous souhaitez afficher les médias
            mediaContainer.innerHTML += mediaHTML;
        });
    } else {
        console.error("No media data available.");
    }

}



init();

