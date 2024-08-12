import styles from './Authorization.module.css'
import React, {useState} from 'react';
import { verificationOfAuthorization } from '../../functions/functions.ts';
import { useSelector } from 'react-redux';
import { RootReducerType } from '../../store/store.ts';
import { useNavigate } from 'react-router-dom';

const Authorization:React.FC<any> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showInfo, setShowInfo] = useState(false);

    const users = useSelector((state: RootReducerType) => state.users)

    const steep = useNavigate()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if(verificationOfAuthorization(users, username, password)){
            steep('/log-in-user')
        } else {
            setUsername('')
            setPassword('')
        }
    };

    const handleRegister = () => {
        steep('/registration')
        console.log('Регистрация:', { username, password });
    };

    const toggleInfo = () => {
        setShowInfo(prev => !prev);
    };

    return ( <div className={styles.container}>
            <h2>Авторизация</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Авторизоваться</button>
                <button type="button" onClick={handleRegister} className={styles.button}>Зарегистрироваться</button>
            </form>
            <button onClick={toggleInfo} className={styles.infoButton}>
                {showInfo ? 'Скрыть информацию' : 'Показать информацию о сайте'}
            </button>
            {showInfo && (
                <div className={styles.info}>
                    <h3>Информация о сайте</h3>
                    <p>На нашем сайте вы можете узнать актуальную погоду в вашем регионе. Просто введите ваш логин и пароль для доступа к дополнительным функциям.</p>
                </div>
            )}
        </div>
    );
};

export default Authorization;