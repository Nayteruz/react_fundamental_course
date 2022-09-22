import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    /* eslint-disable */
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = (e) => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'auth');
    }

    return (
        <div>
            <h1>Страница для login</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите login" />
                <MyInput type="text" placeholder="Введите password" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;