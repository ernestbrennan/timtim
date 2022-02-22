import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import AuthService from '$app/services/AuthService'
import VerifyCodeField from './VerifyCodeField'
import useStyles from '../style';

export default ({phone, handleVerified}) => {
  const classes = useStyles();

  const [code, setCode] = useState('')
  const [errors, setErrors] = useState({})

  const handleVerifyCode = () => {
    AuthService.getInstance().verify(Number.parseInt(code.replace(/ /g, "")))
      .then((response) => {
        handleVerified(response.results.token)
      })
      .catch((e) => {
        setErrors(e.message)
      })
  }

  const handleResendVerifyCode = () => {
    AuthService.getInstance().resendVerifyCode(phone)
  }

  return (
    <>
      <div className={classes.info}>
        На ваш номер {phone} был выслан код, введите код для подтверждения
      </div>
      <div className={classes.buttons}>
        <VerifyCodeField
          placeholder="Введите код из SMS..."
          fullWidth
          variant="outlined"
          onChange={(code) => setCode(code)}
          onClick={() => setErrors({...errors, code: undefined})}
          label={errors.code && errors.code[0]}
          error={!!errors.code}
        />
        <Button
          onClick={handleResendVerifyCode}
          className={classes.linkButton}
          style={{marginTop: 10}}
          color="primary"
        >
          Отправить снова
        </Button>
        <Button
          className={classes.controlButton}
          style={{marginTop: 10}}
          variant="outlined"
          color="primary"
          onClick={handleVerifyCode}
        >
          Отправить
        </Button>

      </div>
    </>
  )
}