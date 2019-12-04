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
import { Modal, Button as RButton } from "react-bootstrap";
import util from "../../utils";
import { Link } from "react-router-dom";




import axios from "axios";
import { red } from "@material-ui/core/colors";

const Talent = props => (
    <Grid item xs={12} sm={6} md={4}>
        <Card className={useStyles.card}>
            <CardMedia
                className={useStyles.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
            />
            <CardContent className={useStyles.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.talent.name.firstName + " " + props.talent.name.lastName}
                </Typography>
            </CardContent>
            <CardActions>
                <Toggle />
                {/* <Button color="primary"> */}

                {/* </Button> */}
                <Button size="small" color="primary">
                    <Link to={"/talentdetail/" + props.talent.id}>View Profile</Link>
                </Button>
            </CardActions>
        </Card>
    </Grid>
)

const Toggle = () => {
    const [isToggledOn, setToggle] = React.useState(false)
    const toggle = () => setToggle(!isToggledOn)
    return (
        <Fab variant="extended" onClick={toggle} size="medium" color="primary" aria-label="add" className={useStyles.margin}>
            {isToggledOn ? 'UNMATCH' : 'MATCH'}
        </Fab>
    )
}



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
        talents: [],
        error: "",
        showDetailsModal: false,
        talent: {}
    }
    componentDidMount = () => {
        axios
            .get(`${util.BASE_URL}/talent`)
            .then(res => {
                console.log(res.data);
                this.setState({ talents: res.data, error: "" })
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: err.response.data.message }
                )
            });
    }
    handleViewDetails = (talent) => {
        this.setState({ showDetailsModal: true, talent: talent })
    }
    handleClose = () => {
        this.setState({ showDetailsModal: false, talent: {} })
    }

    talentList() {
        return this.state.talents.map(currentTalent => {
            return <Talent talent={currentTalent} key={currentTalent.id} />;
        })
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
                <main>
                    {/* Hero unit */}
                    <div style={{ marginTop: "30px" }} className={useStyles.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Talent Pool
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Find the perfect talent from your dream project today
                            </Typography>
                            <div className={useStyles.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            <Link to="/createjob">Create a Job</Link>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            <Link to="/opportunities">Posted Jobs</Link>
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
                    <Container style={{ marginTop: "10px", marginBottom: "20px" }} className={useStyles.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {this.talentList()}
                        </Grid>
                    </Container>
                </main>
            </React.Fragment>
        );
    }
}


export default Home;
