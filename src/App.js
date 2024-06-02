// client/src/App.js

import React from "react"; 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import backArrow from "./assets/back-arrow.png";
import "./App.css";
import LoadAccount from "./client/components/loadAccount.js";
import CreateUserPetTile from "./client/components/getUserPets.js";
import CreateYourSearchesTile from "./client/components/yourSearches.js";
import OpenSearchInstnace from "./client/components/openSearchInstance.js";


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
	const [firstName, setFirstName] = React.useState("Unknown");
	const [initials, setInitials] = React.useState("US"); 
	const [profile, setProfile] = React.useState(null);
	const [yourPets, setYourPets] = React.useState(null);
	const [value, setValue] = React.useState('1');
	const [userID, setuserID] = React.useState(null);
	const [radius, setRadius] = React.useState(null);
	const [search, setSearch] = React.useState(null);
	const [homeView, setHomeView] = React.useState("block");
	const [searchView, setsearchView] = React.useState("none");
	const [searches, setSearches] = React.useState(null);
	const [petTile, setPetTile] = React.useState(null);

	

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const openSearch = (event) => {
		let searchToOpen = event.currentTarget.getAttribute("data-searchid");
		setHomeView("none");
		setsearchView("block"); 
		GetYourSearchesData(searchToOpen, false)
	};
	const closeSearch = (event) => {
		console.log(event); 
		setsearchView("none");
		setHomeView("block");  
	};
	if(!initialUserCall){
		GetUserData()
	}
	async function GetUserData(){
		
		let q = query(collection(db, "accounts"), where("Email", "==", "test@gmail.com"));
		const querySnapshot = await getDocs(q); 
		querySnapshot.forEach((doc) => { 
		  let userData = doc.data();
		  setuserID(doc.id);
		  if(userData){
			initialUserCall = true
		  } 
			setProfile(LoadAccount(userData)); 
			setFirstName(userData.FirstName);
			setRadius(userData.radius);
			setInitials("NT")
			GetUserPetData(doc.id, 0)
			GetYourSearchesData(doc.id, true)
		});
	};
	async function GetUserPetData(lookupID, yourPet){
		let q;
		if(yourPet == 0){
			q = query(collection(db, "pets"), where("OwnerID", "==", lookupID))
		}else{
			q = query(collection(db, "pets"), where("searchID", "==", lookupID))
		};
		const querySnapshot = await getDocs(q); 
		querySnapshot.forEach((doc) => { 
		  let userPetData = doc.data();
		  let petID = doc.id;
		  userPetData.PetID = petID;
		  if(yourPet == 0){
			setYourPets(CreateUserPetTile(userPetData)); 
		  }
		  if(yourPet == 1){
			setSearches(CreateYourSearchesTile(userPetData,lookupID,openSearch)); 
		  };
		  if(yourPet == 2){
			setPetTile(CreateYourSearchesTile(userPetData,lookupID, false)); 
		  };
		});
	};
	async function GetYourSearchesData(lookupID, yourSearch){
		let q;
		if(yourSearch){
			q = query(collection(db, "searches"), where("searchersID", "array-contains", lookupID));
		}else{ 
			q = query(collection(db, "searches"), where('__name__', '==', lookupID))
		};
		const querySnapshot = await getDocs(q); 
		querySnapshot.forEach((doc) => { 
		  let yourSearchesData = doc.data();
		  let searchID = doc.id;
		  let petID = yourSearchesData.petID;
		  if(yourSearch){
			GetUserPetData(doc.id, 1)
		  }else{
			GetUserPetData(doc.id, 2);
			setSearch(OpenSearchInstnace(yourSearchesData));
		  };
		});
	};

	return (
		<div className="app">
			<header className="app-header">
				<div className="header-text">Retrieved</div>
				<div  className="avatar"><Avatar sx={{ bgcolor: 'darkGreen' }}>{initials}</Avatar></div>
				
			</header>
			<div className="app-body">
				<Box style={{display: homeView}} id="Home">
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Home" value="1" />
							<Tab label="Your Searches" value="2" />
							<Tab label="Searches in Area" value="3" />
						</TabList>
						</Box>
						<TabPanel value="1">
							Hello, {firstName}
							
							<div className="profile">
								{profile}
								<div className="editBtnContainer">
									<button className="editUser editBtn" data-userid={userID}>Edit</button>
								</div>
							</div>
							<div className="petCards">{yourPets}</div>
							<div className="addRemovePetContainer">
								<button className="addRemovePet" data-userid={userID}>Add/Remove Pets</button>
							</div> 
						</TabPanel>
						<TabPanel value="2">{searches}</TabPanel>
						<TabPanel value="3">Item Three</TabPanel>
					</TabContext>
				</Box>
				<Box  style={{display: searchView}}  id="Search">
					<div className="closeSearch" onClick={closeSearch} style={{width: "100px",height: "50px"}}><img src={backArrow} id="BackArrow"/>  Back</div>
					<div className="Search">
						{petTile}
						{search}
					</div>
				</Box>
			</div>
		</div>
	);
	}

export default App;
