import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import logo from "../../assets/rigby.jpg";
import Box from '@mui/material/Box';

export default function CreateUserPetTile(petInfo) { 
    let colorArray = petInfo.Color;
    let colorString ="Not Provided";
    if(colorArray){
        colorString= colorArray.join(", ")
    }
    return(
        <div style={{ height: 'auto', width: '100%' }}>
            <Box className="petTile">
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <h2 className="petName">{petInfo.Name}</h2>
                        <div className="petRow breed">Breed: {petInfo.Breed}</div>
                        <div className="petRow breed">Color: {colorString}</div>
                        <div className="petRow breed">Size: {petInfo.Size}</div>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <img src={logo} width="100%"/>
                        <div className="editBtnContainer">
                            <button className="editPet editBtn" data-petid={petInfo.PetID}>Edit</button>
                        </div>
                    </Grid>
                </Grid>
                <div className="createSearchContainer">
                    <button className="createSearch primaryButton" data-petid={petInfo.PetID} data-ownerid={petInfo.OwnerID}>Create Search</button>
                </div>
            </Box>
        </div>
    );

}