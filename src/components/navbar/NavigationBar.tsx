// import libraries
import * as React from 'react';
import { Redirect } from 'react-router-dom';

// import Carousel from 'react-material-ui-carousel';
import {
  Button,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu
} from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

// interfaces
import { NavigationBarProps } from './interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const NavigationBar = (props: NavigationBarProps) => {
  const { auth, signoutUser } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Button href="/" style={{color: "white"}}>
            PM - APP
            </Button>
          </Typography>
          {auth.isAuthenticated ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem><Button href="/">All products</Button></MenuItem>
                <MenuItem><Button href="/products">Add product</Button></MenuItem>
                <MenuItem onClick={handleClose}>My products</MenuItem>
                <MenuItem onClick={signoutUser}>Logout</MenuItem>
              </Menu>
            </div>
          ): <MenuItem><Button href="/auth" style={{color: "white"}}>Login</Button></MenuItem>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;

