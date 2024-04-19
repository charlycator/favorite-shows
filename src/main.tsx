import React from 'react';
import ReactDOM from 'react-dom/client';
import MainView from './views/main';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainView />
  </React.StrictMode>,
)
