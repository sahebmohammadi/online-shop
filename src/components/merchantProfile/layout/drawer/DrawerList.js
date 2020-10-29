import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Link from 'next/link';
// dshboard list items :
import { drawerListItems, decoojIcons } from './DrawerListItems';

// styling
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(10),
  },
  icon: {
    justifyItems: 'center',
  },
  link: {
    textDecoration: 'none',
    fontSize: '12px !important',
    color: '#004F9D',
  },
}));
// Drawer List
const DrawerList = ({ isDrawerOpen }) => {
  const classes = useStyles();
  const [listItems, setListItems] = React.useState(drawerListItems);

  const handleClick = (item) => {
    let items = [...listItems];
    const index = items.indexOf(item);
    items[index] = { ...items[index] };
    items[index].isExpand = !items[index].isExpand;
    setListItems(items);
  };
  const collapseItems = (isExpand, subListItems) => {
    return (
      <Collapse in={isExpand} timeout="auto" unmountOnExit>
        {subListItems ? (
          <List component="div">
            {subListItems.map((subItem) => {
              const { text, id, link } = subItem;
              return (
                <React.Fragment key={id}>
                  <Link href={link}>
                    <a className={classes.link}>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary={text} />
                      </ListItem>
                    </a>
                  </Link>
                </React.Fragment>
              );
            })}
          </List>
        ) : null}
      </Collapse>
    );
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
        const { text, icon, isExpand, id, subListItems } = item;
        return (
          <React.Fragment key={id}>
            <ListItem
              style={{ marginTop: '5px' }}
              button
              onClick={() => handleClick(item)}
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} style={{ textAlign: 'right' }} />
              {isExpand ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {isDrawerOpen ? collapseItems(isExpand, subListItems) : null}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default DrawerList;
