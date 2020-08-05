import { Box, TextField } from '@material-ui/core';
import { useField } from 'formik';
import React, { memo } from 'react';

interface Props {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  /** Transform into textarea */
  multiline?: boolean;
  rows?: number;
}

/** Input for Formik context built with material ui */
export const Input = memo((props: Props) => {
  const [field, { error, touched }] = useField(props);

  const haveError = error && touched ? true : false;
  const errorText = error && touched ? error : undefined;

  return (
    <Box style={{ minHeight: 75 }}>
      <TextField
        fullWidth
        className={props.className ?? ''}
        error={haveError}
        helperText={errorText}
        variant="outlined"
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
        type={props.type ?? 'text'}
        multiline={props.multiline}
        rows={props.rows}
        {...field}
      />
    </Box>
  );
});
