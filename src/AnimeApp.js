import { Provider } from 'react-redux';
import { store } from './context/';
import AppRouter from './routes/AppRouter';

function AnimeApp() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default AnimeApp;
