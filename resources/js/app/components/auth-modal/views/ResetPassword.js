import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";

import PhoneField from "$app/components/auth-modal/components/PhoneField";
import {onAuthSuccess} from "$app/redux/actions/authActions";
import AuthService from '$app/services/AuthService'
import BackButton from '../components/BackButton'
import VerifyPhone from '../components/VerifyPhone'
import useStyles from '../style';
import {resetPasswordSendPhone} from "$app/api/auth";

const views = {
  enterPhone: 'enterPhone',
  verifyCode: 'verifyCode',
  enterPassword: 'enterPassword',
}
export default ({handleToLogin}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [view, setView] = useState(views.enterPhone);
  const [errors, setErrors] = useState({})
  const [params, setParams] = useState({
    phone: '',
    code: '',
    token: '',
    password: '',
    password_repeat: '',
  })

  const handleSendPhone = () => {
    AuthService.getInstance().resetPassword(params.phone)
      .then((response) => {
        setView(views.verifyCode)
      })
      .catch((e) => {
        setErrors(e.message)
      })
  }

  const handleSendPassword = (token) => {
    AuthService.getInstance().resetPasswordNewPassword({
      password: params.password,
      password_repeat: params.password_repeat,
      token: params.token,
    })
      .then((response) => {
        AuthService.getInstance().setToken(params.token)
        dispatch(onAuthSuccess());
      })
      .catch((e) => {
        setErrors(e.message)
      })
  }

  const handleVerified = (token) => {
    setParams({...params, token: token})
    setView(views.enterPassword);
  }

  return (
    <>
      <BackButton onClick={() => view === views.enterPhone ? handleToLogin() : setView(views.enterPhone)}/>
      <h2 className={classes.header}>Восстановление пароля</h2>
      {view === views.enterPhone && (
        <>
          <div className={classes.info}>Введите номер телефона , к которому был привязан ваш аккаунт</div>
          <div className={classes.buttons}>

            <PhoneField
              placeholder="Введите номер телефона..."
              label={errors.phone && errors.phone[0]}
              error={!!errors.phone}
              onClick={() => setErrors({...errors, phone: undefined})}
              onChange={(phone) => {
                setParams({...params, phone: phone})
              }}
            />
            <Button
              className={classes.controlButton}
              style={{marginTop: 15}}
              variant="outlined"
              color="primary"
              onClick={handleSendPhone}
            >
              Далее
            </Button>
          </div>
        </>
      )}
      {view === views.verifyCode && (
        <VerifyPhone
          phone={params.phone}
          handleVerified={handleVerified}
        />
      )}
      {view === views.enterPassword && (
        <>
          <div className={classes.info}>Данный пароль будет использоваться при каждом входе</div>
          <div className={classes.buttons}>
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
                setParams({...params, password: e.target.value})
              }}
            />
            <TextField
              className={classes.textField}
              style={{marginTop: 15}}
              placeholder="Повторите пароль..."
              fullWidth
              variant="outlined"
              inputProps={{type: 'password'}}
              InputLabelProps={{shrink: true}}
              label={errors.password_repeat && errors.password_repeat[0]}
              error={!!errors.password_repeat}
              onClick={() => setErrors({...errors, password_repeat: undefined})}
              onChange={(e) => {
                setParams({...params, password_repeat: e.target.value})
              }}
            />
            <Button
              className={classes.controlButton}
              style={{marginTop: 15}}
              variant="outlined"
              color="primary"
              onClick={handleSendPassword}
            >
              Далее
            </Button>
          </div>

        </>
      )}
    </>
  )
}