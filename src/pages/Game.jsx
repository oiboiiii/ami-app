import React from 'react';
import Card from '../components/Card';
import styles from './game.module.css';

function Game() {
    return (
        <div className={styles.game}>
            <h1>Тренировка</h1>
            <Card />
        </div>
    );
};

export default Game;
