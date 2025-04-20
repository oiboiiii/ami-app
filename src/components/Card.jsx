import styles from './card.module.css';
import { motion } from 'framer-motion';

function Card({ card, total, passed }) {
    return (
        <motion.div
            className={styles.card}
            key={card.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
        >
            <p className={styles.cardCategory}>{card.topic}</p>
            <div className={styles.cardTextArea}>
                <h3 className={styles.cardWord}>{card.word}</h3>
                <p className={styles.cardTranscription}>{card.transcription}</p>
                <p className={styles.cardTranslate}>{card.translation}</p>
            </div>
            <p className={styles.cardNumber}>{passed + 1}/{total}</p>
        </motion.div>
    );
}

export default Card;
