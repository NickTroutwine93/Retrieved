import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import logo from "../../assets/rigby.jpg";
import Box from '@mui/material/Box';

export default function CreateYourSearchesTile(petInfo,searchID,handleChange) { 
    let colorArray = petInfo.Color;
    let colorString ="Not Provided";
    if(colorArray){
        colorString= colorArray.join(", ")
    }
    let tileClasses = "searchTile petTile"
    if(!handleChange){
        tileClasses = "petTile"
    }
    return(
        <div style={{ height: 'auto', width: '100%' }}>
            <Box className={tileClasses} onClick={handleChange ? handleChange : undefined } data-searchid={searchID}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <h2 className="petName">{petInfo.Name}</h2>
                        <div className="petRow breed">Breed: {petInfo.Breed}</div>
                        <div className="petRow breed">Color: {colorString}</div>
                        <div className="petRow breed">Size: {petInfo.Size}</div>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <img src={logo} width="100%"/> 
                    </Grid>
                </Grid> 
            </Box>
        </div>
    );

}