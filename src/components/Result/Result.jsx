import styles from "../Result/Result.module.css";


function Result({ known, total, onRestart }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2 className={styles.title}>Результаты</h2>
            <p className={styles.text}>Вы знаете {known} из {total} слов.</p>
            <p className={styles.text}>Процент правильных: {Math.round((known / total) * 100)}%</p>
            <button onClick={onRestart} className={styles.restart_button}>
                Пройти заново
            </button>
        </div>
    );
}

export default Result;
