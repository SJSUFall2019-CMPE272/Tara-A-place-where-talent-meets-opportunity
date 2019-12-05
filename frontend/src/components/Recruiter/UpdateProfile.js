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
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    contact: {
      phone: ["", ""]

    },
    formError: false
  };

  componentDidMount() {
    axios
      .get(`${util.BASE_URL}/recruiter/${localStorage.getItem("id")}`)
      .then(res => {
        let prevState = this.state;
        console.log(res.data);
        console.log(prevState)
        Object.assign(prevState, res.data[0]);
        this.setState({
          name: prevState.name,
          email: prevState.email,

        });
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
      experience: [...prevState.experience, { role: "", project_name: "", project_type: "", description: "" }],
    }));
  }

  experienceHandleChange = (e) => {
    if (["role", "project_name", "project_type", "description"].includes(e.target.className)) {
      let experience = [...this.state.experience]
      experience[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ experience }, () => console.log(this.state.experience))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
    console.log(this.state.experience)
  }

  //END--Experience Form methods


  getfirstName = e => {
    let username = e.target.value;
    let name = this.state.name;
    name.firstName = username;
    this.setState({
      name: name
    });
    console.log(this.state.name);
  };

  getlastName = e => {
    let username = e.target.value;
    let name = this.state.name;
    name.lastName = username;
    this.setState({
      name: name
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




  //send the form
  submitForm = e => {
    const data = {
      name: { ...this.state.name },
      contact: { ...this.state.contact },
      email: this.state.email,


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
      console.log(`data: {
                name: ${this.state.name},
                contact: ${this.state.contact},
                email: ${this.state.email}
                

            }`);

      console.log("form sent");
      axios.post(`${util.BASE_URL}/recruiter/${localStorage.getItem("id")}`, data).then(res => alert("profile updated"));

    }
  };

  render() {
    return (
      <>
        <Navbar />

        <main className='jobdetail'>
          <FormControl>
            <div className="col-sm-12">
              <TextField
                required
                id="standard-required"
                label="First Name"
                value={this.state.name.firstName}
                className={useStyles.textField}
                margin="normal"
                onChange={this.getfirstName}
              />
              <TextField
                required
                id="standard-required"
                label="Last Name"
                value={this.state.name.lastName}
                className={useStyles.textField}
                margin="normal"
                onChange={this.getlastName}
              />
            </div>


            <div className="col-sm-12">
              <TextField
                required
                id="standard-required"
                label="Email ID"
                value={this.state.email}
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
              style={{marginRight:"20px"}}
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
        </main>
      </>
    );
  }
}

export default UpdateProfile;
