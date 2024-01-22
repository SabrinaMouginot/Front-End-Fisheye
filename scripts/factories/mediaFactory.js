// J'utilise le design pattern Factory pour classer les medias en fonction de leurs types
class TypedataFactory {
    constructor(media) { //Déclare un constructeur pour la classe TypedataFactory qui prend un paramètre media.
        if(media.image){ //si la propriété image existe dans l'objet media
            return new PhotographerMedia(media) //alors on crée une nouveau PhotographerMedia en utilisant l'objet media comme argument et retourne cette instance. 
        } else if(media.video) { //sinon si la propriété image existe dans l'objet media.
            return new PhotographerMedia(media) //Il en va de même pour media.video que pour media.image.
        } else { //Sinon (quand ni media.image ni media.video n'existent), on lance le message "Unknow format type !" indiquant un type de format inconnu.
            throw "Unknow format type !" 
        }
    }
}