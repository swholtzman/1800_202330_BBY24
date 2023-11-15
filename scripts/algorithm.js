/** Estimates how many kilometres the car can drive until the battery reaches 0%/ */
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
    case "Ford Mustang Mach-E": {
      conversion = 3.775; // 3.775km per 1%
      break;
    }
    case "Kia EV6 Long Range 2WD": {
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

/** Assigns the car to a priority bracket according to how many km it can still drive. */
function calcBracketFactor(batteryInKm) {
  let bracketFactor = 0;
  if (batteryInKm >= 0 && batteryInKm < 80) {
    bracketFactor = 8;
  } else if (batteryInKm >= 80 && batteryInKm < 200) {
    bracketFactor = 4;
  } else if (batteryInKm >= 200 && batteryInKm < 320) {
    bracketFactor = 2;
  } else if (batteryInKm >= 320) {
    bracketFactor = 1;
  } else {
    console.log("Error: Invalid battery percantage");
  }
  return bracketFactor;
}

/** Calculates the car's priority score. */
function calcPriorityScore(batteryInPercent, carModel, hoursAvailable) {
  let batteryInKm = convertPercentToKm(batteryInPercent, carModel);
  let bracketFactor = calcBracketFactor(batteryInKm);
  return (bracketFactor * (1 / hoursAvailable));
}

console.log("Your priority score is", calcPriorityScore(10, "Tesla Model Y", 5));
