import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
    /* eslint-disable */
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>Выйти</MyButton>
            <ul className="navbar__links">
                <li><Link to="/posts">Посты</Link></li>
                <li><Link to="/about">О сайте</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;