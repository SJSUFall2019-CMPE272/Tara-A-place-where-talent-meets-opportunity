import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card_ from 'react-bootstrap/Card';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../Navbar";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import util from "../../utils";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";


const Opportunity = props => (
    <Grid item xs={12} sm={6} md={4}>
        <Card_ className={useStyles.card}>
            <CardMedia
                className={useStyles.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
            />
            <CardContent className={useStyles.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.opportunity.title}
                </Typography>
                <Typography>
                    {props.opportunity.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Toggle />
                {/* <Button color="primary"> */}

                {/* </Button> */}
                <Button size="small" color="primary">
                    <Link to={"/jobdetail/" + props.opportunity.id}>View Details</Link>
                </Button>
            </CardActions>
        </Card_>
    </Grid>
)
const MatchedOpportunity = props => (
    <Grid item xs={12} sm={6} md={4}>
        <Card_ className={useStyles.card}>
            <CardMedia
                className={useStyles.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
            />
            <CardContent className={useStyles.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.opportunity.title}
                </Typography>
                <Typography>
                    {props.opportunity.description}
                </Typography>
            </CardContent>
            <CardActions>
                {/* <Button color="primary"> */}

                {/* </Button> */}
                <Button size="small" color="primary">
                    <Link to={"/jobdetail/" + props.opportunity.id}>View Details</Link>
                </Button>
            </CardActions>
        </Card_>
    </Grid>
)


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

class Matches extends Component {
    state = {
        opportunities: [],
        perfectopportunityList: [],
        yourMatchedopportunityList: [],
        pendingRequestopportunityList: [],
        error: "",
        showDetailsModal: false,
        opportunity: {}
    }

    componentDidMount = () => {
        let user_id = localStorage.getItem("id");
        let yourMatchedopportunityList = [];
        let perfectopportunityList = [];
        let pendingRequestopportunityList = [];
        axios
            .get(`${util.BASE_URL}/opportunities`)
            .then(res => {
                console.log(res.data);
                let opportunities = res.data;
                opportunities.forEach(element => {
                    let hasMatched = false;
                    let talentMatch = false;
                    let opportunityMatch = false;
                    if (element.matches && element.matches.length > 0) {
                        let allMatches = element.matches;
                        allMatches.forEach(data => {
                            console.log("checking talent id");
                            if (data.talent_id == user_id && data.talentMatch && data.opportunityMatch) {
                                console.log("this opportunity is matched");
                                hasMatched = true;
                            }
                            else if (data.talent_id == user_id && data.talentMatch) {
                                talentMatch = true;
                            }

                            else if (data.talent_id == user_id && data.oppurtunityMatch) {
                                opportunityMatch = true;
                            }

                        })
                    }
                    if (hasMatched == true) {
                        perfectopportunityList.push(element);
                        console.log("pushing in new array");
                    }
                    if (talentMatch == true) {
                        yourMatchedopportunityList.push(element);
                    }
                    if (opportunityMatch == true) {
                        pendingRequestopportunityList.push(element);
                    }
                })
                console.log("all unmatched oopo");
                this.setState({ perfectopportunityList: perfectopportunityList, yourMatchedopportunityList: yourMatchedopportunityList, pendingRequestopportunityList: pendingRequestopportunityList, error: "" })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err.response.data.message }
                )
            });
    }



    perfectopportunityList() {
        return this.state.perfectopportunityList.map(currentOpportunity => {
            return <Opportunity opportunity={currentOpportunity} key={currentOpportunity.id} />;
        })
    }

    yourMatchedopportunityList() {
        return this.state.yourMatchedopportunityList.map(currentOpportunity => {
            return <MatchedOpportunity opportunity={currentOpportunity} key={currentOpportunity.id} />;
        })
    }

    pendingRequestopportunityList() {
        return this.state.pendingRequestopportunityList.map(currentOpportunity => {
            return <MatchedOpportunity opportunity={currentOpportunity} key={currentOpportunity.id} />;
        })
    }

    render() {
        return (
            <>
                <Navbar />
                <Accordion defaultActiveKey="1">
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            PERFECT MATCH
                </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Grid container spacing={4}>
                                {this.perfectopportunityList()}
                            </Grid>
                        </Accordion.Collapse>
                    </div>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Your Requests
                </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Grid container spacing={4}>
                                {this.yourMatchedopportunityList()}
                            </Grid>
                        </Accordion.Collapse>
                    </div>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            Match Requests
                </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Grid container spacing={4}>
                                {this.pendingRequestopportunityList()}
                            </Grid>
                        </Accordion.Collapse>
                    </div>
                </Accordion>
            </>


        );
    }
}

export default Matches;