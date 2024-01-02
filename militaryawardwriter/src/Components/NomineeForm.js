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

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function NomineeForm() {
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                
                    <Typography component="h1" variant="h5">
                        Award Nominee 
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="rank"
                            label="Rank"
                            id="rank"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="city"
                            label="City"
                            id="city"
                            autoComplete="city"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="state"
                            label="State"
                            id="state"
                            autoComplete="state"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="AwardStartMonth"
                            label="Award Start (Month)"
                            id="AwardStartMonth"
                            autoComplete="AwardStartMonth"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="AwardStartYear"
                            label="Award Start (Year)"
                            id="AwardStartYear"
                            autoComplete="AwardStartYear"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="AwardEndMonth"
                            label="Award End (Month)"
                            id="AwardEndMonth"
                            autoComplete="AwardEndMonth"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="AwardEndYear"
                            label="Award End (Year)"
                            id="AwardEndYear"
                            autoComplete="AwardEndYear"
                        />
                        
                     
                        <Button
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