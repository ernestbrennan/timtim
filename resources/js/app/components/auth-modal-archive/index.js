import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  FormControl,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {darken} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import {Trans, t} from '@lingui/macro';
import classNames from 'classnames';

import phones from './phones';
import SignInButton from './SignInButton';
import RecaptchaVerifier from './RecaptchaVerifier';
import PhoneVerificationScreen from './PhoneVerificationScreen';
import {onAuthRequestCanceled, onAuthSuccess} from '$app/redux/actions/authActions';
import FirebaseService from '$app/services/firebase/FirebaseService';
import FacebookColorIcon from '$app/icons/social/FacebookColorIcon';
import GmailColorIcon from '$app/icons/social/GmailColorIcon';
import PhoneIcon from '$app/icons/social/PhoneIcon';
// import CloseIcon from '$app/icons/CloseIcon';
import useStyles from './style';
import authModalIllustration from '@app/img/authModalIllustration.png'
import IconButton from "@material-ui/core/IconButton";

const authStartedSelector = (state) => state.auth.isAuthRequestStared;

const PhoneTextField = withStyles({
  root: {
    '& .MuiInput-input': {
      padding: '6px 0 22px',
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        margin: 0,
      },
      '&[type=number]': {
        '-webkit-appearance': 'textfield',
        '-moz-appearance': 'textfield',
      },
    },
  },
})(TextField);

const BackButton = (props) => {
  const styles = useStyles();
  return (
    <Button size={'small'} className={styles.backButton} {...props}>
      {'\u276E'} <Trans>Back</Trans>
    </Button>
  );
};

const AuthModalViews = {
  authMethodSelect: 'authMethodSelect',
  phoneEnter: 'phoneEnter',
  verification: 'verification',
};

const Index = () => {
  const isOpen = useSelector(authStartedSelector);
  const classes = useStyles();
  const dispatch = useDispatch();
  const cityName = useSelector((state) => state.cities.currentCity?.name);
  const advType = useSelector((state) => state.filters.advType);
  const closeHandler = useCallback(() => {
    setView(AuthModalViews.authMethodSelect);
    dispatch(onAuthRequestCanceled());
  }, [dispatch]);

  const [view, setView] = useState(AuthModalViews.authMethodSelect);

  const [phonePrefix, setPhonePrefix] = useState(380);
  // eslint-disable-next-line
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [verificationResult, setVerficationResult] = useState(null);
  const [phone, setPhone] = useState('');
  // eslint-disable-next-line
  const [isCodeVerificationError, setIsCodeVerificationError] = useState(false);

  const [phoneError, setPhoneError] = useState(null);

  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  useEffect(() => {
    if (isOpen) {
      setPhone('');
      setView(AuthModalViews.authMethodSelect);
    }
  }, [isOpen]);

  useEffect(() => {
    setPhoneError(null);
  }, [phone]);

  const onCaptchaSolved = useCallback(() => {
    setIsCaptchaSolved(true);
    setView(AuthModalViews.phoneEnter);
  }, [setView, setIsCaptchaSolved]);

  const onFacebookAuth = () => {
    FirebaseService.getInstance()
      .signInWithFacebook()
      .then((result) => {
        dispatch(onAuthSuccess());
      });
  };
  const onGoogleAuth = () => {
    FirebaseService.getInstance()
      .signInWithGoogle()
      .then((result) => {
        dispatch(onAuthSuccess());
      });
  };
  const onPhoneAuth = () => {
    setIsCaptchaSolved(false);
    FirebaseService.getInstance()
      .signInWithPhone(`+${phonePrefix}${phone}`, window.recaptchaVerifier)
      .then((result) => {
        setVerficationResult(result);
        setView(AuthModalViews.verification);
      })
      .catch((e) => {
        switch (e.code) {
          case 'auth/invalid-phone-number':
            setPhoneError(t`Wrong number`);
            break;
          default:
            setPhoneError('Сервис недоступен');
        }
      });
  };
  const onVerifyPhone = (code) => {
    verificationResult
      .confirm(code)
      .then((result) => {
        dispatch(onAuthSuccess());
      })
      .catch((error) => {
        console.error('wrong code', error); //TODO: fix error handling in auth
      });
  };

  return (
    <div className={classes.top}>

      <Modal
        aria-labelledby="Auth window"
        aria-describedby="Sign-in"
        open={isOpen}
        BackdropProps={{
          className: classes.backdrop,
        }}
      >
        <div className={classes.root}>
          <div className={classes.container}>

            <div className={classes.imageContainer}>
              <img src={authModalIllustration} alt={''}/>
            </div>

            <div className={classes.content}>
              <IconButton className={classes.closeBtn} onClick={closeHandler}>
                <CloseIcon/>
              </IconButton>

              {view === AuthModalViews.authMethodSelect && (
                <>
                  <h2
                    className={classNames(classes.header, {
                      [classes.marginTop]: isMobile,
                    })}
                  >
                    <Trans>Hello!</Trans>
                  </h2>
                  <div className={classes.info}>
                    <Trans>Log in to use all of the TimTim features</Trans>
                  </div>
                  <div className={classes.buttons}>
                    <SignInButton Icon={FacebookColorIcon} onClick={onFacebookAuth}>
                      <Trans>Log in using Facebook</Trans>
                    </SignInButton>
                    <SignInButton Icon={GmailColorIcon} onClick={onGoogleAuth}>
                      <Trans>Log in using Google</Trans>
                    </SignInButton>
                    <SignInButton Icon={PhoneIcon} onClick={() => setView(AuthModalViews.phoneEnter)}>
                      <Trans>Log in using phone number</Trans>
                    </SignInButton>
                  </div>
                </>
              )}
              {view === AuthModalViews.phoneEnter && (
                <>
                  <BackButton onClick={() => setView(AuthModalViews.authMethodSelect)}/>
                  <h2 className={classes.header}>
                    <Trans>Login</Trans>
                  </h2>
                  <div className={classes.info}>
                    <Trans>Use your phone number for authorization</Trans>
                  </div>
                  <div className={classes.form}>
                    <FormControl className={classes.formControl}>
                      <Select value={phonePrefix} onChange={(e) => setPhonePrefix(e.target.value)}>
                        {phones.map((phone, index) => (
                          <MenuItem value={parseInt(phone.dial_code)} key={index}>{phone.dial_code}</MenuItem>
                        ))}
                      </Select>
                      <PhoneTextField
                        required
                        error={!!phoneError}
                        label={phoneError ? phoneError : <Trans>Phone number</Trans>}
                        type="number"
                        className={classes.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      >
                      </PhoneTextField>
                    </FormControl>
                  </div>
                </>
              )}
              <RecaptchaVerifier
                style={{display: isCaptchaSolved ? 'none' : 'flex'}}
                onSolved={onCaptchaSolved}
                className={classes.captcha}
              >
              </RecaptchaVerifier>
              {view === AuthModalViews.phoneEnter && (
                <div className={classes.nextButton} onClick={() => onPhoneAuth()}>
                  <Trans>Next</Trans>
                </div>
              )}
              {view === AuthModalViews.verification && (
                <>
                  <BackButton onClick={() => setView(AuthModalViews.authMethodSelect)}/>
                  <PhoneVerificationScreen
                    phonePrefix={phonePrefix}
                    phoneNumber={phone}
                    onVefify={onVerifyPhone}
                    onResendCode={onPhoneAuth}
                    error={isCodeVerificationError}
                  >
                  </PhoneVerificationScreen>
                </>
              )}
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Index;
