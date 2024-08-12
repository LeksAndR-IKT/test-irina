import React, {useState} from "react";
import styles from './LogIn.module.css'
import SearchBar from '../SearchBar/SearchBar.tsx';
import WeatherTable from '../Weather/WeatherTable.tsx';

let LogIn: React.FC<any> = () => {
    const [searchDengrees, setSearchDengrees] = useState<string>('');
    return <div className={styles.container}>
    <h1 className={styles.header}>Прогноз погоды</h1>
    <SearchBar setSearchDengrees={setSearchDengrees} />
    <div className={styles.content}>
      <WeatherTable searchDengrees={searchDengrees} setSearchDengrees={setSearchDengrees} />
    </div>
  </div>
}

export default LogIn