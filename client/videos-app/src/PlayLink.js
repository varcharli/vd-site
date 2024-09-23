import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlayLink.css';

const PlayLink = ({ MovieId, onClose }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [playLinks, setPlayLinks] = useState([]);
    MovieId = parseInt(MovieId);

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
        // Fetch existing playLinks for the given MovieId when the component mounts
        const fetchPlayLinks = async () => {
            try {
                const response = await axios.get(`/playLinks?MovieId=${MovieId}`);
                setPlayLinks(response.data);
                console.log('response.data ' + MovieId + ' ' + response.data);
            } catch (error) {
                console.error('Error fetching playLinks:', error);
            }
        };

        fetchPlayLinks();
        console.log('fetchPlayLinks ' + MovieId);
    }, [MovieId]);

    const handleCreate = async () => {
        try {
            const response = await axios.post('/playLinks', { MovieId, name, link });
            console.log('response.data ' + MovieId + ' ' + name + ' ' + link);
            setPlayLinks([...playLinks, response.data]);
            setName('');
            setLink('');
        } catch (error) {
            console.error('Error creating playLink:', error);
        }
    };

    const handleEdit = async (index) => {
        const newName = prompt('Enter new name:', playLinks[index].name);
        const newLink = prompt('Enter new link:', playLinks[index].link);
        if (newName && newLink) {
            try {
                const response = await axios.put(`/playLinks/${playLinks[index].id}`, { MovieId, name: newName, link: newLink });
                const updatedPlayLinks = playLinks.map((playLink, i) =>
                    i === index ? response.data : playLink
                );
                setPlayLinks(updatedPlayLinks);
            } catch (error) {
                console.error('Error updating playLink:', error);
            }
        }
    };

    const handleDelete = async (index) => {
        try {
            await axios.delete(`/playLinks/${playLinks[index].id}`);
            const updatedPlayLinks = playLinks.filter((_, i) => i !== index);
            setPlayLinks(updatedPlayLinks);
        } catch (error) {
            console.error('Error deleting playLink:', error);
        }
    };

    return (
        <div className="popup-window">
            <div className='popup-inner'>
                {/* <button onClick={onClose}>Close</button> */}
                <div className='dialog-header'>
                    <h2>Play Links</h2>
                </div>
                <div className="create-section">
                    <div class="table-row">
                        <div class="cell-1">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div class="cell-2">
                            <input
                                type="text"
                                placeholder="Link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>
                        <div class="cell-3">
                            <button onClick={handleCreate}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>



                </div>
                <div className="manage-section">
                    {playLinks.map((playLink, index) => (
                        <div>
                            <div key={index} className="table-row">
                                <div class="cell-1">
                                    <div className='table-col'>
                                        <span>{playLink.name}</span> </div>
                                </div>
                                <div class="cell-2">
                                    <div className='table-col' >
                                        <span>
                                            {playLink.link}
                                        </span>
                                    </div>
                                </div>
                                <div class="cell-3">
                                    <div className='table-col' >
                                        <button onClick={() => handleEdit(index)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(index)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr className='divider' />
                        </div>
                    )
                    )}
                </div>
                <div className='popup-space' />
                <div className='dialog-bottom'>
                    <button className='close-popup-button' onClick={onClose}>
                        <i className="fas fa-close"></i>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlayLink;