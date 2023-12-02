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

/** Goes back to index.html after clicking area outside of the card.*/
window.addEventListener("click", function (event) {
  if (event.target.nodeName == "BODY") {
    leave();
  }
});

/** Gets battery percentage from firestore and displays it.
 * It also sets the battery icon colour depending on the battery level.
*/
function displayBatteryPercentage() {
  let chargeRef = db.collection("users").doc(uid).collection("charge_info").doc("charge")
  chargeRef.get().then((doc) => {
    if (doc.exists) {
      let charge = doc.data().charge;
      let chargePercent = "" + charge + "%";
      document.querySelector("#charge_percent_here").innerHTML = chargePercent;

      const style = window.document.styleSheets[0];
      
      if (charge >= 60) {
        style.insertRule("#charge_percent_here { background-color: green}", 0);
      } else if (charge >= 30) {
        style.insertRule("#charge_percent_here { background-color: #F6BE00}", 0);
      } else {
        style.insertRule("#charge_percent_here { background-color: red}", 0);
      }

    } else {    //if there's no car battery data
      let charge = parseInt(prompt("Please enter your car's current battery percentage."));
      setBatteryPercentage(charge).then(() => {
        displayBatteryPercentage();
      });
    }

  });
}
displayBatteryPercentage();

/** Gets estimated charge time from firestore and displays it.*/
function displayEstimatedTime() {
  let estTimeRef = db.collection("users").doc(uid).collection("charge_info").doc("est_time");
  estTimeRef.get().then((doc) => {
    if (!doc.exists || doc.data().est_time == null) {
      document.querySelector("#est_time_here").innerHTML = "Not Charging";
    } else {
      document.querySelector("#est_time_here").innerHTML = doc.data().est_time;
    }
  });
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

/** Displays the "stop charge" button if the user is charging. */
function showStopCharge(){
  const doc = db.collection("users").doc(uid).collection("charge_info").doc("is_charging");
  const style = window.document.styleSheets[0];
  doc.get().then((e) => {
    if (e.data().is_charging == false){
      style.insertRule("#stop_charge{display: none;}");
    }
  
  })
  
}
showStopCharge();

/** Runs stopCharging function in global.js when "stop charging" button is clicked. */
document.querySelector("#stop_charge").addEventListener("click", function e(){
  const doc = db.collection("users").doc(uid).collection("charge_info").doc("target_location")
  doc.get().then((e) => {
    stopCharging(e.data().targetLocation);
  })
})