import React from 'react';
import App from './container';
import reducers from './reducers';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducers);

render(
        <Provider store = { store }>
            <App />
        </Provider>,
    document.getElementById("container")
);

