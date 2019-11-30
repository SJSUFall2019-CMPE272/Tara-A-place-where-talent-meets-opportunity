import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
import ToggleButton from '@material-ui/lab/ToggleButton';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from "axios";
import { red } from "@material-ui/core/colors";



const Opportunity = props => (
    <Grid item xs={12} sm={6} md={4}>
        <Card className={useStyles.card}>
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
                {/* <Toggle /> */}
                {/* <Button color="primary"> */}

                {/* </Button> */}
                <Button size="small" color="primary">
                    <Link to={"#" + props.opportunity.id}>View Matches</Link>
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


class Opportunities extends Component {
    state = {
        opportunities: [],
        error: "",
        opportunity: {}
    }


    componentDidMount = () => {
        const id = localStorage.getItem("id");
        console.log(id)
        axios
            .get(`${util.BASE_URL}/recruiter/${id}/opportunities`)
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

    opportunityList() {
        return this.state.opportunities.map(currentOpportunity => {
            return <Opportunity opportunity={currentOpportunity} key={currentOpportunity.id} />;
        })
    }



    render() {
        return (
            <main>
                <Navbar />
                <div style={{marginTop: "30px"}} className={useStyles.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Jobs Posted by You
                            </Typography>
                </Container>
                </div>
                <div style={{marginTop: "30px", paddingBottom:"30px"}}>
                <Container className={useStyles.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {this.opportunityList()}
                    </Grid>
                </Container>
                </div>
            </main>
        );
    }
}

export default Opportunities;