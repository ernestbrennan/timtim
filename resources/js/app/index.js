import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactPixel from 'react-facebook-pixel';
import 'dayjs/locale/ru';
import "external-svg-loader";

import '../../sass/app/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/configureStore';
const { store, persistor } = configureStore({});
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

const options = {
  autoConfig: true,
  debug: false, // enable logs
};
ReactPixel.init('2760264717365899', options);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
