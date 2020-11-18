import React from 'react';
import AppBar from './appBar/AppBar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DrawerList from './drawer/DrawerList';

const drawerWidth = 248;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor : "#fff"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#fff !important',
    boxShadow: 'none !important',
  },
  drawerOpen: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
    border: 'none',
    backgroundColor: '#052971',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
    border: 'none',
    backgroundColor: '#052971',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 5,
    },
  },
  toolbarMenuIcon: {
    backgroundColor: '#052971',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbar: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    backgroundColor: '#fff',
    marginTop: '55px',
    padding: '0',
    flexGrow: 1,
    width: '83.33%',
    padding: theme.spacing(3),
  },
  paper: {
    width: '100%',
    padding: '100px',
  },
  main: {
    width: '100%',
    height: '100%',
    margin: '0 30px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start'
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        anchor="right"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbarMenuIcon}>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronRightIcon style = {{color : "#fff"}} /> : null}
          </IconButton>
        </div>
        <DrawerList isDrawerOpen={open} />
      </Drawer>
      <div className={classes.main}>
        <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
