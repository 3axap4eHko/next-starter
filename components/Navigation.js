import React, { Component, Fragment } from 'react';
import {} from 'prop-types';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SubjectIcon from '@material-ui/icons/Subject';
import CalendarIcon from '@material-ui/icons/Today';
import CopyrightIcon from '@material-ui/icons/Copyright';

function Item({ to, title, icon: Icon }) {
  return (
    <Link href={to}>
      <ListItem button>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
}

export default class Navigation extends Component {
  render() {
    return (
      <Fragment>
        <Divider />
        <List component="nav">
          <Item to="/" title="Dashboard" icon={DashboardIcon} />
          <Item to="/posts" title="Posts" icon={SubjectIcon} />
          <Item to="/calendar" title="Calendar" icon={CalendarIcon} />
        </List>
        <Divider />
        <div style={{ flex: 1 }} />
        <Divider />
        <List component="nav">
          <ListItem>
            <ListItemIcon>
              <CopyrightIcon />
            </ListItemIcon>
            <ListItemText primary="Next Starter" />
          </ListItem>
        </List>
      </Fragment>
    );
  }
}
