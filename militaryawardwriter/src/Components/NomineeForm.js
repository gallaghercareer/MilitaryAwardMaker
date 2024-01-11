import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                www.MilitaryAwardWriter.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function NomineeForm() {

    const navigate = useNavigate()
  
    const navigateToAwardWriter = () =>{
        navigate('/chattoopenai')
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            station: data.get('station'),
            awardStart: data.get('awardStart'),
            awardEnd: data.get('awardEnd'),
        });
    };

    return (

        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm" sx={{ paddingTop: '5rem' }}> {/* Adjusted maxWidth to 'sm' */}
                <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Award Nominee 
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nominee Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="rank"
                                    label="Rank"
                                    id="rank"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="city"
                            label="City"
                            id="city"
                            autoComplete="city"
                        /> </Grid>
                          <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="state"
                            label="State"
                            id="state"
                            autoComplete="state"
                        /></Grid>
                          <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='January'
                            name="AwardStartMonth"
                            label="Award Start (Month)"
                            id="AwardStartMonth"
                            autoComplete="AwardStartMonth"
                        /></Grid>
                          <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='2023'
                            name="AwardStartYear"
                            label="Award Start (Year)"
                            id="AwardStartYear"
                            autoComplete="AwardStartYear"
                        /></Grid>
                          <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='June'
                            name="AwardEndMonth"
                            label="Award End (Month)"
                            id="AwardEndMonth"
                            autoComplete="AwardEndMonth"
                        /></Grid>
                          <Grid item xs={12} md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            placeholder='2024'
                            name="AwardEndYear"
                            label="Award End (Year)"
                            id="AwardEndYear"
                            autoComplete="AwardEndYear"
                        /></Grid>
                        </Grid>
                        
                        <Button
                            onClick={navigateToAwardWriter}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}