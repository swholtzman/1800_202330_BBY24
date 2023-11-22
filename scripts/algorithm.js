/** Calculates the user's priority score. */
function calcPriorityScore() {
    db.collection("users").doc(uid).collection("charge_info").doc("charge").get().then((doc) => {
    let batteryInPercent = doc.data().charge;
    let carModel = doc.data().car;
    let hoursAvailable = 5;
    let bracketFactor = calcBracketFactor(batteryInPercent, carModel);
    let priorityScore = bracketFactor * (1 / hoursAvailable);
    db.collection("users").doc(uid).collection("charge_info").doc("priorityScore").set({score: priorityScore});
  });
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
