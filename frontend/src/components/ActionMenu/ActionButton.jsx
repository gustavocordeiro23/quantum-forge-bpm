import React, { useRef, useEffect } from 'react';

export const ActionButton = ({ item, index, isActive, handleItemMouseEnter, handleItemMouseLeave, handleItemClick, refCallback }) => {
  const buttonRef = useRef(null);
    useEffect(() => {
        refCallback(buttonRef, index);
    }, []);


  return (
    <div
      onMouseEnter={() => handleItemMouseEnter(item.label, index)}
      onMouseLeave={handleItemMouseLeave}
    >
      <button
        ref={buttonRef}
        className={`action-button ${isActive ? 'active' : ''}`}
        onClick={() => handleItemClick(item.label)}
      >
        {item.label} <span className="arrow-down" />
      </button>
    </div>
  );
};

