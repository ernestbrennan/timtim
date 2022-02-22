import React, {useEffect} from 'react';
import '../../sass/app/sanitize.css';
import {ThemeProvider} from '@material-ui/styles';
import {BrowserRouter as Router} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Div100vh from 'react-div-100vh';
import {i18n} from '@lingui/core';
import {I18nProvider} from '@lingui/react';
import dayjs from 'dayjs';
import {uz, ru} from 'make-plural/plurals';

import {AppRoutes, MetaRoutes} from './AppRoutes';
import ApplicationBar from '$app/components/app-bar';
import SideMenu from '$app/components/side-menu';
import AuthModal from '$app/components/auth-modal';

import theme from '$app/theme';
import {messages} from '$app/locales/ru/messages';
import {activateLanguage, isSupportedLanguage} from '$app/utlis/localization'
import {onAuthSuccess} from '$app/redux/actions/authActions';
import AuthService from "$app/services/AuthService";

const mainContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100vw',
};

dayjs.locale('ru');
i18n.load('ru', messages);
i18n.loadLocaleData('ru', {plurals: ru});
i18n.loadLocaleData('uz', {plurals: uz});
i18n.activate('ru');

function App() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.ui.language);

  useEffect(() => {
    const token = AuthService.getInstance().getToken();

    if (token && token.length) {
      dispatch(onAuthSuccess());
    }
  }, [dispatch]);

  useEffect(() => {
    if (language && isSupportedLanguage(language)) {
      activateLanguage(language);
      dayjs.locale(language);
    }
  }, [language]);

  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Router>
          <Div100vh>
            <div style={mainContainerStyle}>
              <header>
                <ApplicationBar/>
              </header>

              <MetaRoutes>
                <AppRoutes/>
              </MetaRoutes>
              <SideMenu/>
              <AuthModal/>
            </div>
          </Div100vh>
        </Router>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
