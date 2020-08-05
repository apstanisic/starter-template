import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/state/store';
import Link from 'next/link';

import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Inbox } from '@material-ui/icons';
import { toggleSidebar } from 'src/state/uiSlice';
import { useAuth } from '../auth/use-auth';

export function AppDrawer({ classes }: { classes: any }) {
  const { ui, nav } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { loggedIn } = useAuth();
  // const match = useRouteMatch();
  const loggedNav = loggedIn
    ? [
        { path: '/ads/followed', name: 'Praceni oglasi' },
        { path: '/ads/owned', name: 'Vasi oglasi' },
        { path: '/ads/new', name: 'Nov oglas' },
        { path: '/account', name: 'Nalog' },
      ]
    : [];
  const links = [...nav.links, ...loggedNav];

  const drawerContent = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* <ListItem>{admin.url.company?.name}</ListItem> */}
        {links.map((item, i) => (
          // <Link to={urlHelper.changeResource(admin.url, item.path)} key={item.path}>
          <Link href={item.path} key={item.path}>
            <ListItem button key={item.path}>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          open={ui.showSidebar}
          onClose={() => dispatch(toggleSidebar())}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          elevation={20}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  );
}
