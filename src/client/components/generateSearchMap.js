/*global google*/
import ReactDOM from "react-dom";
import React from "react"; 
import homeIcon from "../../assets/customHomeIcon.png";

import {
  GoogleMap
} from "@react-google-maps/api";
 
const position = { lat: 39.099, lng: -94.578 };
const dragMap = false;
let searchGridCoolrdinates; 
let movementCoords = [];
class Map extends React.Component {
	state = {
		directions: null,
		bounds: null
	};

  	onMapLoad = map => {
		//load default origin and destination=
		const searcher = new google.maps.Marker({
			position: { lat: position.lat - 0.005, lng: position.lng - 0.005 },
			map,
			title: "Searcher",
			draggable: true,
			id: "searcher-1" 
    	}); 
		movementCoords.push(searcher.position);
		const handleDragEnd = (event, target) => {
			movementCoords.push(searcher.position);
			let inBounds = handleBounds(searcher.position);
			plotMoveCoords(movementCoords,inBounds);
		}
		var bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(position.lat - 0.01, position.lng - 0.015), 
			new google.maps.LatLng(position.lat + 0.01, position.lng + 0.015));
	
	
		function handleBounds(position){
			let inBounds = true;
			if (bounds.contains(position) == false) {
				alert("Please return to the designated search area");
				inBounds = false;
			}
			return inBounds;
		}
		function plotMoveCoords(movementCoords,bounds){
			let color = "blue";
			if(!bounds){
				color="gray";
			}
			const movementLine = new google.maps.Polyline({
			path: movementCoords,
			geodesic: true,
				strokeColor: color,
				strokeOpacity: 1.0,
				strokeWeight: 4,
			});
			movementLine.setMap(map);
		}
		searcher.addListener('dragend', handleDragEnd);


		new google.maps.Marker({
		position: { lat: position.lat, lng: position.lng },
		map,
		title: "Home Origin",
		draggable: false,
			id: "home",
			icon:{
				// path: google.maps.SymbolPath.CIRCLE,
				url: (require('../../assets/customHomeIcon.png')), 
				scale: 7,
			}
		}); 
		searchGridCoolrdinates = [
			{ lat: position.lat - 0.01, lng: position.lng - 0.015 },
			{ lat: position.lat + 0.01, lng: position.lng - 0.015 },
			{ lat: position.lat + 0.01, lng: position.lng + 0.015 },
			{ lat: position.lat - 0.01, lng: position.lng + 0.015 },
			{ lat: position.lat - 0.01, lng: position.lng - 0.015 }

		];
		const searchGrid = new google.maps.Polygon({
			paths: searchGridCoolrdinates,
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 5,  
			fillOpacity: 0,
		});
	
		searchGrid.setMap(map);
		 
  	};
 


  render() {
    return (
      <div>
        <br />
        <div>
          <GoogleMap
            center={position}
            zoom={14} 
            draggable={dragMap}
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