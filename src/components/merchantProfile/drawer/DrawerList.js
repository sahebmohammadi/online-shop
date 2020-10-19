import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarBorder from '@material-ui/icons/StarBorder';
// dshboard list items :
import { drawerListItems, decoojIcons } from './DrawerListItems';
// styling :
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    justifyItems: 'center',
  },
}));
// Drawer List
const DrawerList = (props) => {
  const classes = useStyles();
  const [listItems, setListItems] = React.useState(drawerListItems);

  const handleClick = (item) => {
    let items = [...listItems];
    const index = items.indexOf(item);
    items[index] = { ...items[index] };
    items[index].open = !items[index].open;
    setListItems(items);
  };

  return (
    <List style={{ marginTop: '-30px' }}>
      <>
        <ListItem button key={decoojIcons[0].id}>
          <ListItemIcon style={{ margin: ' 0 65px 30px 0' }}>
            {decoojIcons[0].icon}
          </ListItemIcon>
        </ListItem>
        <ListItem button key={decoojIcons[1].id}>
          <ListItemIcon> {decoojIcons[1].icon}</ListItemIcon>
          <ListItemText primary={decoojIcons[1].text} style={{ textAlign: 'right' }} />
        </ListItem>
      </>

      {listItems.map((item) => {
        const { text, icon, open, id } = item;

        return (
          <React.Fragment key={id}>
            <ListItem
              style={{ marginTop: '25px' }}
              button
              onClick={() => handleClick(item)}
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} style={{ textAlign: 'right' }} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="آیتم 1" />
                </ListItem>
              </List>
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default DrawerList;
