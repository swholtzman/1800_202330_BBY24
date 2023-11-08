function leave(){
    document.getElementById('charge').classList.add('leave');
    document.getElementById('map').classList.add('leave');
    setTimeout( function () { location.href = "main.html"; }, 1000);
}

var cards = document.getElementById('cards');

window.addEventListener("click", function(event) {
    if (event.target.nodeName == "BODY"){
        leave();
    }
});

let centerButton = document.querySelector('.centerButton');
centerButton.onclick = function(){
    centerButton.classList.toggle('active');
}

let hamburgerButton = document.querySelector('.hamburgerButton');
hamburgerButton.onclick = function(){
    hamburgerButton.classList.toggle('active');
}

