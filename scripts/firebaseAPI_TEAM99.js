//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {

    apiKey: "AIzaSyAQs1VtRAYVZCc_JzqLQcn_8XF0Y2A99GE",
    authDomain: "bby24-244e2.firebaseapp.com",
    projectId: "bby24-244e2",
    storageBucket: "bby24-244e2.appspot.com",
    messagingSenderId: "139275493161",
    appId: "1:139275493161:web:a63898d208c973600a2138"

};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();