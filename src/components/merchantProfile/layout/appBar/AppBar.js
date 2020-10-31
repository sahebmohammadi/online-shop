import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Link from 'next/link';
import Avatar from '@material-ui/core/Avatar';
import { useRouter } from 'next/router';
import { getMerchantData } from 'services/getMerchantService';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  appBar: {
    display: 'flex',
    direction: 'row-reverse',
    boxShadow: 'none',
    background: '#fff',
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  search: {
    display: 'flex',
    justifyContent: 'space-between',
    alignAitems: 'center',
    height: '66px',
    color: '#979797',
    padding: '20px 60px 15px 20px',
    boxSizing: 'border-box',
    textAlign: 'rtl',
    width: '90% !important',
    position: 'relative',
    backgroundColor: fade(theme.palette.secondary.main, 0.01),
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, 0.15),
    },
    borderRadius: '34px',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
    margin: '24px 80px 0 0',
    fontSize: '20px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  addingProduct: {
    // width: '240px !important',
    cursor: 'pointer',
    padding: '15px 5px',
    height: '39px',
    borderRadius: '10px',
    boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.05)',
    border: 'solid 0.5px #e8e8e8',
    backgroundColor: '#052971',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    right: '20px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignself: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: "red",
    // width: '34%',
    width: '340px',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const drawerWidth = 240;
export default function DenseAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [merchantImage, setMerchantImage] = useState(null);
  const [merchantName, setMerchantName] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  //usEffect : decode token to get user Id
  useEffect(() => {
    getMerchant();
  }, []);
  const getMerchant = async () => {
    try {
      const jwt = localStorage.getItem('token');
      const { data: responseData } = await getMerchantData(jwt);
      const { user } = responseData.data;
      const { profile } = user[0];
      setMerchantName(profile.name);
      setMerchantImage(profile.profile_image);
    } catch (error) {}
  };
  // handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // Route :
  const router = useRouter();
  const handleLogOut = () => {
    console.log('Log out clicked');
    localStorage.clear('token');
    router.push('/');
  };
  // DESKTOP MENU :
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      direction="row-reverse"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}></MenuItem>
      <MenuItem onClick={handleLogOut}>خروج</MenuItem>
    </Menu>
  );
  // MOBILE MENU
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem color="primary">
        <Link href="#">
          <div className={classes.addingProduct}>
            <AddRoundedIcon style={{ color: '#ffffff' }} />
            <Typography style={{ fontSize: '15px', color: '#fff' }}>
              اضافه کردن محصول
            </Typography>
          </div>
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton color="primary">
          <Badge color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/* <p>Notifications</p> */}
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          {merchantImage ? (
            <Avatar src={merchantImage ? merchantImage : null} alt="P"></Avatar>
          ) : (
            <Avatar></Avatar>
          )}
        </IconButton>
        <p>خروج</p>
      </MenuItem>
      <MenuItem>
        <Typography style={{ fontSize: '12px' }}>
          {merchantName ? merchantName : null}
        </Typography>
      </MenuItem>
    </Menu>
  );

  const { open, handleDrawerOpen } = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="جستجو ..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/* adding new product */}
              <Link href="/">
                <div className={classes.addingProduct}>
                  <AddRoundedIcon style={{ color: '#ffffff' }} />
                  <Typography style={{ fontSize: '15px', color: '#fff' }}>
                    اضافه کردن محصول
                  </Typography>
                </div>
              </Link>

              <IconButton aria-label="" color="inherit">
                <Badge color="error">
                  <NotificationsIcon color="primary" />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {merchantImage ? (
                  <Avatar src={merchantImage ? merchantImage : null} alt="P"></Avatar>
                ) : (
                  <Avatar></Avatar>
                )}
              </IconButton>
              <Typography style={{ fontSize: '12px' }}>
                {merchantName ? merchantName : null}
              </Typography>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon color="primary" />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
