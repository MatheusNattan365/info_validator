import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@material-ui/core';

import {
  Search,
  People,
  ExitToApp,
  CloudUpload
} from '@material-ui/icons'


import firebase from '../services/firebaseConfig';

import img from '../assets/logoID.png';

const categories = [
  {
    id: 'Funcionalidades',
    children: [
      { id: 'Cad. de Informações', icon: <People />, active: true },
      { id: 'Upload Idoneidade', icon: <CloudUpload />, active: false },
    ],
  },
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#C42021',
    boxShadow: '0 -1px 0 rgba(255, 255, 255, 0.08) inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: '#FFF'
  },
  itemHeader: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#FFF',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  submit: {
    display: 'flex',

  },
  avatarDiv: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    height: '100%',
    width: '100%',
    margin: theme.spacing(2),
    padding: theme.spacing(2)

  }
});


function Navigator(props) {
  const { classes, setacontent, ...other } = props;

  function activeFuncionality(nameOf) {
    setacontent(nameOf);
  }

  const _logOut = async () => {
    await firebase.auth().signOut()
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <div className={classes.avatarDiv}>
          <Avatar src={img} variant="square" className={classes.avatar} />
        </div>
        <ListItem className={clsx(classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <Search />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Sis. de Invetigação Social
          </ListItemText>
        </ListItem>



        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                key={childId}
                button
                onClick={() => activeFuncionality(childId)}
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        startIcon={<ExitToApp />}
        onClick={_logOut}
      >
        Sair
          </Button>
    </Drawer >
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);