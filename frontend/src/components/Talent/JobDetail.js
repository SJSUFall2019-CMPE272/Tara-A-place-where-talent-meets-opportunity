import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import util from "../../utils";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ToggleButton from '@material-ui/lab/ToggleButton';
import './JobDetails.css'
import Navbar from "../Navbar";

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




class JobDetail extends Component {
    constructor(props) {
        super(props);


        this.state = {
            error: "",
            showDetailsModal: false,
            opportunity: {}
        }
    }




    componentDidMount = () => {
        axios
            .get(`${util.BASE_URL}/opportunities/` + this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({ opportunity: res.data[0], error: "" })
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


                    <div size="medium" color="primary" aria-label="add" className={useStyles.margin}>
                        <h1><label style={labelstyles}>Job Title</label></h1>
                        <p>{this.state.opportunity.title}</p>
                    </div>

                    <div className={useStyles.heroContent}>
                        <label style={labelstyles}>Description</label>
                        <p>{this.state.opportunity.description}</p>
                    </div>

                    <div className={useStyles.cardContent}>
                        <label style={labelstyles}>Project Name</label>
                        <p>{this.state.opportunity.project_name}</p>
                    </div>

                    <div className={useStyles.margin}>
                        <label style={labelstyles}>Project Type</label>
                        <p>{this.state.opportunity.project_type}</p>
                    </div>

                    <div>  {
                        this.state.opportunity.required_skills && <div className={useStyles.margin}>
                            <label style={labelstyles}>Required Skills</label>
                            {this.state.opportunity.required_skills.map(skill => <p>{skill}</p>)}
                        </div>
                    }</div>

                    <div> {
                        this.state.opportunity.gender && <div >
                            <label style={useStyles.heroContent} >Gender</label>
                            <p>{this.state.opportunity.gender}</p>
                        </div>
                    }
                    </div>
                    <div>{
                        this.state.opportunity.location && <div className={useStyles.heroContent}>
                            <h1>  <label style={labelstyles} color='primary'>Address</label>    </h1>

                            <p>
                                {this.state.opportunity.location.street}
                            </p>
                            <p className={useStyles.marginRight}>
                                {this.state.opportunity.location.city}
                            </p>
                            <p>
                                {this.state.opportunity.location.state}
                            </p>

                        </div>
                    }
                    </div>
                    <Grid container spacing={2} >
                        <Grid item>
                            <Toggle />
                            <Button variant="outlined" color="primary">
                                {localStorage.getItem("type") == "talent" ?
                                    <Link to="/home">Back</Link> :
                                    <Link to="/recruiterhome">Back</Link>
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </main>
            </>
        );
    }

}

export default JobDetail;



