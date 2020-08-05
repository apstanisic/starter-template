import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { init } from 'src/core/init';
import { initLogin } from 'src/state/authSlice';
import { AppDispatch } from 'src/state/store';
import { ScaffoldAppBar } from './AppBar';
import { AppDrawer } from './AppDrawer';
import AppFooter from './AppFooter';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('md')]: {
        zIndex: theme.zIndex.drawer + 1,
        // If code bellow is uncomented then AppBar won't go over AppDrawer
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      background: '#e0e0e0',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3, 1, 3, 1),
      // paddingBottom: theme.spacing(2),
    },
    wrapper: {
      [theme.breakpoints.up('md')]: {
        maxWidth: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: `100%`,
      },
    },
  }),
);

export function AppScaffold(props: any) {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [loginInited, setLoginInited] = useState(false);

  // Initialize auth
  useEffect(() => {
    init()
      .then(() => dispatch(initLogin()))
      .then(() => setLoginInited(true));
  }, [dispatch]);

  if (!loginInited) return null;

  return (
    <div className={classes.root}>
      {/* Don't use if using tailwind */}
      {/* <CssBaseline /> */}
      <ScaffoldAppBar classes={classes} />
      <AppDrawer classes={classes} />

      {/* Sticky footer */}
      <div className={'flex flex-col flex-grow ' + classes.wrapper} style={{ minHeight: '100vh' }}>
        <main className={classes.content}>
          <div className={classes.toolbar}></div>
          {props.children || <span></span>}
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
