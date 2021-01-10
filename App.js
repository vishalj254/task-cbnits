/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {Colors} from './src/Config/Colors';
import AppRouter from './src/Navigation/AppRouter/AppRouter';
import store from './src/Reducer/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor={Colors.red} barStyle={'default'} />
        <AppRouter />
      </Provider>
    </>
  );
};

export default App;
