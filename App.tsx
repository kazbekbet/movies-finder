import React from 'react';
import * as Sentry from 'sentry-expo';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { themeConfig } from './src/common/theme/themeConfig';
import { globalStore } from './src/store/rootReducer';
import { Router } from './src/router/Router';
import { ErrorHandler } from './src/common/components/ErrorHandler/ErrorHandler';
import { CommonEffectWrapper } from './src/common/components/CommonEffectWrapper/CommonEffectWrapper';

export default function App() {
    return (
        <Provider store={globalStore}>
            <PaperProvider theme={themeConfig}>
                <CommonEffectWrapper>
                    <ErrorHandler>
                        <Router />
                    </ErrorHandler>
                </CommonEffectWrapper>
            </PaperProvider>
        </Provider>
    );
}

Sentry.init({
  dsn: 'https://892e8d0638474f5382d75875319855f7@o860516.ingest.sentry.io/5821057',
  enableInExpoDevelopment: true,
  debug: true,
});
