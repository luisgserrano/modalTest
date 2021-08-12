import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ModalProvider } from './headless-modal';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>,
  rootElement
);
