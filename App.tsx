import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { MoviesList } from './src/modules/MoviesList/view/MoviesList';
import { themeConfig } from './src/common/theme/themeConfig';
import { globalStore } from './src/store/rootReducer';

export default function App() {
  return (
      <Provider store={globalStore}>
        <PaperProvider theme={themeConfig}>
          <MoviesList />
        </PaperProvider>
      </Provider>
  );
}
