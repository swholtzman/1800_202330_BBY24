/* Feel free to link this JS file in the HEAD of any html file except the login page */

// Global current user ID variable
var uid = getCurrentUid();

// Get current user id from local storage, force user to login if needed
function getCurrentUid() {
  if (localStorage.getItem("currentUid") == null) {
    signOut();
  } else {
    return localStorage.getItem("currentUid");
  }
}

// Sign out
function signOut() {
  localStorage.removeItem("currentUid");
  firebase.auth().signOut().then(() => {
    location.href = "./login.html";
  });
}

// Write any valid battery percentage to the database
function setBatteryPercentage(percentage) {
  if (percentage < 0 || percentage > 100) {
    console.log("Invalid battery percentage.");
  } else {
    db.collection("users").doc(uid).collection("charge_info").doc("charge").set({charge: percentage});
    console.log("Battery is now at " + percentage + "%");
  }
}