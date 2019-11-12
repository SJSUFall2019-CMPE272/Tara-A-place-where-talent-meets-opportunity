import React, { Component, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import "bootstrap/dist/css/bootstrap.min.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ChipInput from 'material-ui-chip-input';

import Navbar from "./Navbar";

import "./CreateForm.css";


import ExperienceForm from "./ExperienceForm";

//Experience form 




const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
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
    }


    // blankExp = { name: '', age: '' };

    // [ExpState, setExpState] : useState([
    //         { ...blankExp },
    //     ]);




    //  Experiences = () => {
    //     const [ExpState, setExpState] = useState([
    //         { name: '', age: '' },
    //     ]);
    // }


    // addExperience = () => {
    //     setExpState([...ExpState, { ...blankExp }]);
    // };

    // handleExpChange = (e) => {
    //     const updatedExperiences = [...ExpState];
    //     updatedExperiences[e.target.dataset.idx][e.target.className] = e.target.value;
    //     setExpState(updatedExperiences);
    // };


    getName = (e) => {
        let username = e.target.value;
        this.setState({
            name: this.name + username
        });
        console.log(this.state.name);
    }

    getPrimaryPhone = (e) => {
        let phone = e.target.value;
        this.setState({
            primarynumber: phone
        });
        console.log(this.state.primarynumber);
    }

    getSecondaryPhone = (e) => {
        let phone = e.target.value;
        this.setState({
            secondarynumber: phone
        });
        console.log(this.state.primarynumber);
    }


    getEmail = (e) => {
        let userEmail = e.target.value;
        if (userEmail.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
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
    }


    getGender = (e) => {
        let gender = e.target.value;
        this.setState({
            gender: gender
        });
        console.log(this.state.gender);
    }

    getDescription = (e) => {
        let userMessage = e.target.value;
        this.setState({
            message: userMessage
        });
        console.log(this.state.message);
    }

    getState = (e) => {
        let state = e.target.value;
        this.setState({
            state: state
        });
        console.log(this.state.state);
    }

    getZipcode = (e) => {
        let zip = e.target.value;
        this.setState({
            zipcode: zip
        });
        console.log(this.state.zipcode);
    }


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
        console.log(this.state.skillset)
    };

    handleChange = evt => {
        this.setState({
            value: evt.target.value,
            error: null
        });
        console.log(this.state.skillset)
    };

    handleDelete = item => {
        let arr = this.state.skillset
        arr = arr.filter(i => i !== item)
        this.setState({
            skillset: arr
        });
        console.log(this.state.skillset)
    };

    //send the form
    submitForm = (e) => {
        e.preventDefault();

        if (this.state.name === "" || this.state.email === "") {
            this.setState({
                formError: true
            })
            return false;
        } else {
            this.setState({
                formError: false
            })
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
                

            }`)

            console.log("form sent")

        }

    }


    render() {
        return (
            <form>
                <Navbar />
                <div>
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

                <div>
                    <br></br>
                    <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        onChange={this.getGender}
                    >
                        <MenuItem value="Gender">
                        </MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                </div>



                <div>
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
                <div>
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

                <div>
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
                    {/* <ChipInput
                        defaultValue={['foo', 'bar']}
                        label='Skills'
                        placeholder='Type and press enter to add'
                        value={this.state.skillset}
                        onAdd={() => (chip) => this.handleAddSkill(chip)}
                        onDelete={() => (chip) => this.handleDeleteSkill(chip)}
                    /> */}





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
                        <div className="tag-item" key={item}>
                            {item}
                            <button
                                type="button"
                                className="button"
                                onClick={() => this.handleDelete(item)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>




                {/* 
                <h2>Experience stuff</h2> */}

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


                <div>
                    <Button variant="contained" color="primary" className={useStyles.button} type="submit" name="submit" value="Send" onClick={this.submitForm}>
                        Submit
                     </Button>

                </div>
                <br></br>



            </form>




        );
    }

}




export default CreateForm;
