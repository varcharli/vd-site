// src/Tags.js
import React, { useState, useEffect } from 'react';
import api from './client/api';
import './App-popup.css';
import './Tags.css';
import models from './client/models';


import { NoRecords, CheckTag, RainbowButton, WindowCloseButton, IconButton } from './components';

export const TagField = ({ tags, onManage, onNavigateTag }) => {
    //use checktag component
    return (
        <div className='tags-field-list' >
            {tags.map((tag, index) => (
                <CheckTag
                    key={tag.id}
                    tagName={tag.name}
                    status='checked'
                    onClick={() =>
                        onNavigateTag &&
                        onNavigateTag(tag.id)}
                />
            ))}

            <CheckTag tagName='+ 标签' status='unchecked' onClick={() =>
                onManage &&
                onManage()} />
        </div>
    );
}

const Tags = ({ movieId, onClose, onUpdate }) => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModify, setIsModify] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newName, setNewName] = useState('');

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewName(tags[index].name);
    };

    const handleSave = async (index) => {
        if (newName) {
            try {
                const response = await models.tag.update(tags[index].id, { name: newName });
                const updatedData = tags.map((row, i) =>
                    i === index ? response.data : row
                );
                setTags(updatedData);
                setEditingIndex(null);
            } catch (error) {
                console.error('Error updating Tag:', error);
            }
        }
    };

    const handleCancel = () => {
        setEditingIndex(null);
    };
    // delete
    const handleDelete = async (index) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Tag?');
        if (!confirmDelete) {
            return;
        }

        try {
            await models.tag.delete(tags[index].id);
            const updatedData = tags.filter((_, i) => i !== index);
            setTags(updatedData);
        } catch (error) {
            console.error('Error deleting Tag:', error);
        }
    };


    useEffect(() => {
        // 添加点击事件监听器
        const handleClickOutside = (event) => {
            const popupInner = document.querySelector('.popup-inner');
            if (popupInner && !popupInner.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // 清除事件监听器
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        // Fetch existing tags for the movie
        api.getTagsForMovie(movieId)
            .then(response => {
                setSelectedTags(response.data);
                // Fetch all tags for the user
                api.getTags()
                    .then(response => {
                        setTags(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching tags:', error);
                    });
            }
            )
            .catch(error => {
                console.error('Error fetching tags:', error);
            });
    }, [movieId]);

    const handleAddTag = () => {
        if (newTag.trim() === '') return;

        // Create a new tag
        api.createTag({ name: newTag })
            .then(response => {
                const createdTag = response.data;
                setTags([...tags, createdTag]);
                // const updatedTags = [...selectedTags, createdTag];
                // setSelectedTags(updatedTags);
                // onUpdate(updatedTags);
                setNewTag('');
            })
            .catch(error => {
                console.error('Error creating tag:', error);
            });
    };

    const handleTagSelection = (tag) => {
        const isSelected = selectedTags.some(t => t.id === tag.id);
        const updatedTags = isSelected
            ? selectedTags.filter(t => t.id !== tag.id)
            : [...selectedTags, tag];

        setSelectedTags(updatedTags);

        // Update tags for the movie
        // axios.post(`/api/tags/movies/${movieId}`, { tagIds: updatedTags.map(t => t.id) })
        api.setTagsForMovie(movieId, updatedTags.map(t => t.id))
            .catch(error => {
                console.error('Error updating tags:', error);
            });
        onUpdate(updatedTags);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="popup-window">
            <div className='popup-inner'>
                {isModify ? <>
                    <IconButton icon="fas fa-arrow-left" onClick={() => setIsModify(false)} />
                    <div className="manage-section">
                        {tags.length === 0 ? (
                            <NoRecords />
                        ) : (
                            tags.map((item, index) => (
                                <div key={item.id} className='editable-row' >
                                    <div >
                                        {editingIndex === index ? (
                                            <div className="table-row" >
                                                <div className="cell-1">
                                                    <input
                                                        type="text"
                                                        value={newName}
                                                        onChange={(e) => setNewName(e.target.value)}
                                                    /></div>
                                                {/* <div class="cell-2">
                                                    <div className='table-col' >
                                                        <input
                                                            type="text"
                                                            value={newLink}
                                                            onChange={(e) => setNewLink(e.target.value)}
                                                        />
                                                    </div>
                                                </div> */}
                                                {/* <button onClick={() => handleSave(index)}>Save</button>
                                                <button onClick={handleCancel}>Cancel</button> */}
                                                <div className="cell-3">
                                                    <div className='table-col' >
                                                        <RainbowButton colorIndex={5} onClick={() => handleSave(index)}
                                                            icon="fas fa-save" />
                                                        <RainbowButton colorIndex={6} onClick={() => handleCancel(index)}
                                                            icon="fas fa-undo" />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="table-row" >
                                                <div className="cell-1">
                                                    <div className='table-col'>
                                                        <span>{item.name}</span> </div>
                                                </div>
                                                <div className="cell-3">
                                                    <div className='table-col' >
                                                        <RainbowButton colorIndex={3} onClick={() => handleEdit(index)}
                                                            icon="fas fa-edit" />
                                                        <RainbowButton colorIndex={4} onClick={() => handleDelete(index)}
                                                            icon="fas fa-trash" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                    <div className='divider' />

                                </div>
                            )
                            )
                        )}
                    </div>
                    <div className='popup-space' />

                </> :
                    <>
                        <div className='dialog-header'>
                            <h2>标签</h2>
                            <WindowCloseButton onClick={onClose} />
                        </div>
                        <div className='dialog-body'>
                            <div className="tags-list">
                                {
                                    Array.isArray(tags) && tags.map(tag => (
                                        <CheckTag
                                            key={tag.id}
                                            tagName={tag.name}
                                            status={selectedTags.some(t => t.id === tag.id) ? 'checked' : 'unchecked'}
                                            onClick={() => handleTagSelection(tag)}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className='table-row'>
                            <div className="new-tag">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="New tag name"
                                />
                                {/* <button onClick={handleAddTag}>Add Tag</button> */}
                                <RainbowButton colorIndex={1} onClick={handleAddTag}
                                    icon="fas fa-plus" />
                            </div>
                            <div>
                                <IconButton icon="fas fa-cog" onClick={() => setIsModify(true)} />
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    );
};

export default Tags;