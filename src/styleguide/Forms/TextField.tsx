import { FieldProps } from 'formik';
import React from 'react';

import { OutlinedTextFieldProps, TextField as MTextField } from '../index';

interface Props extends FieldProps, OutlinedTextFieldProps {}
const TextField: React.FC<Props> = ({ field, ...props }) => (
  <MTextField
    onChange={e => {
      field.onChange(e);
    }}
    value={field.value}
    onBlur={field.onBlur}
    {...props}
  />
);

export default TextField;
