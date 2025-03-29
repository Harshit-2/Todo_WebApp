import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#f5ba13" }}>
      <Toolbar>
        <ChecklistIcon sx={{ mr: 2 }} />
        <Typography variant="h6">
          Todo List App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
