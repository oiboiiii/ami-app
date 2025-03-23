import React from "react";
import styles from './card.module.css';

function Card() {
    return (
        <div className={styles.card}>
            <p>1/12</p>
            <h3>Mon ami</h3>
            <p>[mon ami]</p>
            <p>мой друг</p>
            <button>знаю</button>
            <button>не знаю</button>
            <p>Категория</p>
        </div>
    );
};

export default Card;