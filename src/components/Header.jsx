import React from "react";
import { Link } from 'react-router-dom';
import styles from "./header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <p>Карточки <br />со словами <br /><b>французский</b></p>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/game">Тренировка</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;