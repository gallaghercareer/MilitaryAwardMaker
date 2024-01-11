import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CircularProgress, AppBar, Link, InputAdornment, TextField, IconButton, Toolbar, Button, Stack, Box, ButtonGroup,  MenuItem, Menu, Icon } from '@mui/material';

function Landing() {
   
    const navigate = useNavigate();

    const navigateToCoastGuardHomepage = () =>{
        navigate('/coastguard');
    };
    
    return (
        <>
        <Grid container sx={{paddingTop:'5rem'}}>
            
            <Grid item xs={12} sm={12} md={3} lg={3}> 
            <Typography onClick={navigateToCoastGuardHomepage}><Button>Coastguard</Button></Typography>
            </Grid>
           {/*
            <Grid item xs={12} sm={12} md={3} lg={3}> 
            <Typography onClick={navigateToCoastGuardHomepage}>Army</Typography>
            </Grid>
            
            <Grid item xs={12} sm={12} md={3} lg={3}> 
            <Typography onClick={navigateToCoastGuardHomepage}>Navy</Typography>
            </Grid>
            
            <Grid item xs={12} sm={12} md={3} lg={3}> 
            <Typography onClick={navigateToCoastGuardHomepage}>Airforce</Typography>
            </Grid>
          
    */}
        </Grid>
        </>
    );
}

export default Landing;
