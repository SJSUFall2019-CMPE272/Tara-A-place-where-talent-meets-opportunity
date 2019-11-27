import React, { Component } from 'react';
import axios from 'axios';
import util from "../../utils";


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
        </main>
        
    );
    }
}


