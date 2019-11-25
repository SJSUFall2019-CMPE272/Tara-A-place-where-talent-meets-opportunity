import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Navbar from "../Navbar";
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import util from "../../utils";
import { Modal, Button as RButton } from "react-bootstrap";



import Link from "react-router-dom";
import axios from "axios";
import { red } from "@material-ui/core/colors";

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

class Home extends Component {
    state = {
        opportunities: [],
        error: "",
        showDetailsModal: false,
        opportunity: {}
    }
    componentDidMount = () => {
        axios
            .get(`${util.BASE_URL}/opportunities`)
            .then(res => {
                console.log(res.data);
                this.setState({ opportunities: res.data, error: "" })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err.response.data.message }
                )
            });
    }
    handleViewDetails = (card) => {
        this.setState({ showDetailsModal: true, opportunity: card })
    }
    handleClose = () => {
        this.setState({ showDetailsModal: false, opportunity: {} })
    }
    render() {
        const labelstyles = {
            fontSize: '20px',
            fontWeight: 400
        }
        return (
            <React.Fragment>
                <Navbar />
                <CssBaseline />
                {/* <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                <main>
                    {/* Hero unit */}
                    <div className={useStyles.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Available Jobs
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Find your dream job today
                            </Typography>
                            <div className={useStyles.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            Main call to action
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            Show your matches
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Container className={useStyles.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {this.state.opportunities.map(card => (
                                <Grid item key={card.id} xs={12} sm={6} md={4}>
                                    <Card className={useStyles.card}>
                                        <CardMedia
                                            className={useStyles.cardMedia}
                                            image="https://source.unsplash.com/random"
                                            title="Image title"
                                        />
                                        <CardContent className={useStyles.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.title}
                                            </Typography>
                                            <Typography>
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Fab variant="extended" size="medium" color="primary" aria-label="add" className={useStyles.margin}>
                                                MATCH <CheckIcon />
                                            </Fab>
                                            {/* <Button color="primary"> */}

                                            {/* </Button> */}
                                            <Button size="small" color="primary" onClick={() => this.handleViewDetails(card)}>
                                                View Details
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
                <Modal show={this.state.showDetailsModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>{this.state.opportunity.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                        {this.state.opportunity.required_skills && <div className="col-sm-12">
                            <label style={labelstyles}>Required Skills</label>
                            {this.state.opportunity.required_skills.map(skill => <p>{skill}</p>)}
                        </div>}
                        {this.state.opportunity.gender && <div className="col-sm-12">
                            <label style={labelstyles}>Gender</label>
                            {this.state.opportunity.gender}
                        </div>}
                        {this.state.opportunity.location && <div className="col-sm-12">
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
                        </div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <RButton variant="secondary" onClick={this.handleClose}>
                            Close
                        </RButton>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}


export default Home;
