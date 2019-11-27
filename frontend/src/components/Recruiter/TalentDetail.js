import React, { Component } from 'react';
import axios from 'axios';
import util from "../../utils";


export default class TalentDetail extends Component {
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
            <main>
                <div className="col-sm-12">
                    <label style={labelstyles}>Email</label>
                    <p>{this.state.talent.email}</p>
                </div>
                <div className="col-sm-12">
                    <label style={labelstyles}>Gender</label>
                    <p>{this.state.talent.gender}</p>
                </div>
                {this.state.talent.experience &&
                    <div className="col-sm-12">
                        <label style={labelstyles}>Experience</label>
                        {this.state.talent.experience.map(exp =>
                            <div>
                                <div className="col-sm-12">
                                    <label style={labelstyles}>project Name</label>
                                    <p>{exp.projectName}</p>
                                </div>
                                <div className="col-sm-12">
                                    <label style={labelstyles}>project Type</label>
                                    <p>{exp.projectType}</p>
                                </div>
                                <div className="col-sm-12">
                                    <label style={labelstyles}>description</label>
                                    <p>{exp.description}</p>
                                </div>
                                <div className="col-sm-12">
                                    <label style={labelstyles}>role</label>
                                    <p>{exp.role}</p>
                                </div>
                            </div>)}
                    </div>
                }
                {this.state.talent.gender && <div className="col-sm-12">
                    <label style={labelstyles}>Gender</label>
                    {this.state.talent.gender}
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
            </main>

        );
    }
}


