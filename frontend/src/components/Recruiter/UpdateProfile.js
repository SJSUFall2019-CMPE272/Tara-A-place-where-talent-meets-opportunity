import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import util from "../../utils";
import axios from "axios";

import "./CreateForm.css";


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

class UpdateProfile extends Component {
  state = {
     name: "",
     email: "",
     contact: {
      phone: ["", ""]

    },
    formError: false
  };

  componentDidMount() {
    axios
      .get(`${util.BASE_URL}/recruiterhome/${localStorage.getItem("id")}`)
      .then(res => {
        let prevState = this.state;
        console.log(res.data);
        Object.assign(prevState, res.data[0]);
        this.setState({ state: prevState });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err.response.data.message })
      });
  }
  //START--Experience Form methods

  addExperience = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      experience: [...prevState.experience, {role:"", project_name:"",project_type:"",description:""}],
    }));
  }

  experienceHandleChange = (e) => {
    if (["role", "project_name","project_type","description"].includes(e.target.className) ) {
      let experience = [...this.state.experience]
      experience[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ experience }, () => console.log(this.state.experience))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
    console.log(this.state.experience)
  }

   //END--Experience Form methods


  getName = e => {
    let username = e.target.value;
    this.setState({
      name: username
    });
    console.log(this.state.name);
  };

  getPrimaryPhone = e => {
    let contact = { ...this.state.contact }
    contact.phone[0] = e.target.value;
    this.setState({
      contact: contact
    });
    console.log(this.state.contact);
  };

  getSecondaryPhone = e => {
    let contact = { ...this.state.contact }
    contact.phone[1] = e.target.value;
    this.setState({
      contact: contact
    });
    console.log(this.state.contact);
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
     
      contact: { ...this.state.contact },
      email: this.state.email,
      zipcode: this.state.zipcode,


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
                contact: ${this.state.contact},
                email: ${this.state.email}
                

            }`);

      console.log("form sent");
      axios.post(`${util.BASE_URL}/recruiter/${localStorage.getItem("id")}`, UserData).then(res => alert("profile updated"));

    }
  };

  render() {
    return (
      <>
        <Navbar />
        <FormControl>
          <div className="col-sm-12">
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

          <div className="col-sm-12">
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


          <div className="col-sm-12">
            <TextField
              required
              id="standard-required"
              label="Primary Contact"
              value={this.state.contact.phone[0]}
              className={useStyles.textField}
              margin="normal"
              onChange={this.getPrimaryPhone}
            />
            </div>

            <div className="col-sm-12">
            <TextField
              id="standard"
              label="Secondary Contact"
              value={this.state.contact.phone[1]}
              className={useStyles.textField}
              margin="normal"
              onChange={this.getSecondaryPhone}
            />
          </div>
   
          <div className="col-sm-12">
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
            <Button variant="outlined" color="primary">
                                            <Link to="/recruiterhome">Home</Link>
                                        </Button>
          </div>
          <br></br>
        </FormControl>
      </>
    );
  }
}

export default UpdateProfile;
