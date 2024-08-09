import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../store/reducers.ts';
import styles from './SerchBar.module.css';
import store from '../store/store.ts';

interface PropsType {
    setSearchDengrees: (value: string) => void;
}

const SearchBar: React.FC<PropsType> = ({ setSearchDengrees }) => {
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [city, setCity] = useState<string>('');
    type AppDispatch = typeof store.dispatch
    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = () => {
        if (!city) return;

        const updatedSearches = [city, ...recentSearches].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        dispatch(fetchWeather(city));
        setSearchDengrees('celsius');
    };

    const setCityName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value.trim().replace(/[^A-zА-я]/g, ''));
    };

    useEffect(() => {
        const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]') as string[];
        setRecentSearches(savedSearches);
    }, []);

    return (
        <div className={styles.search}>
            <div className={styles.serachLogic}>
                <input
                    value={city}
                    onChange={setCityName}
                    placeholder="Введите город"
                />
                <button onClick={handleSearch} className={styles.search_button}>Поиск</button>
            </div>
            
            <h3 className={styles.h3}>Последние запросы:</h3>
            <ul className={styles.ul}>
                {recentSearches.map((search, index) => (
                    <li key={index}>{search}</li>
                ))}
            </ul>
        </div>
    );
};

export default React.memo(SearchBar);