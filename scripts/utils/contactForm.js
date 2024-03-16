const form = document.querySelector('#form')

//Je crée une fonction pour la fermeture de la modale de contact
function closeModal() {
    const dialog = document.querySelector("#contact_modal");
    dialog.close();
}


//Je crée une fonction pour gérer les cas d'erreur dans le formulaire de contact
const validForm = (event) => {
    event.preventDefault()
    const mailValid = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/; //Définit une expression régulière pour valider une adresse e-mail.
    let errors = 0;
    const setError = (element, message) => { //Déclare une fonction fléchée "setError" qui prend un élément du formulaire et un message d'erreur, puis affiche le message d'erreur et applique des classes CSS pour indiquer une erreur.
        const formData = element.parentElement;
        const errorDisplay = formData.querySelector('.errorMessage');

        errorDisplay.innerHTML = message;
        formData.classList.add("error");
        formData.classList.remove("success");
        errors++;
    }

    const setSuccess = (element) => { //Déclare une fonction fléchée "setSuccess" qui prend un élément du formulaire, puis efface tout message d'erreur et applique des classes CSS pour indiquer un succès.
        const formData = element.parentElement;
        const errorDisplay = formData.querySelector('.errorMessage');

        errorDisplay.innerHTML = " ";
        formData.classList.add("success");
        formData.classList.remove("error");
        errors--;

    }

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

    if (errors <= 0) {
        closeModal()
    }
}

form.addEventListener("submit", validForm)