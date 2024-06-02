import React, { Component, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs, getDoc, query, where, orderBy  } from "firebase/firestore";
  
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


export default function GetData(table, field, value) {
    let userData;
    useEffect(() => {
        async function GettingData(table, field, value){
                
            let q = query(collection(db, table), where(field, "==", value));
            const querySnapshot = await getDocs(q);
            //console.log(querySnapshot);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            userData = doc.data();
            console.log("Document data:",userData); 
            });
        };
        GettingData(table, field, value)
    }, [])
    console.log(userData);
    return userData
};