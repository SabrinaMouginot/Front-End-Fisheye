// function displayModal() {
//     const modal = document.getElementById("contact_modal");
// 	modal.style.display = "block";
// }

// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }


//Je crée une fonction pour afficher la modale de contact
function displayModal() {
    const modal = document.getElementById("contact_modal"); //récupère l'élément du DOM ayant l'ID "contact_modal" et l'assigne à la variable constante "modal".
    modal.style.display = "block"; //définie le style de l'élément modal pour le rendre visible en lui attribuant la valeur "block".
    const modalAttribute = document.querySelector(".modal"); //sélectionne le premier élément du DOM avec la classe "modal" et l'assigne à la variable constante "modalAttribute".
    modalAttribute.setAttribute("aria-modal", "true"); //attribue à l'élément modal l'attribut ARIA "aria-modal" avec la valeur "true".
    const main = document.getElementById("main"); //récupère l'élément du DOM ayant l'ID "main" et l'assigne à la variable constante "main".
    main.setAttribute("aria-modal", "false"); //attribue à l'élément "main" l'attribut ARIA "aria-modal" avec la valeur "false".
    const close = document.querySelector('.btnClose'); //sélectionne le premier élément du DOM avec la classe "btnClose" et l'assigne à la variable constante "close".
    const form = document.getElementById('formContact'); //récupère l'élément du DOM ayant l'ID "formContact" et l'assigne à la variable constante "form".
    modalAttribute.focus(); //met le focus sur l'élément modal, ce qui peut être utile pour la navigation au clavier.
    close.addEventListener("keydown", (ev) => { //ajoute un écouteur d'événements pour la touche enfoncée sur l'élément "close" et exécute la fonction fléchée lorsqu'on appuie sur une touche.
        if (ev.key == "Enter") { // vérifie si la touche enfoncée est la touche "Enter".
            modal.style.display = "none";  //Si la touche "Enter" est enfoncée, cela masque l'élément modal en lui attribuant la valeur "none".
            main.setAttribute("aria-modal", "true"); //attribue à l'élément "main" l'attribut ARIA "aria-modal" avec la valeur "true".
            modalAttribute.setAttribute("aria-modal", "false"); //attribue à l'élément modal l'attribut ARIA "aria-modal" avec la valeur "false".
        }
    })
    form.addEventListener('submit', function (e) { //ajoute un écouteur d'événements pour la soumission du formulaire et exécute la fonction de rappel lorsqu'il est soumis.
        e.preventDefault(); //empêche le comportement par défaut du formulaire, évitant ainsi qu'il ne soit soumis de manière traditionnelle.

        validForm(); //appelle une fonction nommée "validForm", probablement destinée à valider le formulaire.
    });
}


//Je crée une fonction pour la fermeture de la modale de contact
function closeModal() {
    const modal = document.getElementById("contact_modal"); //Récupère l'élément du DOM avec l'ID "contact_modal" et l'assigne à la variable constante "modal".
    const btnModal = document.querySelector(".contact_button"); //Sélectionne le premier élément du DOM avec la classe "contact_button" et l'assigne à la variable constante "btnModal".
    const modalAttribute = document.querySelector(".modal"); //Sélectionne le premier élément du DOM avec la classe "modal" et l'assigne à la variable constante "modalAttribute".
    const main = document.getElementById("main"); //Récupère l'élément du DOM avec l'ID "main" et l'assigne à la variable constante "main".
    const body = document.getElementById("body"); //Récupère l'élément du DOM avec l'ID "body" et l'assigne à la variable constante "body".
    modal.style.display = "none"; //Masque l'élément modal en lui attribuant la valeur "none".
    modalAttribute.setAttribute("aria-modal", "false"); //Attribue à l'élément modal l'attribut ARIA "aria-modal" avec la valeur "false".
    main.setAttribute("aria-modal", "true"); //Attribue à l'élément "main" l'attribut ARIA "aria-modal" avec la valeur "true".
    body.classList.remove("no-scroll"); //Supprime la classe "no-scroll" de la liste de classes de l'élément body, probablement utilisée pour permettre le défilement.
    btnModal.focus(); //Met le focus sur le bouton modal, ce qui peut être utile pour la navigation au clavier.
}


