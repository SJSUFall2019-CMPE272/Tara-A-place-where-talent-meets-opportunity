import React, { Component } from "react";
import axios from "axios";
import util from "../utils";
import './styleSignUp.css';

class SignUp extends Component {
    state = {
        name : "",
        email : "",
        Password : "",
        Confirmpassword: false,
        formError: false
    };

getName = (e) =>{
  let username = e.target.value; 
  this.setState({
      name: username
  });
  console.log(this.state.name);
}


getEmail = (e) =>{
  let userEmail = e.target.value; 
  if(userEmail.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)){
    this.setState({
      email: userEmail
  });
    }else{
      this.setState({
        email: ""
    });
    console.log("Incorrect Email, must match Expression");
  }

  console.log(this.state.email);
}

getPassword= (e) =>{
  let password = e.target.value; 
  if(password ){
  this.setState({
    Password: password
  });
  console.log(this.state.Password);
}
};

getConfirmPassword= (e) =>{
  let confirmPassword = e.target.value; 
  console.log(confirmPassword);
  if(confirmPassword  == this.state.Password){
    this.setState({
      Confirmpassword: true
  });
  }else{
    this.setState({
      Confirmpassword: false
  });
  console.log("Incorrect password, must match with normal");
}
  console.log(this.state.Confirmpassword);
};

   //send the form

handleSubmit = e => {
  let data = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password
  };
    e.preventDefault();

    axios
      .post(`${util.BASE_URL}/signup`,data)
      .then(res => this.setState({ formError: res.data.messaage }))
      .catch(err => this.setState({formError: err.response.data.message}));
};
  render()  {
    
    return (
      <div className='wrapper'>
      <div className='form-wrapper'>
        <h2>Register</h2>
        {this.state.formError &&
                <p className="error">
                    Fill all the input fields please.
                </p>
              }
        <form>
          <div className='Name'>
            <label htmlFor="Name">Username</label>
            <input type='text' name='name' onChange={this.getName} required />
          </div>
          <div className='email'>
            <label htmlFor="email">Email</label>
            <input type='email' name='email' onChange={this.getEmail} required />
          </div>
          <div className='password'>
            <label htmlFor="password">Password</label>
            <input type='password' name='Password' onChange={this.getPassword} required />
          </div>
          <div className='Confirmpassword'>
            <label htmlFor="password">Confirm Password</label>
            <input type='password' name='Confirmpassword' onChange={this.getConfirmPassword} noValidate />
          </div>
          <div className='info'>
            <small>Password must be eight characters in length.</small>
          </div>
          <div className='submit'>
            <button onClick= {this.handleSubmit}> Create </button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}
export default SignUp;
