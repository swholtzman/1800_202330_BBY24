function leave() {
    document.getElementById('charge').classList.add('leave');
    document.getElementById('map').classList.add('leave');
    document.getElementById('placehold').classList.add('leave');
    document.getElementById('start').classList.add('leave');
    setTimeout(function () { location.href = "main.html"; }, 1000);
}

var cards = document.getElementById('cards');

//go back to main.html after clicking area outside of the card
window.addEventListener("click", function (event) {
    if (event.target.nodeName == "BODY") {
        leave();
    }
});
//go to map.html when "back" is clicked
document.querySelector("#back").addEventListener("click", function(){
    location.href = "map.html";
});

//gets name of charger from URL params, and display it.
function showChargingStation(){
    var name;
    var chargerID = getStationId();
    db.collection("places").doc(chargerID)
    .get()
    .then(e =>{
        name = e.data().location;
        console.log(name);
        document.querySelector("#charger_name_here").innerHTML = name;
    })
}
showChargingStation();

function getStationId() {
  return new URL(window.location.href).searchParams.get("ID");
}

//runs when submit button is clicked
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
                    
                    var timeInHr = (parseInt(document.querySelector("#hour_select").value)
                    + parseInt(document.querySelector("#minute_select").value) / 60);
                    console.log(timeInHr);

                    currentUser.collection("charge_info").doc("target_time")
                    .set({                                                               
                        targetDuration: timeInHr,
                    }).then(console.log("set target duration: " + timeInHr));
                    

                    currentUser.collection("charge_info").doc("target_location")
                    .set({                                                               
                        targetLocation: document.querySelector("#charger_name_here").innerHTML,
                    }).then(function() {
                        startCharging(getStationId()).then(() => {
                          alert("Successfully saved.");
                          window.location.href = "main.html"
                        })
                        
                    }

                    )                
                    
                } else{
                    console.log("Invalid input");
                    alert("Battery needs to be between 0 and 100");
                }
            } else{
                console.log("Not signed in.");
            }


        })
    
});

/** BOTTOM NAV BAR BUTTON */
function animateBottomNavbar() {
  let centerButton = document.querySelector('.centerButton');
  centerButton.onclick = function () {
    centerButton.classList.toggle('active');
  }
}
animateBottomNavbar();

