import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { collection, doc, addDoc, getDocs, getDoc, query, where, orderBy  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  

export default function HandleLogin(accountData) {
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
    const [firstName, setFirstName] = React.useState("Unknown");
    const [profile, setProfile] = React.useState(null);
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    //console.log(columns)
	async function GetData(){
		
		let q = query(collection(db, "accounts"), where("Email", "==", "test@gmail.com"));
		const querySnapshot = await getDocs(q);
		//console.log(querySnapshot);
		querySnapshot.forEach((doc) => {
			console.log("Document data:");
		  let userData = doc.data();
		});
	};
    GetData()
    return(
        <div style={{ height: 'auto', width: '100%' }}>
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
    );

}