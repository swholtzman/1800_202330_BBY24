/** Reorders every user at a charging station according to their priority score */
function prioritize(stationId) {
  let usersChargingRef = db.collection("places").doc(stationId).collection("users_charging");
  return usersChargingRef.get().then((docs) => {
    let userIds = [];
    docs.forEach((doc) => {
      userIds.push(doc.id); // doc.id is a user's ID
    });
    return userIds;
  }).then((userIds) => {
    let usersCharging = [];
    return new Promise((resolve, reject) => {
      userIds.forEach((userId) => {
        let scoreRef = db.collection("users").doc(userId).collection("charge_info").doc("priorityScore");
        scoreRef.get().then((scoreDoc) => {
          let userScore = scoreDoc.data().score;
          usersCharging.push([userId, userScore]);
          if (usersCharging.length == userIds.length) {
            // The promise is resolved once all users have been added to the usersCharging list
            resolve(usersCharging);
          }
        });
      });
    });
  }).then((usersCharging) => {
    let orderedUsers = [];
    usersCharging.forEach((userInfo) => {
      if (orderedUsers.length == 0) {
        // this is the first iteration
        orderedUsers.push(userInfo);
      } else {
        // this is the second iteration and onwards
        let index = -1;
        let myScore = userInfo[1];
        let someScore;
        do {
          index++;
          someScore = orderedUsers[index][1];
        } while (index < orderedUsers.length && myScore <= someScore)
        orderedUsers.splice(index, 0, userInfo);
      }
    });
    // orderedUsers is finally returned to whatever called prioritize()
    return orderedUsers;
  });
}

/** Calculates the user's priority score. */
function calcPriorityScore() {
  return new Promise((resolve, reject) => {
    let chargeRef = db.collection("users").doc(uid).collection("charge_info").doc("charge");
    chargeRef.get().then((doc) => {
      let batteryInPercent = doc.data().charge;
      let carModel = doc.data().car;
      let hoursAvailable = 5;
      let bracketFactor = calcBracketFactor(batteryInPercent, carModel);
      let priorityScore = bracketFactor * (1 / hoursAvailable);

      let scoreRef = db.collection("users").doc(uid).collection("charge_info").doc("priorityScore");
      scoreRef.set({score: priorityScore}).then(() => {
        resolve(priorityScore);
      });
    });
  })
}

/** Assigns the car to a priority bracket according to its model and remaining battery */
function calcBracketFactor(batteryInPercent, carModel) {
  let bracketFactor = 0;

  if (batteryInPercent >= 100) {
    console.log("Car is fully charged.");
  } else {
    let batteryInKm = convertPercentToKm(batteryInPercent, carModel);
  
    if (batteryInKm >= 0 && batteryInKm < 80) {
      bracketFactor = 8;
    } else if (batteryInKm >= 80 && batteryInKm < 200) {
      bracketFactor = 4;
    } else if (batteryInKm >= 200 && batteryInKm < 320) {
      bracketFactor = 2;
    } else if (batteryInKm >= 320) {
      bracketFactor = 1;
    } else {
      console.log("Error: Invalid battery percantage.");
    }
  }

  return bracketFactor;
}

/** Estimates how many kilometres the car can drive until its battery reaches 0% */
function convertPercentToKm(percentLeft, carModel) {
  return (percentLeft * getPercentToKmConversion(carModel));
}

/** Estimates how many kilometres a car can drive per 1% left in the battery. */
function getPercentToKmConversion(carModel) {
  let conversion = 0;
  switch (carModel) {
    case "Tesla Model Y": {
      conversion = 4.350; // 4.35km per 1%
      break;
    }
    case "Mustang Mach-E": {
      conversion = 3.775; // 3.775km per 1%
      break;
    }
    case "Kia EV6": {
      conversion = 4.075; // 4.075km per 1%
      break;
    }
    default: {
      conversion = 4.067; // Default average value if model doesn't match
      break;
    }
  }
  return conversion;
}

prioritize("GdLFDVSF18wVznJy1Ruz").then(
  (list) => console.log(list)
);
