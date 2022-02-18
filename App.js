import React from 'react';
import FirstFeature from './src/containers/FirstFeature';
import { Provider } from 'react-redux';
import { createStore } from 'redux-dynamic-modules';

const store = createStore({
    enhancers: [],
    extensions: [],
});

const NewModuleButton = () => {
    return (
        <Provider store={store}>
            <FirstFeature />
        </Provider>
    );
};

export default NewModuleButton;
