import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import models from './client/models';
import './MovieForm.css';

const MovieForm = () => {
    const [movie, setMovie] = useState({
        name: '',
        description: '',
        posterUrl: '',
        bigPosterUrl: '',
        releaseDate: '',
        serialNumber: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const showError = (error) => {
        console.error('Error:', error);
    }

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await models.movie.getById(id);
                const data = response.data;
                if (data.serialNumber === null) {
                    data.serialNumber = '';
                }
                if (data.bigPosterUrl === null) {
                    data.bigPosterUrl = '';
                }
                setMovie(data);
            }
            catch (error) {
                showError(error);
            }
        }
        if (id) {
            fetchMovie();
        }

        // if (id) {
        //     // Fetch movie data if editing
        //     models.movie.getById(id)
        //         .then(response => setMovie(response.data))
        //         .catch(error => showError(error));
        // }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('movie:', movie);
        let response;
        if (!id) {
            response = await models.movie.create(movie);
        } else {
            response = await models.movie.update(id, movie);
        }
        console.log('response:', response);
        if (response.status === 200) {
            navigate(`/movies/${response.data.id}`);
        } else {
            showError(response.data);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className='container-form' >
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label text-right">Name:</label>
                    <div className="col-sm-10">
                        <input type="text" id="name" name="name" className="form-control" value={movie.name} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="releaseDate" className="col-sm-2 col-form-label text-right">Release Date:</label>
                    <div className="col-sm-10">
                        <input type="text" id="releaseDate" name="releaseDate" className="form-control" value={movie.releaseDate} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="serialNumber" className="col-sm-2 col-form-label">SN:</label>
                    <div className="col-sm-10">
                        <input type="text" id="serialNumber" name="serialNumber" className="form-control" value={movie.serialNumber} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="posterUrl" className="col-sm-2 col-form-label text-right">Poster URL:</label>
                    <div className="col-sm-10">
                        <input type="text" id="posterUrl" name="posterUrl" className="form-control" value={movie.posterUrl} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="bigPosterUrl" className="col-sm-2 col-form-label text-right">Big Poster URL:</label>
                    <div className="col-sm-10">
                        <input type="text" id="bigPosterUrl" name="bigPosterUrl" className="form-control" value={movie.bigPosterUrl} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-2 col-form-label text-right">Description:</label>
                    <div className="col-sm-10">
                        <textarea id="description" name="description" className="form-control"
                            rows="10"
                            value={movie.description} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group row">

                    <div className="col-sm-10 offset-sm-2">
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" onClick={() => navigate(-1)}>取消</button>
                            <button type="submit" className="btn btn-success">保存</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MovieForm;