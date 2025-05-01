import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './card.module.css';

function Card({ card, total, passed, onAnswer }) {
    const [flipped, setFlipped] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        setFlipped(false);
    }, [card.id]);

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    }, [card.id]);

    const handleFlip = () => {
        setFlipped(true);
    };

    const handleFlipBack = () => {
        setFlipped(false);
    };

    return (
        <motion.div
            className={styles.cardWrapper}
            key={card.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
        >
            <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}>

                <div className={styles.cardFront}>
                    <p className={styles.cardCategory}>{card.topic.toUpperCase()}</p>
                    <div className={styles.cardTextArea}>
                        <h3 className={styles.cardWord}>{card.word}</h3>
                        <p className={styles.cardTranscription}>{card.transcription}</p>
                        <button
                            ref={buttonRef}
                            onClick={handleFlip}
                            className={styles.revealButton}
                        >
                            Посмотреть перевод
                        </button>
                    </div>
                    <p className={styles.cardNumber}>{passed + 1}/{total}</p>
                </div>


                <div className={styles.cardBack}>
                    <div className={styles.cardTextArea}>
                        <p className={styles.cardTranslation}>{card.translation}</p>
                        <div className={styles.backButtons}>
                            <button onClick={handleFlipBack}>Назад</button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Card;
