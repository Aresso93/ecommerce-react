import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CartButton } from './cart-button';

export default function Header() {
  return (
    <div className='header-container'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
      position="absolute"
      color="info"
      >
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=> alert('Non cliccarmi, non faccio niente')}
          >
             <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mockazon
          </Typography>
          <CartButton/> 
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}