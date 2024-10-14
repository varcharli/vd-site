import React, { useState, useEffect, useRef } from 'react';
import models from './client/models';
import './App-popup.css';
import { NoRecords, RainbowButton, WindowCloseButton } from './components';
// import { on } from 'events';
import loadingGif from './assets/loading.gif';

const PlayListPop = ({ title = '', onClose, onDataUpdated }) => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [data, setData] = useState([]);
    const linkInputRef = useRef(null);

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
        const fetchData = async () => {
            try {
                // const response = await axios.get(`/api/playLinks?MovieId=${MovieId}`);
                const response = await models.playList.get();
                setData(response.data);
                // onDataUpdated(response.data);
                setLoading(false);
                // console.log('response.data ' + MovieId + ' ' + response.data);
            } catch (error) {
                console.error('Error fetching playLists:', error);
                setLoading(false);
            }
        };

        fetchData();
        // console.log('fetchPlayLinks ' + MovieId);
    }, []);

    useEffect(() => {
        onDataUpdated(data);
    }, [data]);

    const handleCreate = async () => {
        let createName = name.trim();
        if (!createName) {
            alert('Name cannot be empty');
            return;
        }

        try {
            // const response = await axios.post('/api/playLinks', { MovieId, name: movieName, link });
            const response = await models.playList.create({ name: createName });
            // console.log('response.data ' + MovieId + ' ' + name + ' ' + link);
            const currentData = [response.data, ...data];
            setData(currentData);
            // onDataUpdated(currentData);
            setName('');
        } catch (error) {
            console.error('Error creating data:', error);
        }
    };

    // edit in row
    const [editingIndex, setEditingIndex] = useState(null);
    const [newName, setNewName] = useState('');

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewName(data[index].name);
    };

    const handleSave = async (index) => {
        if (newName) {
            try {
                // const response = await axios.put(`/api/playLinks/${playLinks[index].id}`, { MovieId, name: newName, link: newLink });
                // const response = await api.updatePlayLink(playLinks[index].id, { MovieId, name: newName, link: newLink });
                const response = await models.playList.update(data[index].id, { name: newName });
                const updatedData = data.map((row, i) =>
                    i === index ? response.data : row
                );
                setData(updatedData);
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
            // await api.deletePlayLink(playLinks[index].id);
            await models.playList.delete(data[index].id);
            // const updatedPlayLinks = playLinks.filter((_, i) => i !== index);
            const updatedData = data.filter((_, i) => i !== index);
            // setPlayLinks(updatedPlayLinks);
            setData(updatedData);
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
        <div key='playlistPop' className="popup-window">
            <div className='popup-inner'>

                <div className='dialog-header'>
                    <h2>{title}</h2>
                    {/* <button className='icon-big-button' onClick={onClose}>
                        <i className="fas fa-close"></i>
                    </button> */}
                    <WindowCloseButton onClick={onClose} />
                </div>
                <div className='dialog-content'>
                    <div className="create-section">
                        <div className="table-row">
                            <div className="cell-1">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="cell-3">
                                {/* <button onClick={handleCreate}>
                                    <i className="fas fa-plus"></i>
                                </button> */}
                                <RainbowButton colorIndex={1} onClick={handleCreate}
                                    icon="fas fa-plus" />

                            </div>
                        </div>
                    </div>
                    <div className="manage-section">
                        {data.length === 0 ? (
                            <NoRecords />
                        ) : (
                            data.map((item, index) => (
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
                                                {/* <div class="cell-2">
                                                    <div className='table-col' >
                                                        <span>
                                                            {playLink.link}
                                                        </span>
                                                    </div>
                                                </div> */}
                                                <div className="cell-3">
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

export default PlayListPop;