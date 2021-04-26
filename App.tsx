import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { themeConfig } from './src/common/theme/themeConfig';
import { globalStore } from './src/store/rootReducer';
import { Router } from './src/router/Router';

export default function App() {
    return (
        <Provider store={globalStore}>
            <PaperProvider theme={themeConfig}>
                <Router />
            </PaperProvider>
        </Provider>
    );
}
