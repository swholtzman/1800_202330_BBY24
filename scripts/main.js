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

document.querySelector("#toCharge").addEventListener("click", function(event) {
    location.href = "charge.html";
});

document.querySelector("#toMap").addEventListener("click", function(event) {
    location.href = "map.html";
});

