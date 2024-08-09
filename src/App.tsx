import React, { useState, FC } from 'react';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import SearchBar from './components/SearchBar.tsx';
import styles from './App.module.css';
import WeatherTable from './components/WeatherTable.tsx';

const App: FC = () => {
  const [searchDengrees, setSearchDengrees] = useState<string>('');

  return (
    <Provider store={store}>
      <div className={styles.container}>
        <h1 className={styles.header}>Прогноз погоды</h1>
        <SearchBar setSearchDengrees={setSearchDengrees} />
        <div className={styles.content}>
          <WeatherTable searchDengrees={searchDengrees} setSearchDengrees={setSearchDengrees} />
        </div>
      </div>
    </Provider>
  );
};

export default App;
