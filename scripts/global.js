/* Feel free to link this JS file in the HEAD of any html file except the login page */

// Global current user ID variable
var uid = getCurrentUid();

/** Get current user id from local storage, force user to login if needed */
function getCurrentUid() {
  if (localStorage.getItem("currentUid") == null) {
    signOut();
  } else {
    return localStorage.getItem("currentUid");
  }
}

/** Sign out */
function signOut() {
  localStorage.removeItem("currentUid");
  firebase.auth().signOut().then(() => {
    location.href = "./login.html";
  });
}

/** Write any valid battery percentage to the database */
function setBatteryPercentage(percentage) {
  return new Promise((resolve, reject) => {
    if (percentage < 0 || percentage > 100) {
      alert("Invalid battery percentage.");
      reject();
    } else {
      let chargeRef = db.collection("users").doc(uid).collection("charge_info").doc("charge");
      chargeRef.set({charge: percentage}).then(() => {
        console.log("Battery is now at " + percentage + "%");
        resolve(percentage);
      });
    }
  });
  
}

/** Add user to a station's users_charging collection */
function startCharging(stationId) {
  db.collection("places").doc(stationId).collection("users_charging").doc(uid).set({
    id: uid
  });
}

/** Remove a user from a station's user_charging collection */
function stopCharging(stationId) {
  db.collection("places").doc(stationId).collection("users_charging").doc(uid).delete();
}