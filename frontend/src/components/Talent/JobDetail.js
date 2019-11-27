import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import util from "../../utils";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

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
        <Fab variant="extended" onClick={toggle} size="medium" color="primary" aria-label="add" className={useStyles.margin}>
            {isToggledOn ? 'UNMATCH' : 'MATCH'}
        </Fab>
    )
}



export default class JobDetail extends Component {
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
            <main>
                 {/* <div className="col-sm-12">
                <label style={labelstyles}>Something</label>
                <p>{this.state.opportunity.label}</p>
            </div> */}
           
            <div className="col-sm-12">
                <label style={labelstyles}>Description</label>
                <p>{this.state.opportunity.description}</p>
            </div>
            <div className="col-sm-12">
                <label style={labelstyles}>Project Name</label>
                <p>{this.state.opportunity.project_name}</p>
            </div>
            <div className="col-sm-12">
                <label style={labelstyles}>Project Type</label>
                <p>{this.state.opportunity.project_type}</p>
            </div>
        {
            this.state.opportunity.required_skills && <div className="col-sm-12">
                <label style={labelstyles}>Required Skills</label>
                {this.state.opportunity.required_skills.map(skill => <p>{skill}</p>)}
            </div>
        }
        {
            this.state.opportunity.gender && <div className="col-sm-12">
                <label style={labelstyles}>Gender</label>
                {this.state.opportunity.gender}
            </div>
        }
        {
            this.state.opportunity.location && <div className="col-sm-12">
                <label style={labelstyles}>Address</label>
                <p>
                    {this.state.opportunity.location.street}
                </p>
                <p>
                    {this.state.opportunity.location.city}
                </p>
                <p>
                    {this.state.opportunity.location.state}
                </p>
            </div>
            
        }
         <div className={useStyles.heroButtons}>
                                <Grid container spacing={2} justify="center">

                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            <Link to="/matchedjobs">Show matched jobs</Link>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            <Link to="/home">Home</Link>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
        </main>
        
    );
    }
}


