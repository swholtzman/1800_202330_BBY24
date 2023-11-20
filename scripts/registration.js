var loginButton = document.getElementById("login personalInfoFields");
var registerButton = document.getElementById("register");
var buttonBox = document.getElementById("btn");



function register() {
    loginButton.style.opacity = "0%";

    registerButton.style.marginLeft = "0px"
    registerButton.style.opacity = "100%";

    buttonBox.style.left = "50%";
}

function login() {
    loginButton.style.opacity = "100%";

    registerButton.style.marginLeft = "1000px"
    registerButton.style.opacity = "0%";
    
    buttonBox.style.left = "0";
}
