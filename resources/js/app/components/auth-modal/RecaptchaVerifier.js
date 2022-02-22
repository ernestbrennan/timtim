import React, { useRef, useEffect } from 'react';
import firebase from 'firebase/app';

const RecaptchaVerifier = ({ onSolved, ...rest }) => {
  const ref = useRef(null);
  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(ref.current, {
      size: 'normal',
      callback: (response) => {
        onSolved();
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
      },
    });
  }, [ref, onSolved]);
  return <div ref={ref} {...rest}></div>;
};

export default RecaptchaVerifier;
