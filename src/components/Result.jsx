function Result({ known, total, onRestart }) {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Результаты</h2>
            <p>Вы знаете {known} из {total} слов.</p>
            <p>Процент правильных: {Math.round((known / total) * 100)}%</p>
            <button onClick={onRestart} style={{ marginTop: '20px' }}>
                Пройти заново
            </button>
        </div>
    );
}

export default Result;
