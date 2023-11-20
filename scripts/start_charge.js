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

document.querySelector("#submit_button").addEventListener("click", function(e){
        firebase.auth().onAuthStateChanged(user => {
            // Check if user is signed in:
            if (user) {
                var currentUser = db.collection("users").doc(user.uid);
                if(document.querySelector("#bat_select").value != "" && parseInt(document.querySelector("#bat_select").value) <= 100){
                    currentUser.collection("charge_info").doc("target_bat")
                    .set({                                                               
                        targetBatteryPercent: parseInt(document.querySelector("#bat_select").value),
                    })

                    var timeInMin = parseInt(document.querySelector("#hour_select").value)
                    + parseInt(document.querySelector("#minute_select").value) / 60;
                    console.log(timeInMin);

                    currentUser.collection("charge_info").doc("target_time")
                    .set({                                                               
                        targetDuration: timeInMin,
                    })

                    currentUser.collection("charge_info").doc("target_location")
                    .set({                                                               
                        targetLocation: document.querySelector("#location_select").value,
                    })
                } else{
                    console.log("Invalid input");
                }
            } else{
                console.log("Not signed in.");
            }


        })
    
});



