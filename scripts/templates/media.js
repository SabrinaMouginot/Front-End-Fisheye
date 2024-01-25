// Je défini le modèle de construction pour l'appel des medias  
class PhotographerMedia {
    constructor(media) {
        this._photographerId = media.photographerId
        this._title = media.title
        this._image = media.image
        this._video = media.video
        this._likes = media.likes
        this._date = media.date
        this._price = media.price
        this._id = media.id
    }
    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

}