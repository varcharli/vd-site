import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import models from './client/models';
import './MovieDetailPlayList.css';

const MovieDetailPlayList = ({ show, movieId, onClose, checkedPlayList, onUpdate }) => {
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [loading, setLoading] = useState(true);
    const [playList, setPlayList] = useState([]);
    const [isUpdated, setIsUpdated] = useState(true);

    // console.log('checkedPlayList:', checkedPlayList);

    useEffect(() => {
        // 获取数据
        if (isUpdated) {
            models.playList.get().then((res) => {
                setPlayList(res.data);
                setLoading(false); // 数据加载完成
                setIsUpdated(false);
            });
        }
    }, [isUpdated]);

    const handleChecked = async (e) => {
        const id = parseInt(e.target.value, 10);
        if (e.target.checked) {
            await models.playList.addMovie(id, movieId);
            const item = { id: id, name: '' };
            onUpdate([...checkedPlayList, item]);
        } else {
            await models.playList.removeMovie(id, movieId);
            onUpdate(checkedPlayList.filter((item) => item.id !== id));
        }
    }

    const handleAddNew = async () => {
        // get input value
        const input = document.querySelector('input[id="newPlayList"]');
        const name = input.value;

        const re = await models.playList.create({ name });
        console.log('create playList response:', re);
        setIsUpdated(true);
        setIsAddingNew(false);
    }

    return (
        <div>
            <Modal show={show}
                onHide={onClose}
                dialogClassName="custom-modal"
                size={isAddingNew ? '' : 'sm'}
                centered>
                <Modal.Header>
                    <Modal.Title>加入播放清单</Modal.Title>
                    <button>
                        <i className="fas fa-times" onClick={onClose}></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <div>加载中...</div> :
                        (isAddingNew ? (
                            <div>
                                <h5 className='label'>新增播放清单</h5>
                                <input id="newPlayList"
                                    className='form-control'
                                    type="text"
                                    placeholder="填写播放清单名称" />
                            </div>
                        ) : (
                            <div>
                                {/* <h5>Check Playlist</h5> */}
                                {/* 渲染播放列表的逻辑 */}
                                {playList.map((item) => (
                                    <div key={item.id} className="form-check">
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                value={item.id}
                                                checked={checkedPlayList.some(checkedItem => checkedItem.id === item.id)}
                                                onChange={handleChecked}
                                            />
                                            {item.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <button className={isAddingNew ? 'btn btn-secondary' : 'btn btn-primary w-100'} onClick={() => setIsAddingNew(!isAddingNew)}>
                        {isAddingNew ? '回到播放清单' : '新增播放清单'}
                    </button>
                    {isAddingNew && (
                        <button className='btn btn-success'
                            onClick={handleAddNew}>保存</button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MovieDetailPlayList;