// import './Dropdown.scss';
// import { Dropdown } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

// export const MyDropdown = ({ icon, items }) => {
//     return (
//         <Dropdown autoClose='true' >
//             <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-toggle">
//                 <i className={icon}></i>
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//                 {items.map((item, index) => (
//                     <Dropdown.Item key={index} onClick={item.onClick}>{item.text}</Dropdown.Item>
//                 ))}

//                 {/* <Dropdown.Item onClick={() => navigate('/userinfo')}>UserInfo</Dropdown.Item>
//                 <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//                 <Dropdown.Item onClick={() => { closeMenu(); }}>Close Menu</Dropdown.Item> */}
//             </Dropdown.Menu>
//         </Dropdown>
//     );
// }


export const MyDropMenu = ({ icon, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div className="dropmenu" ref={menuRef}>
        <button onClick={handleToggle} className="dropmenu-toggle">
           <i className={icon} />
        </button>
        {isOpen && (
          <ul className="dropmenu-menu">
            {items.map((item, index) => (
              <li key={index} className="dropmenu-item" onClick={item.onClick}>
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };