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
                <Fab style={{ marginBottom: "5px", marginLeft: "5px" }} variant="extended" onClick={() => props.handleMatch(props.opportunity.id)} size="small" color="primary" aria-label="add" className={useStyles.margin}>Match</Fab>
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
        axios
            .get(`${util.BASE_URL}/talent/${user_id}/matches`)
            .then(res => {
                console.log(res.data);
                this.setState({ perfectopportunityList: res.data.perfect_matches, yourMatchedopportunityList: res.data.applications, pendingRequestopportunityList: res.data.requested_matches })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err.response.data.message }
                )
            });
    }
    handleMatchs = (id) => {
        let data = {
            "opportunity_id": id
        };
        console.log(data);
        let user_id = localStorage.getItem("id");
        axios.post(`${util.BASE_URL}/talent/${user_id}/match`, data)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("updated the match");
                    axios
                        .get(`${util.BASE_URL}/talent/${user_id}/opportunities`)
                        .then(res => {
                            console.log("im to get all matches")
                            console.log(res.data);
                            let opportunities = res.data;
                            this.setState({ opportunities: opportunities, error: "" })
                        })
                        .catch(err => {
                            console.log(err);
                            this.setState({ error: err.response.data.message }
                            )
                        });
                }
            })
            .catch((err) => console.log(err));
    }


    perfectopportunityList() {
        return this.state.perfectopportunityList.map(currentOpportunity => {
            return <Opportunity opportunity={currentOpportunity} handleMatchs={this.handleMatchs} key={currentOpportunity.id} />;
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