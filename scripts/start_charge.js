/** This function is called when the user leaves the charging page.
 *  It gives different divs classes to play animations.
*/
function leave() {
    document.getElementById('charge').classList.add('leave');
    document.getElementById('map').classList.add('leave');
    document.getElementById('placehold').classList.add('leave');
    document.getElementById('start').classList.add('leave');
    setTimeout(function () { location.href = "index.html"; }, 1000);
}

var cards = document.getElementById('cards');

/**Goes back to index.html after clicking area outside of the card. */
window.addEventListener("click", function (event) {
    if (event.target.nodeName == "BODY") {
        leave();
    }
});

/**Goes to map.html when "back" is clicked. */
document.querySelector("#back").addEventListener("click", function () {
    location.href = "map.html";
});

/** Gets name of charger from URL params, and displays it. */
function showChargingStation() {
    var name;
    var chargerID = getStationId();
    db.collection("places").doc(chargerID)
        .get()
        .then(e => {
            name = e.data().loction;
            //console.log(name);
            document.querySelector("#charger_name_here").innerHTML = name;
        })
}
showChargingStation();

function getStationId() {
    return new URL(window.location.href).searchParams.get("ID");
}

//runs when submit button is clicked
document.querySelector("#submit_button").addEventListener("click", function (e) {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            var currentUser = db.collection("users").doc(user.uid);
            var isCharging;
            currentUser.collection("charge_info").doc("is_charging").get().then(doc => {
                if (doc.exists) {
                    isCharging = doc.data().is_charging;
                } else {
                    isCharging = false;
                }
            }).then(function () {
                // Checks if 1) user hasn't inputed anything 2) battery is between 0 and 100
                if (document.querySelector("#bat_select").value != "" && parseInt(document.querySelector("#bat_select").value) <= 100
                && parseInt(document.querySelector("#bat_select").value) >= 100) {
                    //only change data if user is not currently charging
                    if (isCharging == false) {
                        currentUser.collection("charge_info").doc("target_bat")
                            .set({
                                targetBatteryPercent: parseInt(document.querySelector("#bat_select").value),
                            })

                        currentUser.collection("charge_info").doc("target_location")
                            .set({
                                targetLocation: getStationId(),
                            })

                        let chargingRef = currentUser.collection("charge_info").doc("is_charging");
                        chargingRef.set({ is_charging: true }).then(() => {
                            let durationRef = currentUser.collection("charge_info").doc("target_time");
                            let duration = parseFloat(document.querySelector("#hour_select").value);
                            //console.log("duration:", duration);
                            return new Promise((resolve, reject) => {
                                durationRef.set({ targetDuration: duration }).then(() => {
                                    resolve();
                                });
                            });
                        }).then(() => {
                            startCharging(getStationId()).then((score) => {
                                //console.log(score);
                                alert("Successfully saved.");
                                window.location.href = "index.html"
                            });
                        });

                    } else {
                        alert("You're already charging!");
                    }
                } else {
                    alert("Battery needs to be between 0 and 100");
                }
            })


        } else {
            alert("Not signed in.");
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