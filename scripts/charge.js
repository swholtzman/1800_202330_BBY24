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
            db.collection("users").doc(user.uid)
                .onSnapshot(percent => {                                                               
                    console.log("current document data: " + percent.data().charge);                          
                    document.querySelector("#charge_percent_here").innerHTML = percent.data().charge;

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
                .onSnapshot(est_time => {                                                             
                    console.log("current document data: " + est_time.data().estTime);                        
                    document.querySelector("#est_time_here").innerHTML = est_time.data().estTime;   
                })
        }
    })
}
displayEstimatedTime()
