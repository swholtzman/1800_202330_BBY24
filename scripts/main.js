
// MAIN CARD HOVER EFFECTS
document.getElementById("cards").onmousemove = e => {
    for (const card of document.getElementsByClassName("card")) {
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


// BOTTOM NAV BAR BUTTON
let centerButton = document.querySelector('.centerButton');
centerButton.onclick = function () {
    // console.log("a");
    centerButton.classList.toggle('active');
}


// HAMBURGER MENU
let hamburgerButton = document.querySelector('.hamburgerButton');
hamburgerButton.onclick = function () {
    hamburgerButton.classList.toggle('active');
}

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

document.querySelector("#toCharge").addEventListener("click", checkIsCharging);

document.querySelector("#toMap").addEventListener("click", function (event) {
    location.href = "map.html";
});

//check if car is charging -> take to different pages
function checkIsCharging() {
    firebase.auth().onAuthStateChanged(user => {
        // var link;
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(userDoc => {
                    
                    var charging = userDoc.data().isCharging;
                    

                    if (charging == "true") {
                        location.href = "charge.html"
                    } else if (charging == "false"){
                        location.href = "start_charge.html"
                    }
                    
                    
                })
        } else {
            console.log("No user is signed in");
            location.href="login.html";
        }
    });
}