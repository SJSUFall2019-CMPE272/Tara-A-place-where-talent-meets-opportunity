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
      lat: 37.3352,
      lng: 121.8811,
    },
    opportunities: [],
    haveUsersLocation: false,
    zoom: 11
  }

  componentDidMount() {
    axios
      .get(`${util.BASE_URL}/opportunities`)
      .then(res => {
        console.log(res.data);
        this.setState({ opportunities: res.data, error: "" })
      })
      .then(res => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            zoom: 11,
            haveUsersLocation: true,
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
                zoom: 11,

                haveUsersLocation: true,
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
      if (opportunity.location.lat && opportunity.location.lng) {
        const pos = [opportunity.location.lat, opportunity.location.lng]
        return <Marker icon={myIcon} position={pos}>
          <Popup>
            <Button variant="outlined" color="primary"><Link style={{ color: '#FFF' }} to={"/jobdetail/" + opportunity.id} >{opportunity.project_name}</Link></Button>
          </Popup> </Marker>;
      }
    })
  }
  openPopup (marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      })
    }
  }


  render() {
    const position = [this.state.location.lat, this.state.location.lng]
    console.log("position for center" + position)
    return (
      <div className="col-sm-12">
        <Map
        center={position} zoom={this.state.zoom}
          maxZoom={14}
          minZoom={5}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          style={{ width: "100%", height: "600px" }}  >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
            <Marker
              position={position}
              icon={myIcon}
              ref={this.openPopup}
            >
              <Popup>
                Your location
                </Popup>
            </Marker>

          
          {this.locationList()}


        </Map>
      </div>
    )
  }
}

export default MapLocation;
