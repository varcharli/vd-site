import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import models from './client/models';
import './BlogPop.css';

const BlogPop = ({ show, blogId, getBlogs, onClose, onUpdate }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const isAddingNew = blogId === 0;

    // console.log('checkedPlayList:', checkedPlayList);

    useEffect(() => {
        setBlogs(getBlogs);
        console.log('getBlogs:', getBlogs);

        if (blogId === 0) {
            setTitle('');
            setContent('');
            setLoading(false);
            return;
        }

        const blog = blogs.find(item => item.id === blogId);
        setTitle(blog.title);
        setContent(blog.content);
    }, [blogId]);

    const handleSave = async () => {
        if (isAddingNew) {
            handleAddNew();
        }
        else {
            handleUpdate();
        }
    }

    const handleAddNew = async () => {
        // get input value

        const title = document.querySelector('input[id="title"]').value;
        const content = document.querySelector('textarea[id="content"]').value;

        const reponse = await models.blog.create({ title, content });
        if (reponse.status === 201) {
            const blog = reponse.data;
            blogs.unshift(blog);
            onUpdate(blogs);
            onClose();
            return;
        } else {
            alert('新增失败');
        }
    }

    const handleUpdate = async () => {
        // get input value

        const title = document.querySelector('input[id="title"]').value;
        const content = document.querySelector('textarea[id="content"]').value;

        const reponse = await models.blog.update(blogId, { title, content });
        if (reponse.status !== 400) {
            const index = blogs.findIndex(item => item.id === blogId);
            blogs[index].title = title;
            blogs[index].content = content;
            onUpdate(blogs);
            onClose();
            return;
        } else {
            alert('更新失败');
        }
    }


    return (
        <div>
            <Modal show={show}
                onHide={onClose}
                dialogClassName="custom-modal"
                size='lg'
                centered>
                <Modal.Header>
                    <Modal.Title>Blog</Modal.Title>
                    <button>
                        <i className="fas fa-times" onClick={onClose}></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {loading ? <div>加载中...</div> :
                        <div>
                            {/* <h5 className='label'>新增播放清单</h5> */}
                            <input id="title"
                                className='blog-input'
                                type="text"
                                placeholder="Blog Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea id="content"
                                className='blog-input'
                                placeholder="Blog Content"
                                rows="10"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary'
                        onClick={onClose}>取消</button>

                    <button className='btn btn-success'
                        onClick={handleSave}>保存</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BlogPop;