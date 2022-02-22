import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {onAuthRequestCanceled} from '$app/redux/actions/authActions';
import useStyles from './style';
import authModalIllustration from '@app/img/authModalIllustration.png'
import IconButton from "@material-ui/core/IconButton";

import LoginView from './views/Login'
import RegistrationView from './views/Registration'
import ResetPasswordView from './views/ResetPassword'

const authStartedSelector = (state) => state.auth.isAuthRequestStared;

const views = {
  login: 'login',
  registration: 'registration',
  reset_password: 'reset_password',
};

const Index = () => {
  const isOpen = useSelector(authStartedSelector);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [view, setView] = useState(views.login);

  const closeHandler = useCallback(() => {
    setView(views.login);
    dispatch(onAuthRequestCanceled());
  }, [dispatch]);


  useEffect(() => {
    if (isOpen) {
      setView(views.login);
    }
  }, [isOpen]);

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

            <div className={classes.imageWrapper}>
              <img src={authModalIllustration} alt={''}/>
            </div>

            <div className={classes.controlsWrapper}>
              <div className={classes.content}>
                <IconButton className={classes.closeBtn} onClick={closeHandler}>
                  <CloseIcon/>
                </IconButton>

                {view === views.login && (
                  <LoginView
                    handleToRegistration={() => setView(views.registration)}
                    handleToResetPassword={() => setView(views.reset_password)}
                  />
                )}
                {view === views.registration && (
                  <RegistrationView handleToLogin={() => setView(views.login)}/>
                )}
                {view === views.reset_password && (
                  <ResetPasswordView handleToLogin={() => {
                    setView(views.login)
                    console.log(view)
                  }}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Index;


