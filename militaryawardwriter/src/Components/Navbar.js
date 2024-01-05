import React, {useState,useEffect,useContext,useRef } from 'react';
import { AppBar, Toolbar, Button, Stack, Box, ButtonGroup, Grid,MenuItem, Menu} from '@mui/material';
import Cookies from 'js-cookie';
import Typography from '@mui/material/Typography';
import {AccountContext} from '../Context/Account';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';
import { Account } from 'aws-sdk';
function Navbar(props) {
  const navbarRef = useRef(null);

  //const  setNavbarHeight = useContext(AccountContext);

  const {logout} = useContext(AccountContext);
  const {login} = useContext(AccountContext);
  const {email} = useContext(AccountContext);
  
  useEffect(() => {
    if (navbarRef.current) {
      //setNavbarHeight(navbarRef.current.clientHeight);
    }
  }, []);

  const navigate = useNavigate()

  const navigateToCoastGuardHomepage = () =>{
    navigate('/coastguard')
}
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: 25,
    fontWeight: 500
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

  const handleClose = () => {
    setAnchorEl(null);
};
  return (
    <AppBar ref={navbarRef}position="sticky" elevation={0} style={{ top:0,height: '10vh', backgroundColor: 'white', borderBottom: '1px solid #e0e0e0'  }}>
    <Toolbar>
      <Grid container alignItems="center">
        <Grid item xs={false} sm={2} md={2} lg={2} /> {/* Empty space for columns 1-4 */}
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Typography onClick={navigateToCoastGuardHomepage} className="awards-hover" style={{ color: 'black', textAlign: 'left' }}>Awards</Typography>
        </Grid>
        <Grid item xs={false} sm={4} md={4} lg={4} style={{ textAlign: 'right' }}>
        <Button onClick={handleClick}><MenuIcon style={{color: "black"}}/></Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Option 1</MenuItem>
                            <MenuItem onClick={handleClose}>Option 2</MenuItem>
                            <MenuItem onClick={handleClose}>Option 3</MenuItem>
                            </Menu>
         {email ? <Button onClick={logout} style={{ color: 'black' }}>Sign Out</Button> : <Button onClick={login} style={{ color: 'black' }}>Sign In</Button>}

        </Grid>
        <Grid item xs={false} sm={2} md={2} lg={2}></Grid> {/* Empty space for columns 8-12 */}
      </Grid>
    </Toolbar>
  </AppBar>
      )
    }
  
export default Navbar;
