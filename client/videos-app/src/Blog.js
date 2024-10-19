// src/Favorite.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import models from './client/models';
import { TextButton, IconButton } from './components/CommonButtons';
import BlogPop from './BlogPop';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogId, setBlogId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [showPop, setShowPop] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        models.blog.get().then(response => {
            setBlogs(response.data);
            console.log('response.data:', response.data);
            setIsLoading(false);
        });
    }, []);

    const showPopUp = (id) => {
        setBlogId(id);
        setShowPop(true);
    }

    const handleDataUpdate = (data) => {
        setBlogs(data);
    }

    const handleDelete = async (blog) => {
        const response = await models.blog.remove(blog.id);
        if (response.status === 204) {
            setBlogs(blogs.filter(item => item.id !== blog.id));
        } else {
            alert('Delete failed');
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className='container-title'>
                Blogs
                <IconButton icon='fa fa-plus' onClick={() => showPopUp(0)} />
            </div>
            <div className='container-body'>
                <div className="card-list" >
                    {blogs.map(blog => {
                        const formattedDate = new Date(blog.createdAt).toISOString().split('T')[0];
                        return (
                            <div key={blog.id} className='blog-card'>
                                <div className='blog-title'>
                                    <>{blog.title}</>
                                    <div className='blog-action'>
                                        <IconButton icon='fa fa-edit' onClick={() => showPopUp(blog.id)} />
                                        {/* <IconButton icon='fa fa-trash' onClick={() => handleDelete(blog)} /> */}
                                    </div>
                                </div>
                                <div className='blog-date'>
                                    {formattedDate}
                                </div>
                                <div className='blog-content'>
                                    {blog.content}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <BlogPop show={showPop}
                blogId={blogId}
                getBlogs={blogs}
                onClose={() => setShowPop(false)} onUpdate={handleDataUpdate}
            />
        </div>
    );
}

export default Blog;