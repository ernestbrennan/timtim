import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MaskedInput from 'react-text-mask';
import phones from '../phones';
import useStyles from "../style";

const PhoneMask = ({inputRef, ...props}) => (
  <MaskedInput
    {...props}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={[
      '(',
      /[1-9]/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/
    ]}
    placeholderChar={'\u2000'}
  />
);


export default (
  {
    onChange,
    ...props
  }
) => {
  const styles = useStyles();

  const [phonePrefix, setPhonePrefix] = useState('+998');
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    onChange(`${phonePrefix}${phoneNumber?.replace(/\D/g,'')}`)
  }, [phonePrefix, phoneNumber]);

  return (
    <div style={{ position: 'relative', width: '100%'}}>
      <Select
        className={styles.phoneFieldSelect}
        value={phonePrefix}
        onChange={(e) => setPhonePrefix(e.target.value)}
      >
        {phones.map((phone, index) => (
          <MenuItem value={phone.dial_code} key={index}>{phone.dial_code}</MenuItem>
        ))}
      </Select>

      <TextField
        className={styles.phoneField}
        fullWidth
        variant="outlined"
        {...props}
        InputProps={{
          onChange: (e => setPhoneNumber(e.target.value)),
          // inputComponent: PhoneMask,
        }}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  )
}