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
import Container from '@material-ui/core/Container';


const Talent = props => (
    <Grid item xs={12} sm={6} md={4}>
        <Card className={useStyles.card}>
            <CardContent className={useStyles.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.talent.name.firstName + " " + props.talent.name.lastName}
                </Typography>
            </CardContent>
            <CardActions>
                <Fab style={{ marginBottom: "5px", marginLeft: "5px" }} variant="extended" onClick={() => props.handleMatch(props.talent.id)} size="small" color="primary" aria-label="add" className={useStyles.margin}>Match</Fab>

                <Button size="small" color="primary">
                    <Link to={"/talentdetail/" + props.talent.id}>View Profile</Link>
                </Button>
            </CardActions>
        </Card>
    </Grid>
)

const MatchedTalent = props => (
    <Grid item xs={12} sm={6} md={4}>
        <Card className={useStyles.card}>
            <CardContent className={useStyles.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.talent.name.firstName + " " + props.talent.name.lastName}
                </Typography>
            </CardContent>
            <CardActions>
                {/* <Fab style={{ marginBottom: "5px", marginLeft: "5px" }} variant="extended" onClick={() => props.handleMatch(props.talent.id)} size="small" color="primary" aria-label="add" className={useStyles.margin}>Match</Fab> */}

                <Button size="small" color="primary">
                    <Link to={"/talentdetail/" + props.talent.id}>View Profile</Link>
                </Button>
            </CardActions>
        </Card>
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
    constructor(props) {
        super(props);
        this.state = {
            perfectTalentList: [],
            TalentList: [],
            yourMatchedTalentList: [],
            error: "",
            talent: {},
            opportunity: {},
        }
    }


    componentDidMount = () => {
        axios
            .get(`${util.BASE_URL}/recruiter/matches/${this.props.match.params.id}`) // This will list all the talents who have matched with this opportunity
            .then(res => {
                console.log(res.data);
                this.setState({
                    perfectTalentList: res.data.perfect_matches,
                    yourMatchedTalentList: res.data.recruiter_matches,
                    TalentList: res.data.not_applied,
                    error: ""
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err.response.data.message }
                )
            });
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



    perfectTalentList() { // Perfect matches
        return this.state.perfectTalentList.map(currentTalent => {
            return <MatchedTalent talent={currentTalent} key={currentTalent.id} />;
        })
    }

    yourMatchedTalentList() { //Talents recruiter matched for this opportunity
        return this.state.yourMatchedTalentList.map(currentTalent => {
            return <MatchedTalent talent={currentTalent} key={currentTalent.id} />;
        })
    }
    pendingRequestTalentList() { //Talents that havent applied
        return this.state.TalentList.map(currentTalent => {
            return <Talent handleMatch={this.handleMatches} talent={currentTalent} key={currentTalent.id} />;
        })
    }

    handleMatches = (id) => {
        let data = {
            "talent_id": id,
            "opportunity_id": this.props.match.params.id,
        };
        console.log(data);
        let user_id = localStorage.getItem("id");
        axios.post(`${util.BASE_URL}/recruiter/match`, data)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    console.log("updated the match");
                    axios
                        .get(`${util.BASE_URL}/recruiter/matches/${this.props.match.params.id}`) // This will list all the talents who have matched with this opportunity
                        .then(res => {
                            console.log(res.data);
                            this.setState({
                                perfectTalentList: res.data.perfect_matches,
                                yourMatchedTalentList: res.data.recruiter_matches,
                                TalentList: res.data.not_applied,
                                error: ""
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            this.setState({ error: err.response.data.message }
                            )
                        });
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
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <>
                <Navbar />
                <div style={{ marginTop: "30px" }} className={useStyles.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Talent Pool
                            </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Find the perfect talent from your dream project today
                            </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Job Title: {this.state.opportunity.title}
                        </Typography>
                        <div className={useStyles.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        <Link to={"/jobdetail/" + this.props.match.params.id}>Job Description</Link>
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        <Link to="/recruiterupdateprofile">Update Profile</Link>
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container style={{ marginTop: "10px" }} className={useStyles.cardGrid} maxWidth="md">

                    <Grid container spacing={4}>
                        {this.pendingRequestTalentList()}
                    </Grid>
                </Container>
                <Accordion>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                           <h5> Your Requests</h5>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Container style={{ marginTop: "10px" }} className={useStyles.cardGrid} maxWidth="md">

                                <Grid container spacing={4}>
                                    {this.yourMatchedTalentList()}
                                </Grid>
                            </Container>
                        </Accordion.Collapse>
                    </div>
                    <div>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        <h5>Perfect Matches </h5>
                </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Container style={{ marginTop: "10px" }} className={useStyles.cardGrid} maxWidth="md">

                                <Grid container spacing={4}>
                                    {this.perfectTalentList()}
                                </Grid>
                            </Container>
                        </Accordion.Collapse>
                    </div>
                    {/* <div>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Match Requests
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                    <Grid container spacing={4}>
                        </Grid>
                    </Accordion.Collapse>
                </div> */}
                </Accordion>

            </>


        );
    }
}

export default Matches;