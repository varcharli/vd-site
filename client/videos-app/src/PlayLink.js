import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import api from './client/api';
import './App-popup.css';
import { NoRecords, RainbowButton, WindowCloseButton } from './components';
// import { on } from 'events';
import loadingGif from './assets/loading.gif';


const PlayLink = ({ MovieId, onClose, onPlayLinksUpdate }) => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [playLinks, setPlayLinks] = useState([]);
    const linkInputRef = useRef(null);
    MovieId = parseInt(MovieId);

    useEffect(() => {
        // 设置link input的焦点
        if (linkInputRef.current) {
            linkInputRef.current.focus();
        }
    }, []);

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
                // const response = await axios.get(`/api/playLinks?MovieId=${MovieId}`);
                const response = await api.getPlayLinks(MovieId);
                setPlayLinks(response.data);
                onPlayLinksUpdate(response.data);
                setLoading(false);
                // console.log('response.data ' + MovieId + ' ' + response.data);
            } catch (error) {
                console.error('Error fetching playLinks:', error);
                setLoading(false);
            }
        };

        fetchPlayLinks();
        console.log('fetchPlayLinks ' + MovieId);
    }, [MovieId, onPlayLinksUpdate]);

    const handleCreate = async () => {
        let movieName = name.trim();
        if (!movieName) {
            let defaultNumber = 1;
            const existingNames = playLinks.map(playLink => playLink.name);
            while (existingNames.includes(defaultNumber.toString().padStart(3, '0'))) {
                defaultNumber++;
            }
            movieName = defaultNumber.toString().padStart(3, '0');
        }

        if (!link) {
            alert('Link cannot be empty');
            return;
        }

        try {
            // const response = await axios.post('/api/playLinks', { MovieId, name: movieName, link });
            const response = await api.createPlayLink({ MovieId, name: movieName, link });
            console.log('response.data ' + MovieId + ' ' + name + ' ' + link);
            setPlayLinks([...playLinks, response.data]);
            setName('');
            setLink('');
        } catch (error) {
            console.error('Error creating playLink:', error);
        }
    };

    // edit in row
    const [editingIndex, setEditingIndex] = useState(null);
    const [newName, setNewName] = useState('');
    const [newLink, setNewLink] = useState('');

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewName(playLinks[index].name);
        setNewLink(playLinks[index].link);
    };

    const handleSave = async (index) => {
        if (newName && newLink) {
            try {
                // const response = await axios.put(`/api/playLinks/${playLinks[index].id}`, { MovieId, name: newName, link: newLink });
                const response = await api.updatePlayLink(playLinks[index].id, { MovieId, name: newName, link: newLink });
                const updatedPlayLinks = playLinks.map((playLink, i) =>
                    i === index ? response.data : playLink
                );
                setPlayLinks(updatedPlayLinks);
                setEditingIndex(null);
            } catch (error) {
                console.error('Error updating playLink:', error);
            }
        }
    };

    const handleCancel = () => {
        setEditingIndex(null);
    };

    // delete
    const handleDelete = async (index) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this playLink?');
        if (!confirmDelete) {
            return;
        }

        try {
            // await axios.delete(`/api/playLinks/${playLinks[index].id}`);
            await api.deletePlayLink(playLinks[index].id);
            const updatedPlayLinks = playLinks.filter((_, i) => i !== index);
            setPlayLinks(updatedPlayLinks);
        } catch (error) {
            console.error('Error deleting playLink:', error);
        }
    };

    if (loading) {
        return (
            <div className="popup-window">
                <div className='popup-inner'>
                    <div className="loading-container">
                        <img src={loadingGif} alt="Loading..." className="loading-gif" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="popup-window">
            <div className='popup-inner'>

                <div className='dialog-header'>
                    <h2>播放链接</h2>
                    {/* <button className='icon-big-button' onClick={onClose}>
                        <i className="fas fa-close"></i>
                    </button> */}
                    <WindowCloseButton onClick={onClose} />
                </div>
                <div className='dialog-content'>
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
                                    ref={linkInputRef}
                                />
                            </div>
                            <div class="cell-3">
                                {/* <button onClick={handleCreate}>
                                    <i className="fas fa-plus"></i>
                                </button> */}
                                <RainbowButton colorIndex={1} onClick={handleCreate}
                                    icon="fas fa-plus" />

                            </div>
                        </div>
                    </div>
                    <div className="manage-section">
                        {playLinks.length === 0 ? (
                            <NoRecords />
                        ) : (
                            playLinks.map((playLink, index) => (
                                <div className='editable-row' >
                                    <div key={playLink.id}>
                                        {editingIndex === index ? (
                                            <div className="table-row" >
                                                <div class="cell-1">
                                                    <input
                                                        type="text"
                                                        value={newName}
                                                        onChange={(e) => setNewName(e.target.value)}
                                                    /></div>
                                                <div class="cell-2">
                                                    <div className='table-col' >
                                                        <input
                                                            type="text"
                                                            value={newLink}
                                                            onChange={(e) => setNewLink(e.target.value)}
                                                        /></div></div>
                                                {/* <button onClick={() => handleSave(index)}>Save</button>
                                                <button onClick={handleCancel}>Cancel</button> */}
                                                <div class="cell-3">
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
                                                        <RainbowButton colorIndex={3} onClick={() => handleEdit(index)}
                                                            icon="fas fa-edit" />
                                                        <RainbowButton colorIndex={4} onClick={() => handleDelete(index)}
                                                            icon="fas fa-trash" />
                                                    </div>
                                                </div>
                                                {/* <span>{playLink.name}</span>
                                                <span>{playLink.link}</span>
                                                <button onClick={() => handleEdit(index)}>Edit</button> */}
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
                </div>
                {/* <div className='dialog-bottom'>
                    <button className='close-popup-button' onClick={onClose}>
                        <i className="fas fa-close"></i>
                        Close
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default PlayLink;