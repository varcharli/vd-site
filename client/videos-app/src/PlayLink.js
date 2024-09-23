import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayLink = ({ movieId, onClose }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [playLinks, setPlayLinks] = useState([]);

  useEffect(() => {
    // Fetch existing playLinks for the given movieId when the component mounts
    const fetchPlayLinks = async () => {
      try {
        const response = await axios.get(`/playLinks?movieId=${movieId}`);
        setPlayLinks(response.data);
      } catch (error) {
        console.error('Error fetching playLinks:', error);
      }
    };

    fetchPlayLinks();
    console.log('fetchPlayLinks ' + movieId);
  }, [movieId]);

  const handleCreate = async () => {
    try {
      const response = await axios.post('/playLinks', { movieId, name, link });
      console.log('response.data ' + movieId + ' ' + name + ' ' + link);
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
        const response = await axios.put(`/playLinks/${playLinks[index].id}`, { movieId, name: newName, link: newLink });
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
    <div className="playlink-popup">
      <button onClick={onClose}>Close</button>
      <div className="create-section">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className="manage-section">
        {playLinks.map((playLink, index) => (
          <div key={index} className="playlink-item">
            <span>{playLink.name}</span>
            <span>{playLink.link}</span>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayLink;