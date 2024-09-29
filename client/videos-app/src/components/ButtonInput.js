import './ButtonInput.css';


export const ButtonInput = ({ 
    icon, 
    value, 
    onClick,
    onChange,
    enterPress=true,
    placeholder='Search'

}) => {
    const handleKeyPress = (e) => {
        if (!enterPress) {
            return;
        }
        if (e.key === 'Enter') {
            onClick();
        }
    };
    return (
        <div className='search-container'>
        <button className="search-icon"
            onClick={onClick}>
            <i className={icon}></i>
        </button>
        <input type="text" placeholder={placeholder} className="search-box"
            value={value}
            onChange={onChange}
            onKeyUp={handleKeyPress}
            onFocus={(e) => e.target.select()} // 添加 onFocus 事件处理程序
        />
    </div>
    );
}