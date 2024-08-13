import React, {useState} from "react";

import { useSelector } from "react-redux";

import  SearchBar from '../../components/SearchBar/SearchBar.tsx';
import WeatherTable from '../../components/Weather/WeatherTable.tsx';
import ScatterPlot from "../../components/Weather/WeatherGraph/WeatherGraph.tsx";

import { RootReducerType } from "../../store/store.ts";

import styles from './styles.module.css'

let LogIn: React.FC<any> = () => {
  const {temp, temp_max, temp_min} = useSelector((state: RootReducerType) => state.main)
  const data = [
    { x: 'минимальная температура', y: temp_min ?? 0 },
    { x: `сейчас`, y: temp ?? 0},
    { x: 'максимальная температура', y: temp_max ?? 0},
];
    const [searchDengrees, setSearchDengrees] = useState<string>('');
    return <div className={styles.container}>
    <h1 className={styles.header}>Прогноз погоды</h1>
    <SearchBar setSearchDengrees={setSearchDengrees} />
    <div className={styles.table}>
      <ScatterPlot data={data}/>
    </div>
    <div className={styles.content}>
      <WeatherTable searchDengrees={searchDengrees} setSearchDengrees={setSearchDengrees} />
    </div>
  </div>
}

export default LogIn