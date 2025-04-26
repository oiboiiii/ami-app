import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './table.module.css';
import wordsData from '../../assets/words.json';

const Table = () => {
    // Состояния компонента
    const [words, setWords] = useState([]);
    const [isEditingAll, setIsEditingAll] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const visibleRows = 15;

    // Инициализация данных
    useEffect(() => {
        setWords(wordsData.map(word => ({
            ...word,
            isEditing: false,
            isSelected: false
        })));
    }, []);

    // Обновление счетчика выбранных слов
    useEffect(() => {
        setSelectedCount(words.filter(word => word.isSelected).length);
    }, [words]);

    // Обработчики событий
    const handleInputChange = (e, id, field) => {
        let value = e.target.value;
        if (field === 'transcription' && value && !value.startsWith('//')) {
            value = `//${value}//`;
        }

        setWords(words.map(word =>
            word.id === id ? { ...word, [field]: value } : word
        ));
    };

    const toggleEdit = (id) => {
        setWords(words.map(word =>
            word.id === id ? { ...word, isEditing: !word.isEditing } : word
        ));
    };

    const deleteWord = (id) => {
        setWords(words.filter(word => word.id !== id));
    };

    const toggleEditAll = () => {
        const newEditingState = !isEditingAll;
        setIsEditingAll(newEditingState);
        setShowActions(newEditingState);
        setWords(words.map(word => ({ ...word, isEditing: newEditingState })));
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
        setWords(words.map(word =>
            word.id === id ? { ...word, isSelected: !word.isSelected } : word
        ));
    };

    const toggleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setWords(words.map(word => ({ ...word, isSelected: isChecked })));
    };

    const deleteSelectedWords = () => {
        setWords(words.filter(word => !word.isSelected));
    };

    // Получаем видимые строки
    const visibleWords = showAll ? words : words.slice(0, visibleRows);

    return (
        <div className={styles.tableContainer}>
            <div className={styles.controls}>
                <div className={styles.buttons}>
                    <button onClick={addWord} className={`${styles.button} ${styles.addButton}`}>
                        Добавить слово
                    </button>
                    <button
                        onClick={toggleEditAll}
                        className={`${styles.button} ${styles.editButton}`}
                    >
                        {isEditingAll ? 'Сохранить все' : 'Редактировать все'}
                    </button>
                    {showActions && selectedCount > 0 && (
                        <button
                            onClick={deleteSelectedWords}
                            className={`${styles.button} ${styles.deleteButton}`}
                        >
                            Удалить выбранные ({selectedCount})
                        </button>
                    )}
                </div>

                {words.length > 0 && (
                    <div className={styles.selectionInfo}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCount === words.length && words.length > 0}
                                onChange={toggleSelectAll}
                            />
                            Выбрать все
                        </label>
                        <span>Выбрано: {selectedCount}</span>
                    </div>
                )}
            </div>

            {words.length > 0 ? (
                <>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th width="50px">#</th>
                                <th width="60px">
                                    <input
                                        type="checkbox"
                                        checked={selectedCount === words.length && words.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th>Слово</th>
                                <th>Транскрипция</th>
                                <th>Перевод</th>
                                {showActions && <th width="100px">Действия</th>}
                            </tr>
                            </thead>
                            <tbody>
                            {visibleWords.map((word, index) => (
                                <tr key={word.id} className={word.isSelected ? styles.selectedRow : ''}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={word.isSelected}
                                            onChange={() => toggleSelect(word.id)}
                                        />
                                    </td>
                                    {['word', 'transcription', 'translation'].map(field => (
                                        <td key={`${word.id}-${field}`}>
                                            {word.isEditing ? (
                                                <input
                                                    type="text"
                                                    value={word[field]}
                                                    onChange={(e) => handleInputChange(e, word.id, field)}
                                                    className={styles.input}
                                                    autoFocus={field === 'word'}
                                                />
                                            ) : (
                                                <span>{word[field]}</span>
                                            )}
                                        </td>
                                    ))}
                                    {showActions && (
                                        <td className={styles.actions}>
                                            <button
                                                onClick={() => toggleEdit(word.id)}
                                                className={styles.actionButton}
                                                title={word.isEditing ? 'Сохранить' : 'Редактировать'}
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => deleteWord(word.id)}
                                                className={styles.actionButton}
                                                title="Удалить"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {words.length > visibleRows && (
                        <div className={styles.showMore}>
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className={styles.showMoreButton}
                            >
                                {showAll ? (
                                    <>
                                        <FaChevronUp /> Скрыть
                                    </>
                                ) : (
                                    <>
                                        <FaChevronDown /> Показать все ({words.length - visibleRows} ещё)
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.emptyTable}>
                    <p>Нет данных для отображения</p>
                    <button onClick={addWord} className={`${styles.button} ${styles.addButton}`}>
                        Добавить первое слово
                    </button>
                </div>
            )}
        </div>
    );
};

export default Table;