import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {signup} from "../auth/helper"

const Signup = () => {

  const [values, setValues ] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const {name, email, password, error, success} = values;

  const handleChange = name => event => {
    setValues({...values, error:false, [name]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault()//do this
    setValues({...values, error: false})
    signup({name, email, password})
    .then(data => {
      console.log("-------data--------")
      console.log(data)
      if(data.errors){
        setValues({...values, error: data.errors, success:false})
      }else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        })
      }
    })
    .catch(err => {console.log("err")})
  }

  const successMessage = () => {
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success"
          style={{display: success ? "" : "none"}}
          >
            New account was created successfully. Please <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>)
  }

  const errorMessage = () => {
    return(
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger"
          style={{display: error ? "" : "none"}}
          >
            {error}
         </div>
        </div>
      </div>)
  }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
              onChange = {handleChange("name")}
              value = {name}
              className="form-control" type="text" />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
              onChange = {handleChange("email")}
              value = {email}
              className="form-control" type="email" />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
              onChange = {handleChange("password")}
              value = {password}
               className="form-control" type="password" />
            </div>
            <button onClick = {onSubmit} className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
}

export default Signup;
