import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import { AccountCircle, AddCircle, Menu } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/state/store';
import { toggleSidebar } from 'src/state/uiSlice';
import { useAuth } from '../auth/use-auth';

export function ScaffoldAppBar({ classes }: { classes?: any }) {
  const auth = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <Link href="/">
          <a>
            <h1 className="text-2xl">Nadji auto</h1>
          </a>
        </Link>
        <div className="ml-auto">
          {auth.loggedIn ? (
            <Fragment>
              <IconButton color="inherit" onClick={() => router.push('/ads/new')}>
                <AddCircle />
              </IconButton>

              <IconButton color="inherit" onClick={() => router.push('/account')}>
                <AccountCircle />
              </IconButton>
            </Fragment>
          ) : (
            <Fragment>
              <Link href="/auth/login">
                <Button color="inherit">Uloguj se</Button>
              </Link>
              <Link href="/auth/register">
                <Button color="inherit">Registruj se</Button>
              </Link>
            </Fragment>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
