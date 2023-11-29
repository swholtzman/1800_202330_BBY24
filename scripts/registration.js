var loginButton = document.getElementById("login personalInfoFields");
var registerButton = document.getElementById("register");
var buttonBox = document.getElementById("btn");



function register() {
    loginButton.style.opacity = "0%";

    registerButton.style.marginLeft = "0px"
    registerButton.style.opacity = "100%";

    buttonBox.style.left = "50%";
}

function login() {
    loginButton.style.opacity = "100%";

    registerButton.style.marginLeft = "1000px"
    registerButton.style.opacity = "0%";

    buttonBox.style.left = "0";
}



document.querySelector("#regis").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email_sign").value;
    const password = document.querySelector("#password_sign").value;
    const thisCity = document.querySelector("#cityInput").value;
    const model = document.querySelector("#inputType-carInput").value;


    firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredential => {
        const user = userCredential.user;
        localStorage.setItem("currentUid", user.uid);
        db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
            name: user.displayName,                    //"users" collection
            email: user.email,                         //with authenticated user's ID (user.uid)
            est_time: "00:00",
            car: model,
            city: thisCity                     //with authenticated user's ID (user.uid)
        }).then(function setDefaultSettings() {
            db.collection("users").doc(user.uid).collection("charge_info").doc("is_charging").set({ is_charging: false });
        }).then(function () {
            console.log("New user added to firestore");
            window.location.assign("main.html");       //re-direct to main.html after signup
        }).catch(function (error) {
            console.log("Error adding new user: " + error);
        });
    }
    )
})

document.querySelector("#logi").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email_login").value;
    const password = document.querySelector("#password_login").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            window.location.assign("main.html");
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode);

             if (errorCode == "auth/user-not-found") {
                alert("There's no account for this email!");
             } else if(errorCode == "auth/wrong-password") {
                alert("Wrong password!");
             } else {
                alert("Error in logging in!");
             }
            
            document.querySelector("#email_login").value = "";
            document.querySelector("#password_login").value = "";
        });
})



// function createNewAcc() {
//     const email = document.querySelector("#username").value;
//     const password = document.querySelector("#password").value;

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in
//             var user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             // ..
//         });

//     location.href = "main.html";
// }