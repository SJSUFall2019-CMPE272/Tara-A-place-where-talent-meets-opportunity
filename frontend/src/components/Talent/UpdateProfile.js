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
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Navbar from "../Navbar";
import Divider from '@material-ui/core/Divider';
import util from "../../utils";
import "./CreateForm.css";
import axios from "axios";


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
      lastName: ""
    },
    email: "",
    message: "",
    gender: "",
    contact: {
      phone: ["", ""]
    },
    address: {
      zip: "",
      add_state: "",
      street: []
    },
    skills: [],
    value: "",
    ExpState: [],
    experience: [{
      role: "",
      projectName: "",
      projectType: "",
      description: "",
    }],
    media: {
      hyperlinks: [""],
      files: [""],
      resume: ""
    },
    formError: false
  };

  componentDidMount() {
    axios
      .get(`${util.BASE_URL}/talent/${localStorage.getItem("id")}`)
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
      experience: [...prevState.experience, { role: "", projectName: "", projectType: "", description: "" }],
    }));
  }

  experienceHandleChange = (e) => {
    if (["role", "projectName", "projectType", "description"].includes(e.target.className)) {
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
    let username = { ...this.state.name };
    username[e.target.name] = e.target.value;
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

  getGender = e => {
    let gender = e.target.value;
    this.setState({
      gender: gender
    });
    console.log(this.state.gender);
  };

  getAddress = e => {
    let address = this.state.state.address;
    address[e.target.name] = e.target.value;
    this.setState({
      address: address
    });
    console.log(this.state.address);
  };

  handleKeyDown = evt => {
    if (["Enter", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value) {
        this.setState({
          skills: [...this.state.skills, this.state.value],
          value: ""
        });
      }
    }
    console.log(this.state.skills);
  };

  handleChange = evt => {
    console.log("I am here");
    console.log(evt);
    this.setState({
      value: evt.target.value,
      error: null
    });
    console.log(this.state.skills);
  };

  handleDelete = item => {
    let arr = this.state.skills;
    arr = arr.filter(i => i !== item);
    this.setState({
      skills: arr
    });
    console.log(this.state.skills);
  };

  //send the form
  submitForm = e => {
    const data = {
      name: { ...this.state.name },
      gender: this.state.gender,
      contact: { ...this.state.contact },
      email: this.state.email,
      skills: this.state.skills,
      address: { ...this.state.address },
      experience: [...this.state.experience],
      media: { ...this.state.media }
    }
    e.preventDefault();

    if (this.state.name.firstName && this.state.name.LastName && this.state.name.firstName === "") {
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
                contact_info: ${this.state.contact},
                email: ${this.state.email},
                skills:  ${this.state.skills}
                state : ${this.state.address},
                experience:[${this.state.experience}],
            media : {
                }
                

            }`);

      console.log("form sent");
      axios.post(`${util.BASE_URL}/talent/${localStorage.getItem("id")}`, data).then(res => alert("profile updated"));
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
              label="First Name"
              name="firstName"
              value={this.state.name.firstName}
              className={useStyles.textField}
              margin="normal"
              onChange={this.getName}
            />
            <TextField
              required
              id="standard-required"
              label="Last Name"
              value={this.state.name.lastName}
              className={useStyles.textField}
              margin="normal"
              name="lastName"
              onChange={this.getName}
            />
          </div>

          <div className="col-sm-6">
            <FormControl margin="normal" component="fieldset" className={useStyles.formControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.getGender}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="col-sm-8">
            <TextField
              required
              id="standard-required"
              label="Email ID"
              value={this.state.email}
              className={useStyles.email}
              margin="normal"
              disabled
            />
          </div>
          <div className="col-sm-8">
            <TextField
              required
              id="standard-required"
              label="State"
              value={this.state.address.add_state}
              className={useStyles.textField}
              margin="normal"
              name="add_state"
              onChange={this.getAddress}
            />
          </div>

          <div className="col-sm-8">
            <TextField
              required
              id="standard-required"
              label="zip"
              value={this.state.address.zip}
              className={useStyles.textField}
              margin="normal"
              name="zip"
              onChange={this.getAddress}
            />
          </div>

          <div className="col-sm-6">
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

          <div className="col-sm-6">
            <TextField
              id="standard"
              label="Secondary Contact"
              value={this.state.contact.phone[1]}
              className={useStyles.textField}
              margin="normal"
              onChange={this.getSecondaryPhone}
            />
          </div>

          <div className="col-sm-6">
            <TextField
              fullWidth
              className="col-sm-6"
              id="standard"
              label="Skills"
              className={useStyles.textField}
              value={this.state.value}
              margin="normal"
              placeholder="Type and press enter to add"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
            />

            {this.state.skills.map(item => (
              <div className="col-sm-6" key={item}>
                {item}
                <Button color="primary" size="small" onClick={() => this.handleDelete(item)} >
                  x
                </Button>
              </div>
            ))}
          </div>

          <div className="col-sm-12">
            <form onChange={this.experienceHandleChange} >
              <Button
                variant="contained"
                color="primary"
                className={useStyles.button}
                type="submit"
                name="submit"
                value="Send"
                onClick={this.addExperience}
              >
                Add Experience
              <AddIcon />
              </Button>

              {
                this.state.experience.map((val, idx) => {
                  let RoleId = `Role-${idx}`
                  let ProjectId = `Project-${idx}`
                  let ProjectTypeId = `ProjectType-${idx}`
                  let DescriptionId = `DescriptionId-${idx}`
                  return (
                    <>
                      <div className="col-sm-12 row my-auto" key={idx}>
                        {/* <label className="col-sm-12">{`Experience #${idx + 1}`}</label> */}


                        <h5>{`Experience`} <span class="badge badge-secondary">{idx + 1}</span></h5>
                        <div className="col-sm-12">
                          <label>Role:</label>
                          {/* <TextField fullWidth name={RoleId}className="col-sm-6" label="Role">  */}
                          <input
                            type="text"
                            name={RoleId}
                            data-id={idx}
                            id={RoleId}
                            value={this.state.experience[idx].role}
                            className="role"

                          />
                          {/* </TextField> */}
                        </div>

                        <div className="col-sm-12">
                          <label>Project Name:</label>
                          {/* <TextField fullWidth className="col-sm-6" label="Project name">  */}
                          <input
                            type="text"
                            name={ProjectId}
                            data-id={idx}
                            id={ProjectId}
                            value={this.state.experience[idx].projectName}
                            className="projectName"
                          />
                          {/* </TextField> */}
                        </div>

                        <div className="col-sm-12">
                          <label>Project Type:</label>
                          {/* <TextField fullWidth className="col-sm-6" label="Project Type">  */}
                          <input
                            type="text"
                            name={ProjectTypeId}
                            data-id={idx}
                            id={ProjectTypeId}
                            value={this.state.experience[idx].projectType}
                            className="projectType"
                          />
                          {/* </TextField> */}
                        </div>

                        <div className="col-sm-12">
                          <label>Description</label>
                          {/* <TextField fullWidth className="col-sm-6" label="Description" multiline rows="3">  */}
                          <input
                            multiline rows="3"
                            type="text"
                            name={DescriptionId}
                            data-id={idx}
                            id={DescriptionId}
                            value={this.state.experience[idx].description}
                            className="description"
                          />
                          {/* </TextField> */}

                        </div>


                      </div>
                      <Divider />
                    </>
                  )
                })
              }
            </form>
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

export default UpdateProfile;

