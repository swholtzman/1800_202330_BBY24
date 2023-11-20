var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");


function register() {
    x.style.opacity = "0%";

    y.style.marginLeft = "0px"
    y.style.opacity = "100%";

    z.style.left = "50%";
}

function login() {
    x.style.opacity = "100%";

    y.style.marginLeft = "1000px"
    y.style.opacity = "0%";
    
    z.style.left = "0";
}