// client/src/App.js

import React from "react"; 
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';
import backArrow from "./assets/back-arrow.png";
import "./App.css";
import LoadAccount from "./client/components/loadAccount.js";
import CreateUserPetTile from "./client/components/getUserPets.js";
import CreateYourSearchesTile from "./client/components/yourSearches.js";
import OpenSearchInstnace from "./client/components/openSearchInstance.js";
import Map  from "./client/components/generateSearchMap.js";
import { LoadScript } from "@react-google-maps/api";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs, getDoc, query, where, orderBy, GeoPoint, Timestamp  } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FB_API_KEY,
	authDomain: process.env.REACT_APP_FB_DOMAIN,
	projectId: process.env.REACT_APP_FB_PROJID,
	storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKEY,
	messagingSenderId: process.env.REACT_APP_FB_MSGSENDERID,
	appId: process.env.REACT_APP_FB_APPID,
	measurementId: process.env.REACT_APP_FB_MEASUREMENTID
}; 


   
// Initialize Firebase
const app1 = initializeApp(firebaseConfig);
const analytics = getAnalytics(app1);
const db = getFirestore(app1); 
let addUser = true; 

let initialUserCall = false;
function App() {
	const [firstName, setFirstName] = React.useState("Unknown");
	const [initials, setInitials] = React.useState("US"); 
	const [profile, setProfile] = React.useState(null);
	const [yourPets, setYourPets] = React.useState(null);
	const [value, setValue] = React.useState('1');
	const [userID, setuserID] = React.useState(null);
	const [userRadius, setUserRadius] = React.useState(null);
	const [search, setSearch] = React.useState(null);
	const [homeView, setHomeView] = React.useState("block");
	const [searchView, setsearchView] = React.useState("none");
	const [searches, setSearches] = React.useState(null);
	const [petTile, setPetTile] = React.useState(null);
	const [userObject, setUserObject] = React.useState(null);
	const [searchMap, setSearchMap] = React.useState(null);
	const lib = ["places"];
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const style = {
		position: 'absolute',
		top: '20%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	  };
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
	if(addUser){
		addUser = false;
		//AddUserData()
		//AddPetData()
		//AddSearchData()
	}
	async function AddUserData(){ 
		try { 
			const docRef = await addDoc(collection(db, "accounts"), {
				AuthenticationAgent: "Google",
				Email: "bs@gmail.com",
				FirstName: "Baily",
				LastName: "Sully",
				Password: "wefsafdsdf",
				PetID: [''],
				ActiveSearches: [''],
				Location: new GeoPoint(22,63),
				Radius: 5,
				SearchHistory: [''],
				YourSearches: ['']
			})
			console.log("success")
		} catch (e) {
			console.error("Error adding document: ", e);
		  } 

	}
	async function AddPetData(){ 
		try { 
			const docRef = await addDoc(collection(db, "pets"), {
				Age: 1,
				Breed: "Husky",
				Color: ['Bicolor','Black', 'White'],
				Created: new Timestamp(1713143453, 875730524),
				Image: "media/Duke.jpg",
				Location: new GeoPoint(22.40338, 63.17403),
				Missing: false,
				Name: "Duke",
				OwnerID: "HuUV748iSEwFeK7FKF3T",
				Removed: new Timestamp(1858942654, 392800532),
				Size: "Medium",
				Type: "Dog",
				SearchID: ""
			})
			console.log("success")
		} catch (e) {
			console.error("Error adding document: ", e);
		  } 

	}
	async function AddSearchData(){ 
		try { 
			const docRef = await addDoc(collection(db, "searches"), {
				created: new Timestamp(1858942654, 392800532),
				ended: new Timestamp(1858943654, 392801532),
				lastUpdated: new Timestamp(1858943654, 392801532),
				owner: "1qeEn5OTJTPCn1EmGMEe",
				petID: "4QjFkJ01ScbF5Y8km6ao",
				searchers: ["{'id': '1234', 'active': 'false', 'lastLocation': … '1:23 4/22/2024', :'timeLeft': '3:44 4/22/2024'}"],
				searchersID: ['1qeEn5OTJTPCn1EmGMEe','SUKQGfhw9tkeih3cTLew'],
				status: "deactived",
				waypoints: ["{'id':'5432','type': '2','location':''[50° N, 12° E]'}"]
			})
			console.log("success")
		} catch (e) {
			console.error("Error adding document: ", e);
		  } 

	};

	async function GetUserData(){
		
		let q = query(collection(db, "accounts"), where("Email", "==", "test@gmail.com"));
		const querySnapshot = await getDocs(q); 
		querySnapshot.forEach((doc) => { 
			let userData = doc.data();
			setUserObject(userData);
			//console.log(userData);
			setuserID(doc.id);
			if(userData){
				initialUserCall = true
			} 
			setProfile(LoadAccount(userData)); 
			setFirstName(userData.FirstName);
			setUserRadius(userData.Radius);
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
		let petsArray = [];
		querySnapshot.forEach((doc) => { 
			let userPetData = doc.data();
			console.log(userPetData);
			let petID = doc.id;
			userPetData.PetID = petID;
			petsArray.push(userPetData);
		});
		if(yourPet == 0){
		  	const yourPetTiles0 = petsArray.map(pet => <div>{CreateUserPetTile(pet)}</div>)
		  	setYourPets(yourPetTiles0)
		}
		if(yourPet == 1){
			const yourPetTiles1 = petsArray.map(pet => <div>{CreateYourSearchesTile(pet,lookupID,openSearch)}</div>)
			setSearches(yourPetTiles1) 
		};
		if(yourPet == 2){ 
			const yourPetTiles1 = petsArray.map(pet => <div>{CreateYourSearchesTile(pet,lookupID,false)}</div>)
			setPetTile(yourPetTiles1) 
		};
	};

	async function GetYourSearchesData(lookupID, yourSearch){
		let q;
		if(yourSearch){
			q = query(collection(db, "searches"), where("searchersID", "array-contains", lookupID));
		}else{ 
			q = query(collection(db, "searches"), where('__name__', '==', lookupID))
		};

		let searchesArray = [];
		const querySnapshot = await getDocs(q); 
		querySnapshot.forEach((doc) => { 
			let yourSearchesData = doc.data();
			let yourSearchesID = doc.id;
			let searchOb = {
				id: yourSearchesID,
				data: yourSearchesData
			}
			searchesArray.push(searchOb);
			console.log(yourSearchesData)
		});;

		if(yourSearch){
			console.log(searchesArray);
			searchesArray.map(search => {console.log(search.id);GetUserPetData(search.id, 1)})
		}else{
			setSearch(OpenSearchInstnace(searchesArray[0].data));
		};
	};
	return (
		<div className="app">
			<header className="app-header">
				<div className="header-text">Retrieved</div>
				<div  className="avatar"><Avatar sx={{ bgcolor: 'darkBlue' }}>{initials}</Avatar></div>
				
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
								<button className="addRemovePet" data-userid={userID} onClick={handleOpen}>Add/Remove Pets</button>
							</div> 
						</TabPanel>
						<TabPanel value="2">{searches}</TabPanel>
						<TabPanel value="3">Item Three</TabPanel>
					</TabContext> 
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						>
						<Box sx={style}>
							<p>This is a test modal</p>
						</Box>
					</Modal>
				</Box>
				<Box  style={{display: searchView}}  id="Search">
					<div className="closeSearch" onClick={closeSearch} style={{width: "100px",height: "50px"}}><img src={backArrow} id="BackArrow"/>  Back</div>
					<div className="Search">
						{petTile}
						<LoadScript googleMapsApiKey={process.env.REACT_APP_GM_API_KEY} libraries={lib}>
							<Map />
						</LoadScript>
						{search}
					</div>
				</Box>
			</div>
		</div>
	);
}

export default App;
