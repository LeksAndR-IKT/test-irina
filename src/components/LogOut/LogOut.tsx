import React, { useState } from "react";
import styles from './LogOut.module.css'

let Registration: React.FC<any> = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

  }
  return (<div className={styles.container}>
    <h2>Регистрация</h2>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="введите логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Придумайте пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />
      <button className={styles.button}>Зарегистрироваться</button>
    </form>
  </div>
  );
}

export default Registration