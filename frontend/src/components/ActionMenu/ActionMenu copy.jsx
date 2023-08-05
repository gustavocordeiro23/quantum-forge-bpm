import React, { useState, useEffect, useRef } from 'react';
import "../../assets/styles/_action-menu.scss";

const Submenu = ({ items, isActive }) => {
    return (
      <div className={`submenu ${isActive ? 'active' : ''}`}>
        {items.map((item) => (
          <button key={item} onClick={() => console.log(item)}>
            {item}
          </button>
        ))}
      </div>
    );
  };

export const ActionMenu = ({ items }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const menuRef = useRef(null);
  
    useEffect(() => {
      const handleDocumentClick = (event) => {
        if (!menuRef.current.contains(event.target)) {
          setActiveItem(null);
        }
      };
  
      document.addEventListener('click', handleDocumentClick);
  
      return () => {
        document.removeEventListener('click', handleDocumentClick);
      };
    }, []);
  
    const handleItemClick = (label) => {
      setActiveItem((prevLabel) => (prevLabel === label ? null : label));
    };
  
    const handleItemMouseEnter = (label) => {
      if (!activeItem) {
        setHoveredItem(label);
      }
      else {
        setActiveItem(label);
      }
    };
  
    const handleItemMouseLeave = () => {
        setHoveredItem(null);
    };
  
    return (
      <div ref={menuRef} className="action-menu">
        {items.map((item) => (
          <div
            key={item.label}
            onMouseEnter={() => handleItemMouseEnter(item.label)}
            onMouseLeave={handleItemMouseLeave}
          >
            <button
              className={`action-button ${activeItem === item.label || hoveredItem === item.label ? 'active' : ''}`}
              onClick={() => handleItemClick(item.label)}
            >
              {item.label} <span className="arrow-down" />
            </button>
            {item.submenu && <Submenu items={item.submenu} isActive={activeItem === item.label} />}
          </div>
        ))}
      </div>
    );
  };
