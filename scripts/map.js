
let centerButton = document.querySelector('.centerButton');
centerButton.onclick = function(){
    console.log("a");
    centerButton.classList.toggle('active');
}

let hamburgerButton = document.querySelector('.hamburgerButton');
hamburgerButton.onclick = function(){
    hamburgerButton.classList.toggle('active');
}

