import React, { FC } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import setupStore from './store/store.ts';

import Home from './pages/Home/index.tsx'
import Authorization from './pages/Authorization/index.tsx';
import LogOut from './pages/Registration/index.tsx';

const store = setupStore()
const App: FC = () => {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Authorization/>}/>
          <Route path='/log-in-user' element={<Home/>}/>
          <Route path='/registration' element={<LogOut/>}/>
        </Routes>
      </BrowserRouter>
    </Provider >
  );
};

export default App;
