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

const views = {
  register: 'register',
  registerVerify: 'registerVerify',
}
export default ({handleToLogin}) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [view, setView] = useState(views.register);
  const [errors, setErrors] = useState({})
  const [registerParams, setRegisterParams] = useState({
    phone: '',
    first_name: '',
    last_name: '',
    password: '',
    password_repeat: '',
  })

  const handleRegister = () => {
    AuthService.getInstance().register(registerParams)
      .then((response) => {
        console.log(response.results)
        setView(views.registerVerify)
      })
      .catch((e) => {
        setErrors(e.message)
      })
  }

  const handleVerified = (token) => {
    AuthService.getInstance().setToken(token)
    dispatch(onAuthSuccess());
  }

  return (
    <>
      <BackButton onClick={() => view === views.register ? handleToLogin() : setView(views.register)}/>
      <h2 className={classes.header}>Регистрация</h2>
      {view === views.register && (
        <>
          <div className={classes.info}>Пожалуйста заполните все пустые поля</div>
          <div className={classes.buttons}>

            <PhoneField
              placeholder="Введите номер телефона..."
              label={errors.phone && errors.phone[0]}
              error={!!errors.phone}
              onClick={() => setErrors({...errors, phone: undefined})}
              onChange={(phone) => {setRegisterParams({...registerParams, phone: phone})}}
            />
            <TextField
              className={classes.textField}
              placeholder="Ваше имя..."
              style={{marginTop: 15}}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label={errors.first_name && errors.first_name[0]}
              error={!!errors.first_name}
              onClick={() => setErrors({...errors, first_name: undefined})}
              onChange={(e) => {
                setRegisterParams({...registerParams, first_name: e.target.value})
              }}
            />
            <TextField
              className={classes.textField}
              placeholder="Ваша фамилия..."
              style={{marginTop: 15}}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label={errors.last_name && errors.last_name[0]}
              error={!!errors.last_name}
              onClick={() => setErrors({...errors, last_name: undefined})}
              onChange={(e) => {
                setRegisterParams({...registerParams, last_name: e.target.value})
              }}
            />
            <TextField
              className={classes.textField}
              style={{marginTop: 15}}
              placeholder="Введите пароль..."
              fullWidth
              variant="outlined"
              inputProps={{type: 'password'}}
              InputLabelProps={{ shrink: true }}
              label={errors.password && errors.password[0]}
              error={!!errors.password}
              onClick={() => setErrors({...errors, password: undefined})}
              onChange={(e) => {
                setRegisterParams({...registerParams, password: e.target.value})
              }}
            />
            <TextField
              className={classes.textField}
              style={{marginTop: 15}}
              placeholder="Повторите пароль..."
              fullWidth
              variant="outlined"
              inputProps={{type: 'password'}}
              InputLabelProps={{ shrink: true }}
              label={errors.password_repeat && errors.password_repeat[0]}
              error={!!errors.password_repeat}
              onClick={() => setErrors({...errors, password_repeat: undefined})}
              onChange={(e) => {
                setRegisterParams({...registerParams, password_repeat: e.target.value})
              }}
            />
            <Button
              className={classes.controlButton}
              style={{marginTop: 15}}
              variant="outlined"
              color="primary"
              onClick={handleRegister}
            >
              Далее
            </Button>
          </div>
        </>
      )}
      {view === views.registerVerify && (
        <VerifyPhone
          phone={registerParams.phone}
          handleVerified={handleVerified}
        />
      )}
    </>
  )
}