import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Navbar from "../Navbar";

import "./CreateJob.css";


const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  fab: {
    margin: theme.spacing(1),
  }
}));



class CreateJob extends Component {

  state = {
    title: "",
    type: "",
    gender: "",
    age: "",
    description: "",
    required_skillset: [],
    value: "",
    expiryDate: "",
    address: "",
    city: "",
    state: "",
    requiredZipcode: "",
    
    
    formError: false
  };


  getName = e => {
    let jobtitle = e.target.value;
    this.setState({
      jobTitle: jobtitle
    });
    console.log(this.state.jobTitle);
  };


  getGender = e => {
    let gender = e.target.value;
    this.setState({
      gender: gender
    });
    console.log(this.state.gender);
  };

  getDescription = e => {
    let userMessage = e.target.value;
    this.setState({
      description: userMessage
    });
    console.log(this.state.getDescription);
  };



  getZipcode = e => {
    let zip = e.target.value;
    this.setState({
        requiredZipcode: zip
    });
    console.log(this.state.requiredZipcode);
  };

  getDate = e => {
    let date = e.target.value;
    this.setState({
        expiryDate: date
    });
    console.log(this.state.expiryDate);
  };

  getState = e => {
    let State = e.target.value;
    this.setState({
      state: State
    });
    console.log(this.state.state);
  };

  getCity = e => {
    let City = e.target.value;
    this.setState({
      city: City
    });
    console.log(this.state.city);
  };

  getAddress = e => {
    let Address = e.target.value;
    this.setState({
      address: Address
    });
    console.log(this.state.address);
  };

  getType = e => {
    let Type = e.target.value;
    this.setState({
    type: Type
    });
    console.log(this.state.type);
  };



  handleKeyDown = evt => {
    if (["Enter", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value) {
        this.setState({
            required_skillset: [...this.state.required_skillset, this.state.value],
          value: ""
        });
      }
    }
    console.log(this.state.required_skillset);
  };

  handleChange = evt => {
    console.log(evt);
    this.setState({
      value: evt.target.value,
      error: null
    });
    console.log(this.state.required_skillset);
  };

  handleDelete = item => {
    let arr = this.state.required_skillset;
    arr = arr.filter(i => i !== item);
    this.setState({
        required_skillset: arr
    });
    console.log(this.state.required_skillset);
  };

  //send the form
  submitForm = e => {
   
    const UserData = {
      jobTitle: this.state.jobTitle,
      gender: this.state.gender,
      required_skillset: this.state.required_skillset,
      description: this.state.description,
      requiredZipcode: this.state.requiredZipcode,
      expiryDate: this.state.expiryDate,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      age: this.state.age,
      type: this.state.type
    }
    
    e.preventDefault();
    if (this.state.jobTitle === "" || this.state.description === "") {
      this.setState({
        formError: true
      });
      return false;
    } else {
      this.setState({
        formError: false
      });
      console.log(`UserData: {
                jobTitle: ${this.state.jobTitle},
                gender: ${this.state.gender},
                required_skillset: ${this.state.required_skillset},
                description: ${this.state.description},
                requiredZipcode: ${this.state.requiredZipcode},
                expiryDate: ${this.state.expiryDate}
                address: ${this.state.address},
                city: ${this.state.city},
              state: ${this.state.state},
                age: ${this.state.age},
                type: ${this.state.type}
            }`);

      console.log("form sent");
    }

  };

  render() {
    return (
      <>
        <Navbar />
        <FormControl>
          <div className="col-sm-6">
            <TextField
              required
              id="standard-required"
              label="Job Title"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getName}
            />
          </div>

          <div className="col-sm-6">
            <FormControl
              margin="normal"
              component="fieldset"
              className={useStyles.formControl}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={this.state.gender}
                onChange={this.getGender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>


          <div>
            <TextField
              required
              id="standard-required"
              label="Category"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getType}
            />
          </div>

          <div> 
          <TextField
            id="date"
            label="ExpiryDate"
            type="date"
           
            onChange={this.getDate}
            className={useStyles.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
          </div>

          <div className="col-sm-6">
            <TextField
              id="standard"
              label="Skills"
              defaultValue=""
              className={useStyles.textField}
              value={this.state.value}
              margin="normal"
              placeholder="Type and press enter to add"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
            />

            {this.state.required_skillset.map(item => (
              <div key={item}>
                {item}
                <Button
                  color="primary"
                  size="small"
                  onClick={() => this.handleDelete(item)}
                >
                  x
                </Button>
              </div>
            ))}
          </div>

          <div>
            <TextField
              required
              id="standard-required"
              label="Job Description"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getDescription}
            />
          </div>

          <div>
            <TextField
              required
              id="standard-required"
              label="Location"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getAddress}
            />


            <TextField
              required
              id="standard-required"
              label="State"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getState}
            />
          </div>
         

          <div>
            <TextField
              required
              id="standard-required"
              label="City"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getCity}
            />

            <TextField
              required
              id="standard-required"
              label="Zip Location"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getZipcode}
            />
          </div>


          
     

          <div className="col-sm-6">
            <Button
              variant="contained"
              color="primary"
              className={useStyles.button}
              type="submit"
              name="submit"
              value="Send"
              onClick={this.submitForm}
            >
              Submit
            </Button>
          </div>
          <br></br>
        </FormControl>
      </>
    );
  }
}

export default CreateJob;
