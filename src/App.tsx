import React, { FC } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import setupStore from './store/store.ts';

import Home from './pages/Home/Index.tsx'
import Authorization from './pages/Authorization/Index.tsx';
import LogOut from './pages/Registration/Index.tsx';

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
