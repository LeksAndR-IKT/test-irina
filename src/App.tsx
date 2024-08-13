import React, { FC } from 'react';
import { Provider } from 'react-redux';
import setupStore from './store/store.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './components/Pages/LogIn/LogIn.tsx'
import Authorization from './components/Auth/Authorization/Authorization.tsx';
import LogOut from './components/Auth/Registration/Registration.tsx';

const store = setupStore()
const App: FC = () => {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Authorization/>}/>
          <Route path='/log-in-user' element={<LogIn/>}/>
          <Route path='/registration' element={<LogOut/>}/>
        </Routes>
      </BrowserRouter>
    </Provider >
  );
};

export default App;
