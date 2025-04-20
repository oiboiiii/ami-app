import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash } from 'react-icons/fa';
import styles from './table.module.css';
import wordsData from '../assets/words.json';

function Table() {
    const [words, setWords] = useState([]);
    const [isEditingAll, setIsEditingAll] = useState(false);
    const [showActions, setShowActions] = useState(false);

    useEffect(() => {
        setWords(wordsData.map(word => ({ ...word})));
    }, []);

    const handleInputChange = (e, id, field) => {
        let value = e.target.value;
        if (field === 'transcription' && value && !value.startsWith('//')) {
            value = `//${value}//`;
        }
        const newWords = words.map(word => word.id === id ? { ...word, [field]: value } : word);
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
        const newWord = {
            id: Date.now(),
            word: '',
            transcription: '//',
            translation: '',
            isEditing: true,
            isSelected: false
        };
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
                            <input
                                type="checkbox"
                                checked={word.isSelected}
                                onChange={() => toggleSelect(word.id)}
                            />
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
                                    <FaCheck/>
                                </button>
                                <button onClick={() => deleteWord(word.id)} className={styles.button}>
                                    <FaTrash/>
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
