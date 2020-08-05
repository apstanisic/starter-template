import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectField,
  FormHelperText,
} from '@material-ui/core';
import { useField } from 'formik';
import React, { memo } from 'react';

/**  Option can be single string or object with diferent properties */
type Option = { value: any; text: any } | string | number;

/** Props passed to select component */
interface Props {
  name: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * Custom select component using material ui
 * Must be used in Formik context because it reads values from there
 */
export const Select = memo((props: Props) => {
  const [field, { error, touched }] = useField(props);

  const haveError = error && touched ? true : false;
  const errorText = error && touched ? error : undefined;

  return (
    <FormControl style={{ height: 70 }} fullWidth variant="outlined" error={haveError}>
      {/* bg white fixes border going over text */}
      <InputLabel style={{ backgroundColor: 'white' }} id={props.name}>
        {props.placeholder}
      </InputLabel>
      <SelectField required={props.required} disabled={props.disabled} {...field}>
        {props.placeholder && (
          <MenuItem key={1000} value="">
            {props.placeholder}
          </MenuItem>
        )}
        {props.options.map((item, i) => (
          <MenuItem key={i} value={typeof item === 'object' ? item.value : item}>
            {typeof item === 'object' ? item.text : item}
          </MenuItem>
        ))}
      </SelectField>
      {haveError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
});
