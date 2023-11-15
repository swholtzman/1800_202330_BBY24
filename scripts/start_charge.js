document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;


        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        card.onclick = () => {
            card.classList.toggle("active");
        };
    }
}

let centerButton = document.querySelector('.centerButton');
centerButton.onclick = function(){
    console.log("a");
    centerButton.classList.toggle('active');
}

let hamburgerButton = document.querySelector('.hamburgerButton');
hamburgerButton.onclick = function(){
    hamburgerButton.classList.toggle('active');
}

function leave() {
    document.getElementById('charge').classList.add('leave');
    document.getElementById('map').classList.add('leave');
    document.getElementById('placehold').classList.add('leave');
    document.getElementById('start').classList.add('leave');
    setTimeout(function () { location.href = "main.html"; }, 1000);
}

var cards = document.getElementById('cards');

window.addEventListener("click", function (event) {
    if (event.target.nodeName == "BODY") {
        leave();
    }
});

const primaryNav = document.querySelector(".primary-navigation");

hamburgerButton.addEventListener('click', (event) => {
    const visibility = primaryNav.getAttribute("data-visible");

    if (visibility === "false") {
        primaryNav.setAttribute("data-visible", "true")
        hamburgerButton.setAttribute("data-visible", "true");
    } else if (visibility === "true") {
        primaryNav.setAttribute("data-visible", "false");
        hamburgerButton.setAttribute("data-visible", "false");
    }
});

document.querySelector("#toCharge").addEventListener("click", function(event) {
    location.href = "charge.html";
});

document.querySelector("#toMap").addEventListener("click", function(event) {
    location.href = "map.html";
});
