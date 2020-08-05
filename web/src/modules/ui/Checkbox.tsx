import { Checkbox, FormControlLabel, FormControl } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';

interface Props {
  name: string;
  label?: string;
}

/**
 * Checkbox that works with Formik context built with Material ui
 */
export function CheckboxField({ name, label }: Props) {
  const [field] = useField({ type: 'checkbox', name });
  return (
    <FormControl fullWidth>
      <FormControlLabel control={<Checkbox color="primary" {...field} />} label={label ?? ''} />
    </FormControl>
  );
}
