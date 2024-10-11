import { Provider } from 'react-redux';
import './App.css';
import Pages from './Pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NotificationContainer />
        <Pages />
      </div>
    </Provider>
  );
}

export default App;
