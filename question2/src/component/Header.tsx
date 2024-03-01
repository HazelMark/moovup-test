import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (<Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{display: location.pathname === '/' ? 'none':'block'}}
            >
                <Link to="/">
                    <ArrowBackIosNewIcon style={{color: 'white'}}/>
                </Link>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: location.pathname === '/' ? 'block':'none' }}>
                My Friends
            </Typography>
        </Toolbar>
    </AppBar>
  </Box>)  
}


export default Header;

