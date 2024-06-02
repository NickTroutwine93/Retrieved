import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import mapPlaceHolder from "../../assets/mapApprox.jpg";
import Box from '@mui/material/Box';

export default function OpenSearchInstnace(searchInfo) {
    console.log(searchInfo)
    let time = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', mili: '2-digit'}).format(searchInfo.lastUpdated);
    return(
        <div style={{ height: 'auto', width: '100%' }}>
            <Box className="searchInstance">
                <div>Google Map</div>
                <img src={mapPlaceHolder} width="100%"/>
                
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <p>Last Update: {time}</p>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <p>Participants: {searchInfo.searchersID.length}</p>
                    </Grid>
                </Grid> 
            </Box>
        </div>
    );

}