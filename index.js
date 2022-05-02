/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react'
import {name as appName} from './app.json';
import {store} from './src/redux';
import {Provider} from 'react-redux';
const ReduxProvider = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}
AppRegistry.registerComponent('reto', () => ReduxProvider
);
