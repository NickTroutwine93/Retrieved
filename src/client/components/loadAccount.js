import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import logo from "../../assets/mapApprox.jpg";
import GetUserPets from "./getUserPets.js";

export default function LoadAccount(accountData) {
    //console.log(columns)
    GetUserPets(accountData.PetID);
    return(
        <div style={{ height: 'auto', width: '100%' }}>
            <div id="Profile">
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <p>Your notification range is set to: {accountData.radius}</p>
                </Grid>
                <Grid item xs={6} md={4}>
                    <img src={logo} width="100%"/>
                </Grid>
            </Grid>
                
            </div>
            <div id="Pets">
                
            </div>
        </div>
    );

}