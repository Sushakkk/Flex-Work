
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/FlexWork-Frontend">
    <App />
  </BrowserRouter>
);




if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.js')  // Путь к файлу serviceWorker
        .then(() => console.log('Service Worker зарегистрирован'))
        .catch((err) => console.log('Ошибка при регистрации Service Worker', err));
    });
  }