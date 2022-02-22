import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import cls from 'classnames';

import AuthHeader from './AuthHeader';
import AuthInfoText from './AuthInfoText';
import AuthButton from './AuthButton';
import useIsMobile from '$app/hooks/useIsMobile';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#EDEDED',
    borderRadius: 100,
    margin: theme.spacing(1),
    transition: 'background 0.4s ease',
  },
  activeDigit: {
    background: '#FFE36F',
  },
  error: {
    fontSize: 14,
    lineHeight: 1.57,
    textAlign: 'center',
    color: '#f44336',
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    width: 41,
    height: 41,
    outline: 0,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 16,
    border: 'none',
    background: 'transparent',
    color: theme.palette.secondary.contrastText,
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },

  container: {
    marginTop: theme.spacing(10),
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));
const PhoneVerificationScreen = ({ phonePrefix, phoneNumber, onVefify, onResendCode, error }) => {
  const info = (
    <>
      <Trans>We've just sent an SMS with a code to the number</Trans> +{phonePrefix}
      {phoneNumber}
    </>
  );
  const refDigit1 = useRef();
  const refDigit2 = useRef();
  const refDigit3 = useRef();
  const refDigit4 = useRef();
  const refDigit5 = useRef();
  const refDigit6 = useRef();
  const classes = useStyles();
  const refs = [refDigit1, refDigit2, refDigit3, refDigit4, refDigit5, refDigit6];

  const [code, setCode] = useState(new Array(6).fill(''));
  const isMobile = useIsMobile();
  useEffect(() => {
    setCode(new Array(6).fill(''));
  }, [error]);
  const onSubmit = () => {
    if (code.some((v) => v.length === 0)) {
      return;
    }
    onVefify(code.join(''));
  };

  const onChange = (e) => {
    const regExp = /\d/;
    if (isMobile && regExp.test(e.target.value)) {
      const curIndex = refs.findIndex((r) => r.current === e.target);
      const newCode = [...code];
      newCode[curIndex] = e.target.value;
      setCode(newCode);
      if (curIndex < code.length - 1) {
        refs[curIndex + 1].current.focus();
      }
    }
  };

  const onEnter = (e) => {
    const curIndex = refs.findIndex((r) => r.current === e.target);
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      e.preventDefault();
      const newCode = [...code];
      newCode[curIndex] = e.key;
      setCode(newCode);
      if (curIndex < code.length - 1) {
        refs[curIndex + 1].current.focus();
      }
    } else if (e.keyCode === 8) {
      if (code[curIndex].length > 0) {
        const newCode = [...code];
        newCode[curIndex] = '';
        setCode(newCode);
      } else if (curIndex > 0) {
        const newCode = [...code];
        newCode[curIndex - 1] = '';
        setCode(newCode);
        if (curIndex > 0) {
          refs[curIndex - 1].current.focus();
        }
      }
    }
  };

  return (
    <>
      <AuthHeader>
        <Trans>Confirmation code</Trans>
      </AuthHeader>
      <AuthInfoText>{info}</AuthInfoText>

      <div className={classes.container}>
        {code.map((code, index) => (
          <div
            className={cls(classes.root, {
              [classes.activeDigit]: code.length > 0,
            })}
            key={index}
          >
            <input
              className={classes.input}
              autoFocus={index === 0}
              maxLength={1}
              type={'number'}
              ref={refs[index]}
              value={code}
              onChange={onChange}
              onKeyDown={onEnter}
            />
          </div>
        ))}
      </div>
      {error && (
        <div className={classes.error}>
          <Trans>Incorrect SMS code</Trans>
        </div>
      )}
      <div className={classes.buttonContainer} onClick={onSubmit}>
        <AuthButton disabled={code.some((v) => v.length === 0)}>
          <Trans>Log in</Trans>
        </AuthButton>
        <Button
          disableElevation
          color="primary"
          style={{
            marginTop: '24px',
            borderBottom: '2px solid rgba(2,163,187, 0.15)',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          onCLick={onResendCode}
        >
          <Trans>Resend SMS code</Trans>
        </Button>
      </div>
    </>
  );
};

export default PhoneVerificationScreen;
