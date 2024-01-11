import React, {useEffect, useContext} from 'react';
import {AccountContext} from '../../Context/Account';
import Cookies from 'js-cookie';
import pool from '../../Userpool';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function CoastGuardHomePage() {
    
    const {getSession, setIsSignedIn,email} = useContext(AccountContext);
    
    const navigate = useNavigate()
   
    
    const handleCognitoLoginRedirect = () => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const idToken = urlParams.get('id_token');
        //const accessToken = urlParams.get('access_token');
       Cookies.set('jwt', idToken, { expires: 1, path: '/' });
    };

    const navigateToNomineeInfo = () =>{
        navigate('/nomineeinfo')
    }
    
   

    useEffect(() => {
        handleCognitoLoginRedirect();
        
    }, []);
 
    //The coastguard homepage will contain the letter types
    const cards = [1];

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={12} md={12}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Achievement Award Letter
                  </Typography>
                  <Typography>
                    This is award is for Coast Guard achievement award letters.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={navigateToNomineeInfo} size="small">Begin Writing</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
}

export default CoastGuardHomePage;
