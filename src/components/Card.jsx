import React from "react";
import styles from './card.module.css';

function Card() {
    return (
        <div className={styles.card}>
            <p className={'styles.card-number'}>1/12</p>
            <div className={'styles.card-text-area'}>
            <h3 className={'styles.card-word'}>Mon ami</h3>
            <p className={'styles.card-transcription'}>[mon ami]</p>
            <p className={'styles.card-translate'}>мой друг</p>
            </div>
            <div className={'styles.card-button'}>
            <button className={'styles.card-button--known'}>знаю</button>
            <button className={'styles.card-button--unknown'}>не знаю</button>
            </div>
            <p className={'styles.card-category'}>Категория</p>
        </div>
    );
}

export default Card;