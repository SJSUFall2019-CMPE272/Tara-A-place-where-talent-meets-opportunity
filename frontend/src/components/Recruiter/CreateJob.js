import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from "react-router-dom";
import Button_ from "@material-ui/core/Button";

import axios from "axios";
import util from "../../utils";

import Navbar from "../Navbar";

import "./CreateJob.css";

import { number } from "prop-types";


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
    gender: "",
    age_range: "",
    description: "",
    required_skills: [],
    value: "",
    expiry_date: "",
    location: {
      lat: 0,
      lng: 0,
      address: "",
      zip: number,
      city: "",
      add_state: "",
    },
    ethnicity: [],
    project_name: "",
    project_type: "",
    required_documents: "",
    matches:[],
    formError: false
  };


  getName = e => {
    let jobtitle = e.target.value;
    this.setState({
      title: jobtitle
    });
    console.log(this.state.title);
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

  getrequired_documents = e => {
    let docs = e.target.value;
    this.setState({
      required_documents: docs
    });
    console.log(this.state.required_documents);
  }


  getDate = e => {
    let date = e.target.value;
    this.setState({
      expiry_date: date
    });
    console.log(this.state.expiry_date);
  };

  getLocation = e => {
    let Location = this.state.location;
    Location[e.target.name] = e.target.value;
    this.setState({
      location: Location
    });
    console.log(this.state.location);
  };



  getType = e => {
    let Type = e.target.value;
    this.setState({
      project_type: Type
    });
    console.log(this.state.project_type);
  };


  getProjectName = e => {
    let Name = e.target.value;
    this.setState({
      project_name: Name
    });
    console.log(this.state.project_name);
  }

  getAgeRange = e => {
    let Age = e.target.value;
    this.setState({
      age_range: Age
    });
    console.log(this.state.age_range);
  }


  handleKeyDown = evt => {
    if (["Enter", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value) {
        this.setState({
          required_skills: [...this.state.required_skills, this.state.value],
          value: ""
        });
      }
    }
    console.log(this.state.required_skills);
  };

  handleChange = evt => {
    console.log(evt);
    this.setState({
      value: evt.target.value,
      error: null
    });
    console.log(this.state.required_skills);
  };

  handleDelete = item => {
    let arr = this.state.required_skills;
    arr = arr.filter(i => i !== item);
    this.setState({
      required_skills: arr
    });
    console.log(this.state.required_skills);
  };

  getCoordinates = e => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address="${this.state.location.address}${this.state.location.city}+"&key=AIzaSyCwHAPMx05VRNJAcKwuhYafHFIaiexgxzw`)
      .then(res => res.json())
      // .then((result) => {console.log(result)})

      .then(
        (result) => {
          let lat = result.results[0].geometry.location.lat;
          let lng = result.results[0].geometry.location.lng;
          console.log(result.results[0].geometry.location.lat);
          console.log(result.results[0].geometry.location.lng);

          let location = { ...this.state.location };
          // console.log(location)
          // console.log(result.results[0].geometry.location.lat);
          location.lat = lat;
          location.lng = lng;
          // console.log(location)

          this.setState({
            location: location
          });
          console.log(this.state.location);
          const UserData = {
            title: this.state.title,
            gender: this.state.gender,
            age_range: this.state.age_range,
            description: this.state.description,
            required_skills: this.state.required_skills,
            expiry_date: this.state.expiry_date,
            ethnicity: [],
            project_name: this.state.project_name,
            project_type: this.state.project_type,
            required_documents: this.state.required_documents,
            location: this.state.location,
            created_by: localStorage.getItem("id"),
            matches: this.state.matches
          }
      
          e.preventDefault();
            axios
              .post(`${util.BASE_URL}/opportunities`, UserData)
              .then(res => this.setState({ auth: res.data.message }))
              .catch(err => this.setState({ auth: err.response.data.message }));
      
            console.log("form sent");




        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }

        



      )
  }





  //send the form
  submitForm = e => {

    
    }


  render() {
    return (
      <>
        <Navbar />
        <FormControl className="col-sm-12">
          <div className="col-sm-8">
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

          <div className="col-sm-8">
            <TextField
              required
              id="standard-required"
              label="Project Name"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getProjectName}
            />
          </div>

          <div className="col-sm-8">
            <TextField
              required
              id="standard-required"
              label="Project Type"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getType}
            />
          </div>

          <div className="col-sm-8">
            <TextField
              id="date"
              label="Expiry Date"
              type="date"

              onChange={this.getDate}
              className={useStyles.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>

          <div className="col-sm-4">
            <TextField
              fullWidth
              id="standard"
              label="Required Skills"
              defaultValue=""
              className={useStyles.textField}
              value={this.state.value}
              margin="normal"
              placeholder="Type and press enter to add"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
            />

            {this.state.required_skills.map(item => (
              <div key={item}>
                {item}
                <Button_
                  color="primary"
                  size="small"
                  onClick={() => this.handleDelete(item)}
                >
                  x
                </Button_>
              </div>
            ))}
          </div>

          <div className="col-sm-8">
            <TextField
              required
              id="standard-required"
              label="Age Range"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getAgeRange}
            />
          </div>


          <div className="col-sm-4">
            <TextField
              fullWidth
              required
              id="standard-required"
              label="Job Description"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getDescription}
            />
          </div>


          <div className="col-sm-4">
            <TextField
              fullWidth
              required
              id="standard-required"
              label="Required Documents"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              onChange={this.getrequired_documents}
            />
          </div>


          <div className="col-sm-4">
            <TextField
            fullWidth
              required
              id="standard-required"
              label="Address"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              name="address"
              onChange={this.getLocation}
            />
            </div>
            
            <div className="col-sm-4">

            <TextField
              required
              id="standard-required"
              label="City"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              name="city"
              onChange={this.getLocation}
            />

          </div>


          <div className="col-sm-8">
            <TextField
              required
              id="standard-required"
              label="State"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              name="add_state"
              onChange={this.getLocation}
            />

            <TextField
              required
              id="standard-required"
              label="Zip Code"
              defaultValue=""
              className={useStyles.textField}
              margin="normal"
              name="zip"
              onChange={this.getLocation}
            />
          </div>


          {/* <Button onClick={this.getCoordinates}>click</Button> */}

          <div className="col-sm-2">

          <Button size="lg" variant="info"
          size="lg"
              type="submit"
              name="submit"
              value="Send"
              onClick={this.getCoordinates}
            >
          <Link style={{ color: '#FFF' }} to="/opportunities"> 

          Submit
          </Link>

            </Button>

          </div>
          <br></br>
        </FormControl>
      </>
    );
  }
}

export default CreateJob;
