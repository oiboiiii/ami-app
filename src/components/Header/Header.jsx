import React from "react";
import {Link} from 'react-router-dom';
import styles from "./header.module.css";
import franceLogo from "./france.png";

function Header() {
    return (
        <header className={styles.header}>
            
                <div className={styles.header__logo}>
                    <Link to="/">
                        <img className={styles.header__france_logo} src={franceLogo} alt="logo"/>
                    </Link>
                    <p className={styles.header__title}>Карточки <br/>со словами <br/><b>французский</b></p>
                </div>
            
            <nav>
                <ul className={styles.header__nav}>
                    <li className={styles.header__link}>
                        <Link to="/">Главная</Link>
                    </li>
                    <li className={styles.header__link}>
                        <Link to="/game">Тренировка</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;