import React from 'react';
import { AppBar, Toolbar, Button, Stack, Box, ButtonGroup } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Navbar(props) {

    const redirectToLogoutCognitoHostedUI = () => {
            Cookies.remove('jwt')
            Cookies.remove('thread_Id')
            const domainUrl = "https://militaryawardwriter.auth.us-east-2.amazoncognito.com";
            const clientId = "2ftpqjvak8l9j8bep63udhr15u";
            const callbackUrl = "http://localhost:3000";
            const logoutUrl = `${domainUrl}/logout?client_id=${clientId}&logout_uri=${callbackUrl}&redirect_uri=${callbackUrl}&response_type=token`;
            window.location.href = logoutUrl;
    
    };  
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: 25,
    fontWeight: 500
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button component={Link} to="/" style={linkStyle}>
          <HomeIcon sx={{ fontSize: 40, mr: 2 }} />
        </Button>
        <Button component={Link} to="/" style={linkStyle}>
          Home
        </Button>

        <Box width="100%" sx={{}}>
          <Stack gap={5} flexDirection="row" justifyContent="flex-end">
            <ButtonGroup sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
               component={Link} to="/writeaward" style={linkStyle}
                sx={{ color: 'white', fontSize: 25 }}
              >
                Write
              </Button>

              <Button onClick={redirectToLogoutCognitoHostedUI} to="/#about" style={linkStyle}>
                Logout
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
