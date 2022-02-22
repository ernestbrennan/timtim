import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {Trans} from "@lingui/macro";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {onAuthSuccess} from '$app/redux/actions/authActions';

import PhoneField from '../components/PhoneField'
import useStyles from '../style';
import AuthService from "$app/services/AuthService";
import VerifyPhone from "$app/components/auth-modal/components/VerifyPhone";
import BackButton from "$app/components/auth-modal/components/BackButton";

const views = {
  login: 'login',
  loginVerify: 'loginVerify',
}
export default (
  {
    handleToResetPassword,
    handleToRegistration,
  }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [view, setView] = useState(views.login);
  const [errors, setErrors] = useState({})
  const [registerParams, setRegisterParams] = useState({
    phone: '',
    password: '',
  })

  const handleLogin = async () => {

    AuthService.getInstance().signIn(registerParams)
      .then((response) => {
        AuthService.getInstance().setToken(response.results.token)
        dispatch(onAuthSuccess());
      })
      .catch((e) => {
        if (e.status_code === 403) {
          return setView(views.loginVerify)
        }

        setErrors(e.message);
      })
  }

  const handleVerified = (token) => {
    AuthService.getInstance().setToken(token)
    dispatch(onAuthSuccess());
  }

  return (
    <>
      <h2 className={classes.header}>
        <Trans>Hello!</Trans>
      </h2>
      {view === views.login && (
        <>
          <div className={classes.info}>
            <Trans>Log in to use all of the TimTim features</Trans>
          </div>
          <div className={classes.buttons}>
            <PhoneField
              placeholder="Введите номер телефона..."
              label={errors.phone && errors.phone[0]}
              error={!!errors.phone}
              onClick={() => setErrors({...errors, phone: undefined})}
              onChange={(phone) => {
                setRegisterParams({...registerParams, phone: phone})
              }}
            />
            <TextField
              className={classes.textField}
              style={{marginTop: 15}}
              placeholder="Введите пароль..."
              fullWidth
              variant="outlined"
              inputProps={{type: 'password'}}
              InputLabelProps={{shrink: true}}
              label={errors.password && errors.password[0]}
              error={!!errors.password}
              onClick={() => setErrors({...errors, password: undefined})}
              onChange={(e) => {
                setRegisterParams({...registerParams, password: e.target.value})
              }}
            />
            <Button
              className={classes.controlButton}
              style={{marginTop: 10}}
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Вход
            </Button>

            <Button
              onClick={handleToRegistration}
              className={classes.controlButton}
              style={{marginTop: 10}}
              variant="outlined"
              color="primary"
            >
              Регистрация
            </Button>

            <Button
              onClick={handleToResetPassword}
              className={classes.linkButton}
              style={{marginTop: 10}}
              color="primary"
            >
              Забыли пароль?
            </Button>
          </div>
        </>
      )}
      {view === views.loginVerify && (
        <>
          <BackButton onClick={() => setView(views.login)}/>
          <VerifyPhone
            phone={registerParams.phone}
            handleVerified={handleVerified}
          />
        </>
      )}
    </>
  )
}