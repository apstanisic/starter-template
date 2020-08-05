import { Divider, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import React, { Fragment } from 'react';

/**
 * Simple Pair component that adds some spacing,
 * and pushes name to the left, and value to the right
 */
export function Pair({ name, value, border }: { name: any; value: any; border?: boolean }) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('xs'));

  return (
    <Fragment>
      <Grid container spacing={1} className="p-2">
        <Grid item xs={12} sm={6} className="text-left text-blue-800">
          {name}
        </Grid>
        <Grid item xs={12} sm={6} className={isMobile ? 'text-left' : 'text-right'}>
          {value}
        </Grid>
      </Grid>
      {border && <Divider />}
    </Fragment>
  );
}
