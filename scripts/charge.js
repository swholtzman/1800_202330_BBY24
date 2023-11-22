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
  let chargeRef = db.collection("users").doc(uid).collection("charge_info").doc("charge")
  chargeRef.get().then((doc) => {
    if (doc.exists) {
      let charge = doc.data().charge;
      let chargePercent = "" + charge + "%";
      document.querySelector("#charge_percent_here").innerHTML = chargePercent;

      const style = window.document.styleSheets[0];
      // const styleSheet = style.sheet;
      console.log(style);
      if (charge >= 60){
        style.insertRule("#charge_percent_here { background-color: green}", 0);
      } else if (charge >= 30){
        style.insertRule("#charge_percent_here { background-color: #F6BE00}", 0);
      } else{
        style.insertRule("#charge_percent_here { background-color: red}", 0);
      }

    } else {
      let charge = prompt("Please enter your car's current battery percentage.");
      setBatteryPercentage(charge).then(() => {
        displayBatteryPercentage();
      });
    }

    
  });
}
displayBatteryPercentage();

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