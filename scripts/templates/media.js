// Je défini le modèle de construction pour l'appel des medias  
class PhotographerMedia {
    constructor(media) {
        this._photographerId = media.photographerId
        this._title = media.title
        this._image = media.image
        this._video = media.video
        this._date = media.date
        this._price = media.price
        this._id = media.id
    }



        // // Générer le HTML pour une image
        // generateImageHTML() {
        //     return `<img src="${this._image}" alt="${this._title}">`;
        // }
    
        // // Générer le HTML pour une vidéo
        // generateVideoHTML() {
        //     return `<video controls>
        //                 <source src="${this._video}" type="video/mp4">
        //                 Votre navigateur ne prend pas en charge la balise vidéo.
        //             </video>`;
        // }


    // get photographerId() {
    //     return this._photographerId
    // }

    // get title() {
    //     return this._title
    // }

}