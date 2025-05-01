import {useState} from 'react';
import Card from '../../components/Card/Card';
import Result from "../../components/Result/Result";
import styles from './game.module.css';
import {AnimatePresence} from 'framer-motion';
import data from '../../assets/words.json';

function Game() {

    const [index, setIndex] = useState(0);
    const [knownCount, setKnownCount] = useState(0);
    const [finished, setFinished] = useState(false);
    const total = data.length;

    const handleAnswer = (isKnown) => {
        if (isKnown) {
            setKnownCount((prev) => prev + 1);
        }

        if (index < total - 1) {
            setIndex((prev) => prev + 1);
        } else {
            setFinished(true);
        }
    };

    const restartTest = () => {
        setIndex(0);
        setKnownCount(0);
        setFinished(false);
    };

    return (
        <div className={styles.gameContent}>
            <h1>Тренировка</h1>
            <div style={{position: 'relative', minHeight: '300px'}}>
                <AnimatePresence mode="wait">
                    {!finished ? (
                        <Card
                            key={data[index].id}
                            card={data[index]}
                            total={total}
                            passed={index}
                            onReveal={handleAnswer}
                            
                        />
                    ) : (
                        <Result known={knownCount} total={total} onRestart={restartTest}/>
                    )}
                </AnimatePresence>
            </div>
            {!finished && (
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button onClick={() => handleAnswer(true)} className="btn-known">Знаю</button>
                    <button onClick={() => handleAnswer(false)} className="btn-unknown">Не знаю</button>
                </div>
            )}
        </div>
    );
}

export default Game;
