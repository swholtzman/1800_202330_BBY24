/* Feel free to link this JS file in the HEAD of any html file except the login page */
/* This file should not call any functions except getCurrentUid() */
/* getCurrentUid() is called only to ensure that the user i*/

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

/** Add user to a station's users_charging collection */
function startCharging(stationId) {
  let userRef = db.collection("places").doc(stationId).collection("users_charging").doc(uid);
  return userRef.set({id: uid}).then(() => {
    let chargeInfoRef = db.collection("users").doc(uid).collection("charge_info");
    return new Promise((resolve, reject) => {
      chargeInfoRef.doc("is_charging").set({is_charging: true}).then(() => {
        resolve();
      });
    });
  }).then(() => {
    let chargeInfoRef = db.collection("users").doc(uid).collection("charge_info");
    return new Promise((resolve, reject) => {
      chargeInfoRef.doc("est_time").set({est_time: "4h 30min"}).then(() => {
        resolve();
      });
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      calcPriorityScore().then((score) => {
        resolve(score);
      });
    });
  });
    
}

/** Remove a user from a station's user_charging collection */
function stopCharging(stationId) {
  return new Promise((resolve, reject) => {
    let userRef = db.collection("places").doc(stationId).collection("users_charging").doc(uid);
    userRef.delete().then(() => {
      let isChargingRef  = db.collection("users").doc(uid).collection("charge_info").doc("is_charging");
      isChargingRef.set({
        is_charging: false
      }).then(() => {
        resolve(true);
      })
    });
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