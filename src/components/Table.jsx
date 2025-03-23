import React, { useState } from "react";
import { FaCheck, FaTrash } from 'react-icons/fa';
import styles from './table.module.css';

function Table() {
    const [words, setWords] = useState([
        { id: 1, word: 'bonjour', transcription: '/bɔ̃ʒuʁ/', translation: 'Здравствуй/Привет', isEditing: false, isSelected: false },
        { id: 2, word: 'au revoir', transcription: '/o ʁəvwaʁ/', translation: 'До свидания/Пока', isEditing: false, isSelected: false },
        { id: 3, word: 'merci', transcription: '/mɛʁsi/', translation: 'Спасибо', isEditing: false, isSelected: false },
        { id: 4, word: "s'il vous plaît", transcription: '/s‿ilvuˈplɛ/', translation: 'Спасибо', isEditing: false, isSelected: false }
    ]);

    const [isEditingAll, setIsEditingAll] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const handleInputChange = (e, id, field) => {
        const newWords = words.map(word => word.id === id ? { ...word, [field]: e.target.value } : word);
        setWords(newWords);
    };

    const toggleEdit = (id) => {
        const newWords = words.map(word => word.id === id ? { ...word, isEditing: !word.isEditing } : word);
        setWords(newWords);
    };

    const deleteWord = (id) => {
        const newWords = words.filter(word => word.id !== id);
        setWords(newWords);
    };

    const toggleEditAll = () => {
        setIsEditingAll(!isEditingAll);
        setShowActions(!showActions);
        const newWords = words.map(word => ({ ...word, isEditing: !isEditingAll }));
        setWords(newWords);
    };

    const addWord = () => {
        const newWord = { id: Date.now(), nickname: '', firstname: '', lastname: '', isEditing: true, isSelected: false };
        setWords([...words, newWord]);
    };

    const toggleSelect = (id) => {
        const newWords = words.map(word => word.id === id ? { ...word, isSelected: !word.isSelected } : word);
        setWords(newWords);
    };

    const deleteSelectedWords = () => {
        const newWords = words.filter(word => !word.isSelected);
        setWords(newWords);
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>#</th>
                        <th>WORD</th>
                        <th>TRANSCRIPTION</th>
                        <th>TRANSLATION</th>
                        {showActions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {words.map((word, index) => (
                        <tr key={word.id}>
                            <td>
                                <input type="checkbox" checked={word.isSelected} onChange={() => toggleSelect(word.id)} />
                            </td>
                            <td>{index + 1}</td>
                            {['word', 'transcription', 'translation'].map(field => (
                                <td key={field}>
                                    {word.isEditing ? (
                                        <input
                                            type="text"
                                            value={word[field]}
                                            onChange={(e) => handleInputChange(e, word.id, field)}
                                            className={styles.input}
                                        />
                                    ) : (
                                        word[field]
                                    )}
                                </td>
                            ))}
                            {showActions && (
                                <td>
                                    <button onClick={() => toggleEdit(word.id)} className={styles.button}>
                                        <FaCheck />
                                    </button>
                                    <button onClick={() => deleteWord(word.id)} className={styles.button}>
                                        <FaTrash />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.buttons}>
                <button onClick={addWord} className={`${styles.button} ${styles.addButton}`}>Добавить слово</button>
                <button onClick={toggleEditAll} className={`${styles.button} ${styles.editButton}`}>
                    {isEditingAll ? 'Сохранить все' : 'Редактировать все'}
                </button>
                {showActions && (
                    <button onClick={deleteSelectedWords} className={`${styles.button} ${styles.deleteButton}`}>
                        Удалить выбранные
                    </button>
                )}
            </div>
        </div>
    );
}

export default Table;
