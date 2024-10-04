// src/Tags.js
import React, { useState, useEffect } from 'react';
import api from './client/api';
import './App-popup.css';
import './Tags.css';


import { CheckTag, RainbowButton, WindowCloseButton } from './components';

export const TagField = ({ tags, onManage, onNavigateTag }) => {
    //use checktag component
    return (
        <div className='tags-field-list' >
            {tags.map((tag, index) => (
                <div >
                    <CheckTag
                        key={tag.id}
                        tagName={tag.name}
                        status='checked'
                        onClick={() =>
                            onNavigateTag &&
                            onNavigateTag(tag.id)}
                    />
                </div>
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
                const updatedTags = [...selectedTags, createdTag];
                setSelectedTags(updatedTags);
                onUpdate(updatedTags);
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
                </div>

            </div>
        </div>
    );
};

export default Tags;