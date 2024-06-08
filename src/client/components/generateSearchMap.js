/*global google*/
import ReactDOM from "react-dom";
import React from "react";

import {
  GoogleMap,
  StandaloneSearchBox,
  DirectionsRenderer,
  Marker 
} from "@react-google-maps/api";
 
const position = { lat: 39.099, lng: -94.578 };
let directionsService;
const handleDragEnd = (event, target) => {
  console.log(event)
}
class Map extends React.Component {
  state = {
    directions: null,
    bounds: null
  };

  onMapLoad = map => {
    directionsService = new google.maps.DirectionsService();
    //load default origin and destination=
    new google.maps.Marker({
      position: { lat: position.lat - 0.005, lng: position.lng - 0.005 },
      map,
      title: "Hello World!",
      draggable: true,
    });
    
	var bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(position.lat - 0.01, position.lng - 0.015), 
		new google.maps.LatLng(position.lat + 0.01, position.lng + 0.015));
    

		let searchGridCoolrdinates = [
			{ lat: position.lat - 0.01, lng: position.lng - 0.015 },
			{ lat: position.lat + 0.01, lng: position.lng - 0.015 },
			{ lat: position.lat + 0.01, lng: position.lng + 0.015 },
			{ lat: position.lat - 0.01, lng: position.lng + 0.015 },
			{ lat: position.lat - 0.01, lng: position.lng - 0.015 }
	 
		 ];
		new google.maps.Polyline({
			path: searchGridCoolrdinates,
			geodesic: true,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 5,
		 }); 
		 console.log("hit");
  };
 


  render() {
    return (
      <div>
        <br />
        <div>
          <GoogleMap
            center={position}
            zoom={15} 
            draggable={false}
            onLoad={map => this.onMapLoad(map)}
            mapContainerStyle={{ height: "400px", width: "100%" }}
          >
          </GoogleMap>
        </div>
      </div>
    );
  }
}

export default Map;