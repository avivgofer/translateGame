import React, { Component } from 'react';
import Game from './components/Game'
import Header from './components/Header'
import Login from   './components/Login'
import Firebase from  "./firebaseConfig";
import "firebase/auth";
import './App.css'
import './App'; 
import 'antd/dist/antd.css';

// const firebaseConfig = {
//   apiKey: "AIzaSyAxMPS-pkN9GKcGAar-7CCcUXdF5VrJ4_g",
//   authDomain: "translate-game-e1903.firebaseapp.com",
//   databaseURL: "https://translate-game-e1903.firebaseio.com",
//   projectId: "translate-game-e1903",
//   storageBucket: "",
//   messagingSenderId: "256560660277",
//   appId: "1:256560660277:web:58d6c7ded7e33467"
// };

// export const Firebase = firebase.initializeApp(firebaseConfig);


//  const isConnected = () => {
//   Firebase.au
// }
var isConnect = async () => (!!Firebase.auth().currentUser);
var isLogged = false;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false  }
   
  }
  
  
  render() {

Firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if(!this.state.isLogin)
    this.setState({isLogin:true})

  } else {
    if(this.state.isLogin)
    this.setState({isLogin:false})
  }
})
    return (
      <div className="App">
      {/* {console.log(Firebase.auth().currentUser)}
      {console.log(this.isLogged)}
      {console.log(this.isConnect)} */}
      {console.log(this.state.isLogin)}
      <Header />
     {
       (this.state.isLogin)
       ?
       <Game/>
       :
       <Login/>
     }  
     </div>
    );
  }
}

export default App;
