import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './WeatherDisplay.module.css';
import { setCelsius, setFahrenheit, setTempName } from '../../store/reducers.ts';
import { RootState } from '../../store/types.ts';

type PropsType = {
    searchDengrees: string | null;
    setSearchDengrees: (value: string) => void;
};

const WeatherTable: React.FC<PropsType> = ({ searchDengrees, setSearchDengrees }) => {
    const mainWeatherInfo = useSelector((state: RootState) => state.main);
    const errorSearch = useSelector((state: RootState) => state.errorSearch);
    const nameCity = useSelector((state: RootState) => state.name);
    const weatherCoord = useSelector((state: RootState) => state.coord);
    const windSpeed = useSelector((state: RootState) => state.windSpeed);
    const tempName = useSelector((state: RootState) => state.tempName);

    const dispatch = useDispatch();

    useEffect(() => {
        if (searchDengrees === 'celsius') {
            dispatch(setCelsius());
        } else if (searchDengrees === 'fahrenheit') {
            dispatch(setFahrenheit());
        }
        dispatch(setTempName(searchDengrees as string));
    }, [dispatch, searchDengrees]);

    if (errorSearch) {
        return (
            <div className={styles.weather_card}>
                {errorSearch}
            </div>
        );
    }

    return (
        <div className={styles.weather_card}>
            <h2>{nameCity}</h2>
            <div className={styles.container_Choice}>
                <label className={styles.form_label}>Выберите градусы</label>
                <select
                    className={styles.form_select}
                    name="degrees"
                    onChange={(e) => setSearchDengrees(e.target.value)}
                >
                    <option value="celsius">Цельсия</option>
                    <option value="fahrenheit">Фаренгейт</option>
                </select>
            </div>
            <table className={styles.weather_table}>
                <tbody>
                    <tr>
                        <td>Долгота</td>
                        <td>{weatherCoord.lon}</td>
                    </tr>
                    <tr>
                        <td>Широта</td>
                        <td>{weatherCoord.lat}</td>
                    </tr>
                    <tr>
                        <td>Температура</td>
                        <td>{mainWeatherInfo.temp} {tempName}</td>
                    </tr>
                    <tr>
                        <td>Минимальная температура</td>
                        <td>{mainWeatherInfo.temp_min} {tempName}</td>
                    </tr>
                    <tr>
                        <td>Максимальная температура</td>
                        <td>{mainWeatherInfo.temp_max} {tempName}</td>
                    </tr>
                    <tr>
                        <td>Видимость</td>
                        <td>{mainWeatherInfo.humidity} м</td>
                    </tr>
                    <tr>
                        <td>Давление (мм рт. ст.)</td>
                        <td>{mainWeatherInfo.grnd_level} мм</td>
                    </tr>
                    <tr>
                        <td>Скорость ветра (м/с)</td>
                        <td>{windSpeed} м/с</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(WeatherTable);