import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAxMPS-pkN9GKcGAar-7CCcUXdF5VrJ4_g",
    authDomain: "translate-game-e1903.firebaseapp.com",
    databaseURL: "https://translate-game-e1903.firebaseio.com",
    projectId: "translate-game-e1903",
    storageBucket: "",
    messagingSenderId: "256560660277",
    appId: "1:256560660277:web:58d6c7ded7e33467"
  };

  export default firebase.initializeApp(firebaseConfig);