function leave() {
    document.getElementById('charge').classList.add('leave');
    document.getElementById('map').classList.add('leave');
    setTimeout(function () { location.href = "main.html"; }, 1000);
}

var cards = document.getElementById('cards');

window.addEventListener("click", function (event) {
    if (event.target.nodeName == "BODY") {
        leave();
    }
});


function displayBatteryPercentage() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            db.collection("users").doc(user.uid).collection(charging_info).doc(Charging_Status)
                .onSnapshot(e => {                                                               
                    console.log("current document data: " + e.data().charge);                          
                    document.querySelector("#charge_percent_here").innerHTML = e.data().charge;

                })
        }
    })
}
displayBatteryPercentage();

function displayEstimatedTime() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            db.collection("users").doc(user.uid)
                .onSnapshot(e => {                                                             
                    console.log("current document data: " + e.data().est_time); 
                    if (e.data().est_time == null){
                        document.querySelector("#est_time_here").innerHTML = "Currently not charging";
                    } else{       
                    document.querySelector("#est_time_here").innerHTML = e.data().est_time;   
                    }
                })
        }
    })
}
displayEstimatedTime()

/** BOTTOM NAV BAR BUTTON */
function animateBottomNavbar() {
  let centerButton = document.querySelector('.centerButton');
  centerButton.onclick = function () {
    centerButton.classList.toggle('active');
  }
}
animateBottomNavbar();