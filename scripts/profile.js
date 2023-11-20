var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userCar = userDoc.data().car;
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCar != null) {
                        document.getElementById("carInput").value = userCar;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }

                    // Get car model, which is in a subcollection instead of directly in the user collection
                    currentUser.collection("charge_info").doc("car").get().then((chargeDoc) => {
                      var userCar = chargeDoc.data().car;

                      if (userCar != null) {
                        document.getElementById("carInput").value = userCar;
                      }
                    });
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

document.getElementById()

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //enter code here

    //a) get user entered values

    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userCar = document.getElementById('carInput').value;     //get the value of the field with id="schoolInput"
    userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"

    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        car: userCar,
        city: userCity
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}

function updateCarModel(model) {
  db.collection("users").doc(user.uid).collection("charge_info").doc("car").update({car: model});
}
