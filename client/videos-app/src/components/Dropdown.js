// import './Dropdown.scss';
import { Dropdown } from 'react-bootstrap';

export const MyDropdown = ({ icon, items }) => {
    return (
        <Dropdown >
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-toggle">
                <i className={icon}></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {items.map((item, index) => (
                    <Dropdown.Item key={index} onClick={item.onClick}>{item.text}</Dropdown.Item>
                ))}

                {/* <Dropdown.Item onClick={() => navigate('/userinfo')}>UserInfo</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                <Dropdown.Item onClick={() => { closeMenu(); }}>Close Menu</Dropdown.Item> */}
            </Dropdown.Menu>
        </Dropdown>
    );
}