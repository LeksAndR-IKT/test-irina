import reducer from './reducers.ts';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer,
});

export default store;