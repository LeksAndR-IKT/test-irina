import React, { useState } from "react";
import styles from './Registration.module.css'
import { verificationOfAuthorization } from "../../../utils/auth.ts";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../../store/store.ts";
import { setUser } from "../../../store/reducers.ts";
import { useAppDispatch } from "../../../hooks/storeHooks.ts";
import { useNavigate } from "react-router-dom";

let Registration: React.FC<any> = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorLogOrPass, setErrorLogOrPass] = useState<boolean>(false)

  const users = useSelector((state: RootReducerType) => state.users)

  const dispatch = useAppDispatch()

  const history = useNavigate()

  const handleRegistration = (e) => {
    e.preventDefault()
    if (!verificationOfAuthorization(users, username, password)){
      dispatch(setUser({username, password}))
      history('/log-in-user')
    } else {
      setErrorLogOrPass(true)
    }
  }
  return (<div className={styles.container}>
    <h2>Регистрация</h2>
    <form onSubmit={handleRegistration}>
      <input
        type="text"
        placeholder="введите логин"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          setErrorLogOrPass(false)  }
        }
        required
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Придумайте пароль"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setErrorLogOrPass(false)  }
        }
        required
        className={styles.input}
      />
      {errorLogOrPass && <div className={styles.error}>
          Это имя уже занято, придумайте другое
        </div>}
      <button className={styles.button}>Зарегистрироваться</button>
    </form>
  </div>
  );
}

export default Registration