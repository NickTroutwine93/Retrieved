// client/src/App.js

import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { DataGrid } from '@mui/x-data-grid';

import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import logo from "./900dfdfe3610cf5e77403d64ae15264c.png";
import "./App.css";
import ResultsDataTable from "./client/components/data-table.js";
import addOTC from "./client/components/add-otc.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, query, where, orderBy  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  
const firebaseConfig = {
	apiKey: "AIzaSyAjtIN4NkuEMar_SVOrx8fH9EaTYqGnKjs",
	authDomain: "retrieved-9e01b.firebaseapp.com",
	projectId: "retrieved-9e01b",
	storageBucket: "retrieved-9e01b.appspot.com",
	messagingSenderId: "949420666249",
	appId: "1:949420666249:web:94048a53df35a9c5610558",
	measurementId: "G-E1N41SQQ46"
};
   
   
// Initialize Firebase
const app1 = initializeApp(firebaseConfig);
const analytics = getAnalytics(app1);
const db = getFirestore(app1); 

const otcGmu ={
    gmuPublicOnly: [6, 15, 16, 17, 18, 21, 22, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 47, 52, 53, 54, 55, 59, 60, 62, 63, 64, 65, 68, 70, 71, 72, 73, 74, 75, 77, 78, 80, 81, 82],
    gmuBoth: [85, 86, 133, 134, 140, 141, 142, 161, 171, 181, 361, 371, 411, 421, 431, 444, 471, 511, 521, 551, 581, 591, 681, 691, 711, 741, 751, 771, 851],
    gmuPrivateOnly: [3, 4, 5, 11, 12, 13, 14, 23, 24, 131, 211, 214, 231, 301, 441]

}
const successMarks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 100,
		label: '100',
	}
];
const hunterMarks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 2000,
		label: '2000',
	}
];
const harvestMarks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 500,
		label: '500',
	}
];
  

function App() {
	//data that will be injected as table from response
	//#number of records will get updated with response as well
	const [results, setResults] = React.useState("0");
	//Variables that will be paramaters for get request. Value is set by input fields;
	const [data, setData] = React.useState(null);
	const [success, setSuccess] = React.useState(0);
	const [hunters, setHunters] = React.useState(2000);
	const [harvest, setHarvest] = React.useState(0);
	const [year, setYear] = React.useState("2022");
	const [season, setSeason] = React.useState("all-rifle");
	
	const handleSubmit = (event) => {



		//ONLY USE TO UPDATE OTC STATUS ON EXISTING RECORDS
		//addOTC(db);



		event.preventDefault();
		GetData(success,hunters,harvest);
		async function GetData(success,hunters,harvest){
			//console.log("data");
			let successInt = Number(success);
			let huntersInt = Number(hunters);
			let harvestInt = Number(harvest);
			//console.log(successInt);
			let proccessData = [];
			let table = "pets";
			let q = query(collection(db, table));
			const querySnapshot = await getDocs(q);
			//console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
			  // doc.data() is never undefined for query doc snapshots
			  let dataCall = doc.data();
			  //console.log("dataCall",dataCall);
			  //console.log(dataCall.totalHarvest,harvestInt);
				dataCall["id"] = doc.id;
			  if((dataCall.totalHarvest >= harvestInt)&&(dataCall.totalHunters <= huntersInt)){
				proccessData.push(dataCall);
			  }
			});
			buildTable(proccessData);
			//setResults(returnLength);
		} 
		function buildTable(unitData){
			let datalength = unitData.length;
			//console.log(datalength);
			const columns = [
				{ field: 'unit', headerName: 'Unit', flex: 1 },
				{ field: 'bulls', headerName: 'Bulls', flex: 1  },
				{ field: 'cows', headerName: 'Cows', flex: 1 },
				{ field: 'calves', headerName: 'Calves', flex: 1 },
				{ field: 'totalHarvest', headerName: 'Harvest', flex: 1  },
				{ field: 'totalHunters', headerName: 'Hunters', flex: 1 },
				{ field: 'percSuccess', headerName: 'Success', flex: 1  },
				{ field: 'totalDays', headerName: 'Days', flex: 1 },
				{ field: 'otc', headerName: 'OTC Status', flex: 1 }
			];
			let dt = ResultsDataTable(unitData,columns)
			setData(dt);
		}
	}
return (
    <div className="app">
     	<header className="app-header">
        	<img src={logo} className="app-logo" alt="logo" />
			<div className="header-text">CO ELK Data</div>
		</header>
      	<div className="app-body">
        	<div className="inputs">
				<form onSubmit={handleSubmit}>
					<table className='data-table season-input-group'>
						<tr>
							<th>Year</th>
							<th>Season</th>
						</tr>
						<tr>
							<td id="year-dropdown"> 
								<Select
								  labelId="year-dropdown-label"
								  id="year-dropdown-select"
								  value={year}
								  label="year"
								  onChange={(e) => setYear(e.target.value)}
								>
								  <MenuItem value={"2022"}>2022</MenuItem>
								  <MenuItem value={"2021"}>2021</MenuItem>
								  <MenuItem value={"2020"}>2020</MenuItem>
								  <MenuItem value={"2019"}>2019</MenuItem>
								  <MenuItem value={"2019"}>2018</MenuItem>
								</Select>
							</td>
							<td id="season-dropdown"> 
								<Select
								  labelId="season-dropdown-label"
								  id="season-dropdown-select"
								  value={season}
								  label="Season"
								  onChange={(e) => setSeason(e.target.value)}
								>
								  <MenuItem value={"all-rifle"}>All Rifle</MenuItem>
								  <MenuItem value={"first-rifle"}>First Rifle</MenuItem>
								  <MenuItem value={"second-rifle"}>Second Rifle</MenuItem>
								  <MenuItem value={"third-rifle"}>Third Rifle</MenuItem>
								  <MenuItem value={"fourth-rifle"}>Fourth Rifle</MenuItem>
								</Select>
							</td>
						</tr>
					</table>
					<table className='data-table data-points'> 
						<tr className="sliders">
							<td>
								<Box>
									<Typography className="labels" gutterBottom>
										Min Harvest
									</Typography>
								  <Slider
								  	className="slider"
									aria-label="Always visible"
									step={10}
									marks={harvestMarks}
									valueLabelDisplay="on"
									value={harvest}
									max={500}
									onChange={(e) => setHarvest(e.target.value)}
								  />
								</Box>
							</td>
							<td> 
								<Box>
									<Typography className="labels" gutterBottom>
										Max Hunters
									</Typography>
								  <Slider
								  	className="slider"
									aria-label="Always visible"
									step={10}
									marks={hunterMarks}
									valueLabelDisplay="on"
									value={hunters}
									max={2000}
									onChange={(e) => setHunters(e.target.value)}
								  />
								</Box>
							</td>
							<td>
								<Box>
									<Typography className="labels" gutterBottom>
										Min Success %
									</Typography>
								  <Slider
								  	className="slider"
									aria-label="Always visible"
									step={1}
									marks={successMarks}
									valueLabelDisplay="on"
									value={success}
									onChange={(e) => setSuccess(e.target.value)}
								  />
								</Box>
							</td>
						</tr>
					</table> 
					<div className="center">
						<input className="submit" type="submit" />
					</div>
				</form>
			</div>
			<div className="records">{data}</div>
 


      	</div>
    </div>
  );
}

export default App;
