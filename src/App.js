// client/src/App.js

import React from "react"; 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//import logo from "./assets/mapApprox.jpg";
import "./App.css";
import LoadAccount from "./client/components/loadAccount.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs, getDoc, query, where, orderBy  } from "firebase/firestore";

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
let initialUserCall = false;
function App() {
	//data that will be injected as table from response
	//#number of records will get updated with response as well
	const [results, setResults] = React.useState("NT");
	const [firstName, setFirstName] = React.useState("Unknown");
	const [initials, setInitials] = React.useState("US");
	//Variables that will be paramaters for get request. Value is set by input fields;
	const [profile, setProfile] = React.useState(null);
	const [value, setValue] = React.useState('1');

	const handleChange = (event, newValue) => {
	  setValue(newValue);
	};
	if(!initialUserCall){
		GetData()
	}
	async function GetData(){
		
		let q = query(collection(db, "accounts"), where("Email", "==", "test@gmail.com"));
		const querySnapshot = await getDocs(q);
		//console.log(querySnapshot);
		querySnapshot.forEach((doc) => {
		  // doc.data() is never undefined for query doc snapshots
		  let userData = doc.data();
		  console.log("Document data:",userData);
		  if(userData){
			initialUserCall = true
		  }
		  //console.log("dataCall",dataCall);
		  //console.log(dataCall.totalHarvest,harvestInt); 
			setProfile(LoadAccount(userData));
			//setProfile(profileData);
			setFirstName(userData.FirstName);
			setInitials("NT");
		});
	};

	return (
		<div className="app">
			<header className="app-header">
				<div className="header-text">Retrieved</div>
				<div  className="avatar"><Avatar sx={{ bgcolor: 'darkGreen' }}>{initials}</Avatar></div>
				
			</header>
			<div className="app-body">
				<Box sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Item One" value="1" />
							<Tab label="Item Two" value="2" />
							<Tab label="Item Three" value="3" />
						</TabList>
						</Box>
						<TabPanel value="1">
							Hello, {firstName}
							
							<div className="profile">{profile}</div>

						</TabPanel>
						<TabPanel value="2">Item Two</TabPanel>
						<TabPanel value="3">Item Three</TabPanel>
					</TabContext>
				</Box>
			</div>
		</div>
	);
	}

export default App;
