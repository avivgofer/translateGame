import React, { Component } from 'react'
import {message } from 'antd';
import '../css/Login.css'
import Firebase from  "../firebaseConfig";
// import * as firebaseApp from 'firebase/app';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false , toRegister: false }
   
  }


 register(event){ 
      event.preventDefault()
      const email = this.emailInput.value;
      const password = this.passwordInput.value;
      const firstName = this.firstNameInput.value;
      const lastName = this.lastNameInput.value;
      //const firebase = firebaseApp.initializeApp(firebaseConfig);
      if(email,password,firstName,lastName){
        Firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        }).then(
          (res) =>
          {
            console.log(res)
            let user =  Firebase.auth().currentUser;
            user.updateProfile({
              displayName: firstName + " " + lastName
            }).then(function() {
              // Update successful.
            }).catch(function(error) {
              // An error happened.
            })
          });
      }else{
        message.error(`something missing! `);
      }
        
      
  }



 
  authWithIdAndPassword(event){
     event.preventDefault()
     const email = this.emailInput.value
     const password = this.passwordInput.value
     Firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      }).then((res) => console.log(res));

//     const requestOptions = {
//       method: 'POST',
//       url: '/users/signin',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: {
//         identityNumber: IDNumber,
//         password: password 
//       }
//   }
    
//       axios(requestOptions).then(res => {
//         if(res.status == 200 && res.data.token){
//           console.log(res);
//           localStorage.setItem('token', JSON.stringify(res.data.token));
//           localStorage.setItem('permission', JSON.stringify(res.data.permission));
//            window.location.reload();
//         }
//       })
//       .catch(err => {
//           debugger
//           message.error(`wrong password/ID! `);
//       })
  }

 
  
  // authWithEmailPassword(event) {
  //   event.preventDefault()
  //   const email = this.emailInput.value
  //   const password = this.passwordInput.value

  //   app.auth().fetchSignInMethodsForEmail(email)
  //     .then((providers) => {
  //       if (providers.length === 0) {
  //         // create user
  //       //   return app.auth().createUserWithEmailAndPassword(email, password).then(res => {
  //           message.error(`wrong password/email ! `);
  //       } else if (providers.indexOf("password") === -1) {
  //         // they used facebook
  //         message.error(`something went wrong ! `);
  //       } else {
  //         // sign user in
       
  //        return app.auth().signInWithEmailAndPassword(email, password)
  //       }
  //     })
  //     .then((user) => {
  //       if (user && user.email) {
  //         this.loginForm.reset()
  //         this.setState({redirect: true , user: user})
  //         this.props.history.push('/')
  //         console.log(this.state);
       
  //       }
  //     })
  //     .catch((error) => {
  //       this.toaster.show({ intent: Intent.DANGER, message: error.message })
  //     })
  // }

  render() {
    return (
      (!this.state.toRegister)
       ?
      <div className='loginContainer'>
        <div className="login-page">
        <div className="form">
                <form className="login-form" onSubmit={(event) => { this.authWithIdAndPassword(event) }} 
                ref={(form) => { this.loginForm = form }}>
                <input name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"/>
                <input name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"/>
                <button type='submit' className='marginBottom'>login</button>
                <button type='button' onClick={() => this.setState({toRegister : true})}>register</button>
            </form>
        </div>
        </div>
      </div>
      :
      <div className='loginContainer'>
        <div className="login-page">
        <div className="form">
                <form className="login-form" onSubmit={(event) => { this.register(event) }} 
                ref={(form) => { this.loginForm = form }}>
                <input name="firstName" type="string" ref={(input) => { this.firstNameInput = input }} placeholder="first name"/>
                <input name="lastName" type="string" ref={(input) => { this.lastNameInput = input }} placeholder="last name"/>
                <input name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="email"/>
                <input name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="password"/>
                <input name="passwordValid" type="password" ref={(input) => { this.passwordValidInput = input }} placeholder="password validation"/>
                <button type='submit' className='marginBottom'>register</button>
                <button type='button'  onClick={() => this.setState({toRegister : false})}>login</button>
            </form>
        </div>
        </div>
      </div>
    )
  }
}

    export default Login;
