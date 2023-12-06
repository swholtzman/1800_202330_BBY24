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
    location.href = "./registration.html";
  });
}

/** Add user to a station's users_charging collection */
function startCharging(stationId) {
  let userRef = db.collection("places").doc(stationId).collection("users_charging").doc(uid);
  return userRef.set({ id: uid }).then(() => {
    let chargeInfoRef = db.collection("users").doc(uid).collection("charge_info");
    return new Promise((resolve, reject) => {
      chargeInfoRef.doc("is_charging").set({ is_charging: true }).then(() => {
        resolve();
      });
    });
  }).then(() => {
    let chargeInfoRef = db.collection("users").doc(uid).collection("charge_info");
    return new Promise((resolve, reject) => {
      chargeInfoRef.doc("est_time").set({ est_time: "4h 30min" }).then(() => {
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
      let chargeInfoRef = db.collection("users").doc(uid).collection("charge_info");

      chargeInfoRef.doc("is_charging").set({ is_charging: false });
      chargeInfoRef.doc("est_time").set({ est_time: "--:--" });
      chargeInfoRef.doc("priorityScore").set({ score: null });
      chargeInfoRef.doc("target_bat").set({ targetBatteryPercent: 0 });
      chargeInfoRef.doc("target_location").set({ targetLocation: "" });
      chargeInfoRef.doc("target_time").set({ targetDuration: 0 })
        .then(() => {
          resolve(true);
          alert("Stopped charging.");
          location.href="index.html";
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
      chargeRef.set({ charge: percentage }).then(() => {
        //console.log("Battery is now at " + percentage + "%");
        resolve(percentage);
      });
    }
  });
}