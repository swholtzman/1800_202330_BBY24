var loginButton = document.getElementById("login personalInfoFields");
var registerButton = document.getElementById("register");
var buttonBox = document.getElementById("btn");


/** Runs when the register top bar is clicked */
function register() {
    loginButton.style.opacity = "0%";

    registerButton.style.marginLeft = "0px"
    registerButton.style.opacity = "100%";

    buttonBox.style.left = "50%";
}

/** Runs when the login top bar is clicked */
function login() {
    loginButton.style.opacity = "100%";

    registerButton.style.marginLeft = "1000px"
    registerButton.style.opacity = "0%";

    buttonBox.style.left = "0";
}


/** Registers an account in firebase and stores the basic info. */
document.querySelector("#registration").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email_sign").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password_sign").value;
    const thisCity = document.querySelector("#cityInput").value;
    const model = document.querySelector("#inputType-carInput").value;


    firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredential => {
        const user = userCredential.user;
        localStorage.setItem("currentUid", user.uid);
        db.collection("users").doc(user.uid).set({        
            name: username,                    
            email: email,                       
            est_time: "00:00",
            car: model,
            city: thisCity                     
        }).then(function setDefaultSettings() {
            db.collection("users").doc(user.uid).collection("charge_info").doc("is_charging").set({ is_charging: false });
        }).then(function () {
            window.location.assign("index.html");       
        }).catch(function (error) {
            alert("Error adding new user: " + error);
        });
    }
    )
})

/**Logs the user into firebase, also sends alerts if an error occurs.*/
document.querySelector("#login").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email_login").value;
    const password = document.querySelector("#password_login").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            localStorage.setItem("currentUid", user.uid);
            window.location.assign("index.html");
        })
        .catch((error) => {
            var errorCode = error.code;

             if (errorCode == "auth/user-not-found") {          //no account with the email inputed
                alert("There's no account for this email!");
             } else if(errorCode == "auth/wrong-password") {    //wrong password inputed
                alert("Wrong password!");
             } else {
                alert("Error in logging in!");
             }
            
            document.querySelector("#email_login").value = "";
            document.querySelector("#password_login").value = "";
        });
})
