

//Je crée une fonction pour la fermeture de la modale de contact
function closeModal() {
    const dialog = document.querySelector("#contact_modal");
    dialog.close();
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