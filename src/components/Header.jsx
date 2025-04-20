import React from "react";
import { Link } from 'react-router-dom';
import styles from "./header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <p className={styles.header__title}>Карточки <br />со словами <br /><b>французский</b></p>
            <nav >
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