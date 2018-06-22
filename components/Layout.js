import React, { Component, Fragment } from 'react';
import {} from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Navigation from './Navigation';

const drawerWidth = 240;

const styles = (theme) => ({
  '@global': {
    'html, body, #__next ': {
      display: 'flex',
      width: '100%',
      flex: 1,
      margin: 0,
      height: '100vh',
    },
    '#__next': {
      flexDirection: 'column',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  drawerDocked: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: 'auto',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  content: {
    display: 'flex',
    flex: 1,
  },
  container: {
    padding: 32,
    margin: 0,
  }
});

@withStyles(styles)
export default class Layout extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <Fragment>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Next Starter
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbar} />
        <div className={classes.content}>
          <Drawer
            variant="permanent"
            classes={{
              docked: classes.drawerDocked,
              paper: classes.drawerPaper,
            }}
          >
            <Navigation />
          </Drawer>
          <Grid container className={classes.container} spacing={24}>
            {children}
          </Grid>
        </div>
        <Helmet
          titleTemplate='%s | Next Starter'
          htmlAttributes={{ lang: 'en', amp: undefined }}
          titleAttributes={{ itemprop: 'name', lang: 'en' }}
          meta={[
            { name: 'charset', content: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { property: 'og:title', content: 'Next Starter' },
          ]}
        />
      </Fragment>
    );
  }
}
