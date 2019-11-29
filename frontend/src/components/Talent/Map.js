import React, { Component } from 'react';
import L from 'leaflet';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import util from "../../utils";
import axios from "axios";

import userLocationURL from './user_location.svg';
import { Link } from "react-router-dom";


import 'leaflet/dist/leaflet.css';

import './Map.css';

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82]
});

class MapLocation extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    opportunities: [],
    haveUsersLocation: false,
    zoom: 1
  }

  componentDidMount() {
    axios
    .get(`${util.BASE_URL}/opportunities`)
    .then(res => {
        console.log(res.data);
        this.setState({ opportunities: res.data, error: "" })
    })
    .then(res =>{
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 13
        });
      }, () => {
        console.log("uh oh... user didnt give location access");
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            console.log(location);
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUsersLocation: true,
              zoom: 13
            });
          });
      });
    })
    .catch(err => {
        console.log(err);
        this.setState({ error: err.response.data.message }
        )
    });



  }


  locationList() {
    return this.state.opportunities.map(opportunity => {
      if(opportunity.location.lat && opportunity.location.lng){
      const pos = [opportunity.location.lat, opportunity.location.lng]
      return <Marker icon={myIcon} position={pos}>
        <Popup>
          <Button variant="outlined" color="primary"><Link style={{ color: '#FFF' }} to={"/jobdetail/"+opportunity.id} >{opportunity.project_name}</Link></Button>
        </Popup> </Marker>;
      }
    })
  }


  render() {
    const position = [this.state.location.lat, this.state.location.lng]
    return (
      <div className="col-sm-12">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            <Marker
              position={position}
              icon={myIcon}
            >
              <Popup>
                Your location
                </Popup>
            </Marker>

          }
          {this.locationList()}


        </Map>
      </div>
    )
  }
}

export default MapLocation;
