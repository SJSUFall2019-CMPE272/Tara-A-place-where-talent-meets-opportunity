import React, { Component } from 'react';
import axios from 'axios';
import util from "../../utils";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Navbar from "../Navbar";

import '../Talent/JobDetails.css'

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    hearticon: {
        color: 'red',
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));


const Toggle = () => {
    const [isToggledOn, setToggle] = React.useState(false)
    const toggle = () => setToggle(!isToggledOn)
    return (
        <Fab variant="extended" onClick={toggle} size="medium" color="primary" aria-label="add" position="center-bottom" className={useStyles.margin}>
            {isToggledOn ? 'UNMATCH' : 'MATCH'}
        </Fab>
    )
}







class TalentDetail extends Component {
    constructor(props) {
        super(props);


        this.state = {
            error: "",
            talent: {}
        }
    }




    componentDidMount = () => {
        axios
            .get(`${util.BASE_URL}/talent/` + this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({ talent: res.data[0], error: "" })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err.response.data.message }
                )
            });
    }



    render() {
        const labelstyles = {
            fontSize: '20px',
            fontWeight: 400
        }
        return (
            <>
                <Navbar />
                <main className='jobdetail'>
                    <div className="col-sm-12">
                        <label style={labelstyles}>Email</label>
                        <p>{this.state.talent.email}</p>
                    </div>
                    <div className="col-sm-12">
                        <label style={labelstyles}>Gender</label>
                        <p>{this.state.talent.gender}</p>
                    </div>
                    <div>
                        {this.state.talent.experience &&
                            <div className="col-sm-12">
                                <label style={labelstyles}>Experience</label>
                                {this.state.talent.experience.map(exp =>
                                    <div>
                                        <div className="col-sm-12">
                                            <label style={labelstyles}>Project Name</label>
                                            <p>{exp.projectName}</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label style={labelstyles}>Project Type</label>
                                            <p>{exp.projectType}</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label style={labelstyles}>Description</label>
                                            <p>{exp.description}</p>
                                        </div>
                                        <div className="col-sm-12">
                                            <label style={labelstyles}>Role</label>
                                            <p>{exp.role}</p>
                                        </div>
                                    </div>)}
                            </div>
                        }
                    </div>
                    {this.state.talent.gender && <div className="col-sm-12">
                        <label style={labelstyles}>Gender</label>
                        <p>{this.state.talent.gender}</p>
                    </div>}
                    {this.state.talent.location && <div className="col-sm-12">
                        <label style={labelstyles}>Address</label>
                        <p>
                            {this.state.talent.location.street}
                        </p>
                        <p>
                            {this.state.talent.location.city}
                        </p>
                        <p>
                            {this.state.talent.location.state}
                        </p>
                    </div>}
                    <div className={useStyles.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                                {/* <Toggle /> */}
                                <Fab variant="extended" size="medium" color="primary" aria-label="add" position="center-bottom" className={useStyles.margin}> Match</Fab>

                                <Fab variant="extended"  size="medium" color="primary" aria-label="add" position="center-bottom" className={useStyles.margin}>
                                    <Link style={{color:"#FFF"}} to="/recruiterhome">Back</Link>
                                </Fab>
                            </Grid>
                        </Grid>
                    </div>
                </main>
            </>
        );
    }
}
export default TalentDetail;

