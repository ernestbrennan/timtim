import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MaskedInput from 'react-text-mask';
import phones from '../phones';
import useStyles from "../style";

const CodeMask = ({inputRef, ...props}) => (
  <MaskedInput
    {...props}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={[
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
    ]}
    placeholderChar={'\u2000'}
  />
);

export default (
  {
    code,
    onChange,
    ...props
  }
) => {
  const styles = useStyles();

  return (
    <div style={{ position: 'relative', width: '100%'}}>
      <TextField
        className={styles.textField}
        fullWidth
        variant="outlined"
        {...props}
        InputProps={{
          onChange: e => onChange(e.target.value),
          inputComponent: CodeMask,
        }}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  )
}