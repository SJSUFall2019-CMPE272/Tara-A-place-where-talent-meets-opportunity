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

import Navbar from "./Navbar";

import "./CreateForm.css";

import ExperienceForm from "./ExperienceForm";
import Skillset from "./Skillset";

//Experience form

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

class CreateForm extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    gender: "",
    secondarynumber: "",
    primarynumber: "",
    zipcode: "",
    state: "",
    skillset: [],
    value: "",
    formError: false
  };


  getName = e => {
    let username = e.target.value;
    this.setState({
      name: username
    });
    console.log(this.state.name);
  };

  getPrimaryPhone = e => {
    let phone = e.target.value;
    this.setState({
      primarynumber: phone
    });
    console.log(this.state.primarynumber);
  };

  getSecondaryPhone = e => {
    let phone = e.target.value;
    this.setState({
      secondarynumber: phone
    });
    console.log(this.state.primarynumber);
  };


  getEmail = e => {
    let userEmail = e.target.value;
    if (
      userEmail.match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      )
    ) {
      this.setState({
        email: userEmail
      });
    } else {
      this.setState({
        email: ""
      });
      console.log("Incorrect Email, must match Expression");
    }
    console.log(this.state.userEmail);
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
      message: userMessage
    });
    console.log(this.state.message);
  };

  getState = e => {
    let state = e.target.value;
    this.setState({
      state: state
    });
    console.log(this.state.state);
  };

  getZipcode = e => {
    let zip = e.target.value;
    this.setState({
      zipcode: zip
    });
    console.log(this.state.zipcode);
  };

  handleKeyDown = evt => {
    if (["Enter", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value) {
        this.setState({
          skillset: [...this.state.skillset, this.state.value],
          value: ""
        });
      }
    }
    console.log(this.state.skillset);
  };

  handleChange = evt => {
    console.log("I am here");
    console.log(evt);
    this.setState({
      value: evt.target.value,
      error: null
    });
    console.log(this.state.skillset);
  };

  handleDelete = item => {
    let arr = this.state.skillset;
    arr = arr.filter(i => i !== item);
    this.setState({
      skillset: arr
    });
    console.log(this.state.skillset);
  };

  //send the form
  submitForm = e => {
    const UserData = {
      name: this.state.name,
                gender: this.state.gender,
                contact_info: {
                    contact_info1: this.state.primarynumber,
                    contact_info2: this.state.secondarynumber,
                },
                email: this.state.email,
                skills:  this.state.skillset,
                state : this.state.state,
                zipcode: this.state.zipcode,
                experience:[{
                    role:"",
                    project_name : "",
                    project_type: "",
                    description : ""
            }],
            media : {
                hyperlinks : [],
                    files : [],
                    resume: "",
                }
                

            }
    e.preventDefault();

    if (this.state.name === "" || this.state.email === "") {
      this.setState({
        formError: true
      });
      return false;
    } else {
      this.setState({
        formError: false
      });
      console.log(`UserData: {
                name: ${this.state.name},
                gender: ${this.state.gender},
                contact_info: {
                    contact_info1: ${this.state.primarynumber},
                    contact_info2: ${this.state.secondarynumber},
                },
                email: ${this.state.email},
                skills:  ${this.state.skillset}
                state : ${this.state.state},
                zipcode: ${this.state.zipcode},
                experience:[{
                    role:”String”,
                    project_name : "",
                    project_type: "",
                    description : ""
            }],
            media : {
                hyperlinks : [],
                    files : [],
                    resume: "",
                }
                

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
              label="Full Name"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getName}
            />
          </div>

          <div className="col-sm-6">
            <FormControl component="fieldset" className={useStyles.formControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.getGender}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="col-sm-6">
            <TextField
              required
              id="standard-required"
              label="Email ID"
              defaultValue=""
              className={useStyles.email}
              margin="normal"
              onChange={this.getEmail}
            />
          </div>
          <div className="col-sm-6">
            <TextField
              required
              id="standard-required"
              label="State"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getState}
            />
            <TextField
              required
              id="standard-required"
              label="Zipcode"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getZipcode}
            />
          </div>

          <div className="col-sm-6">
            <TextField
              required
              id="standard-required"
              label="Primary Contact"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getPrimaryPhone}
            />
            <TextField
              id="standard"
              label="Secondary Contact"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getSecondaryPhone}
            />
          </div>

          <div>
            <TextField
              id="standard"
              label="Skills"
              defaultValue=""
              className={useStyles.textField}
              value={this.state.value}
              placeholder="Type and press enter to add"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
            />

            {this.state.skillset.map(item => (
              <div key={item}>
                {item}
                <Button color="primary" size="small" onClick={() => this.handleDelete(item)} >
                  x
                </Button>
              </div>
            ))}
          </div>

          {/* <form>
                    <input
                        type="button"
                        value="Add New Experience"
                        onClick={this.addExperience}
                    />
                    {
                        ExpState.map((val, idx) => (
                            <ExperienceForm
                                key={`cat-${idx}`}
                                idx={idx}
                                ExpState={ExpState}
                                handleExpChange={this.handleExpChange}
                            />
                        ))
                    }
                    <input type="submit" value="Submit" />
                </form> */}

          <br></br>

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

export default CreateForm;