//Je crée une fonction pour gérer les cas d'erreur dans le formulaire de contact
const validForm = () => {
    const formData = document.querySelectorAll(".formData"); //Sélectionne tous les éléments du DOM avec la classe "formData" et les assigne à la variable constante "formData".
    var formValid = []; //Déclare une variable "formValid" comme un tableau vide.
    const mailValid = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/; //Définit une expression régulière pour valider une adresse e-mail.
    const setError = (element, message) => { //Déclare une fonction fléchée "setError" qui prend un élément du formulaire et un message d'erreur, puis affiche le message d'erreur et applique des classes CSS pour indiquer une erreur.
        const formData = element.parentElement;
        const errorDisplay = formData.querySelector('.errorMessage');

        errorDisplay.innerHTML = message;
        formData.classList.add("error");
        formData.classList.remove("success");
    }

    const setSuccess = (element) => { //Déclare une fonction fléchée "setSuccess" qui prend un élément du formulaire, puis efface tout message d'erreur et applique des classes CSS pour indiquer un succès.
        const formData = element.parentElement;
        const errorDisplay = formData.querySelector('.errorMessage');

        errorDisplay.innerHTML = "";
        formData.classList.add("success");
        formData.classList.remove("error");
    }

    const success = document.querySelectorAll(".success"); //Sélectionne tous les éléments du DOM avec la classe "success" et les assigne à la variable constante "success".
    const firstName = document.getElementById('first'); //Récupère l'élément du DOM avec l'ID "prenom" et l'assigne à la variable constante "firstName".
    const lastName = document.getElementById('last'); //Récupère l'élément du DOM avec l'ID "nom" et l'assigne à la variable constante "lastName".
    const mail = document.getElementById('email'); //Récupère l'élément du DOM avec l'ID "email" et l'assigne à la variable constante "mail".
    const messageForm = document.getElementById('message'); //Récupère l'élément du DOM avec l'ID "message" et l'assigne à la variable constante "messageForm".
    //Les blocs if suivants vérifient chacun des champs du formulaire, affichent un message d'erreur s'il y a un problème et appellent les fonctions "setError" ou "setSuccess" en conséquence.
    if (firstName.value.trim() == "") {
        setError(firstName, "Saisissez votre prénom");
    } else {
        setSuccess(firstName);
    }
    if (lastName.value.trim() == "") {
        setError(lastName, "Saisissez votre Nom");
    } else {
        setSuccess(lastName);
    }
    if (mail.value.trim() == "") {
        setError(mail, "Saisissez une adresse mail");
    } else if (mailValid.test(mail.value) == false) {
        setError(mail, "Saisissez une adresse mail valide");
    } else {
        setSuccess(mail);
    }
    if (messageForm.value.trim() == "") {
        setError(messageForm, "Saisissez un message")
    } else if (messageForm.value.trim().length < 10) {
        setError(messageForm, "Saisissez un message de plus de 10 caractères");
    } else {
        setSuccess(messageForm);
    }

    if (formData.length == success.length) { //Vérifie si le nombre d'éléments avec la classe "formData" est égal au nombre d'éléments avec la classe "success". Si oui, cela signifie que tous les champs du formulaire sont valides.
        //Les lignes suivantes ajoutent les valeurs des champs valides au tableau "formValid", puis appellent la fonction "closeModal" pour fermer la modale de contact et affichent le tableau dans la console.
        formValid.push("Prenom: " + firstName.value);
        formValid.push("Nom: " + lastName.value);
        formValid.push("Email: " + mail.value);
        formValid.push("Message: " + messageForm.value);
        closeModal();

        return console.log(formValid); //Affiche le tableau "formValid" dans la console et termine l'exécution de la fonction.
    }
}