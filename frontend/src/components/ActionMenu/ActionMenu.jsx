import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/_action-menu.scss';
import { ActionButton } from './ActionButton';

const Submenu = ({ items, isActive, marginLeft }) => {
  return (
    <div className={`submenu ${isActive ? 'active' : ''}`} style={{ marginLeft: `${marginLeft}px` }}>
      {items.map((item) => (
        <button key={item} onClick={() => console.log(item)}>
          {item}
          {console.log("margin left: ", marginLeft)}
        </button>
      ))}
    </div>
  );
};

export const ActionMenu = ({ items }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const menuRef = useRef(null);
  const [refs, setRefs] = useState([]); // Use useState to store the array of refs
  const [marginLeft, setMarginLeft] = useState(0);

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

  const handleItemMouseEnter = (label, index) => {
    if (!activeItem) {
      setHoveredItem(label);
    } else {
      setActiveItem(label);
    }

    // Calculate the cumulative width of preceding buttons
    const cumulativeWidth = refs
      .slice(0, index)
      .reduce((sum, ref) => sum + ref.current.offsetWidth, 0);

    setHoveredItem(label);
    setMarginLeft(cumulativeWidth);
  };

  const handleItemMouseLeave = () => {
    setHoveredItem(null);
  };

  // Callback function to retrieve refs from ActionButton component
  const retrieveButtonRef = (ref, index) => {
    refs[index] = ref;
    setRefs([...refs]);
  };

  return (
    <div ref={menuRef} className="action-menu">
      {items.map((item, index) => (
        <ActionButton
          key={item.label}
          item={item}
          index={index}
          isActive={activeItem === item.label || hoveredItem === item.label}
          handleItemMouseEnter={handleItemMouseEnter}
          handleItemMouseLeave={handleItemMouseLeave}
          handleItemClick={handleItemClick}
          // Pass the callback function to retrieve refs
          refCallback={retrieveButtonRef}
        />
      ))}
      {activeItem && (
        <Submenu
          items={items.find((item) => item.label === activeItem)?.submenu || []}
          isActive={items.find((item) => item.label === activeItem)}
          marginLeft={marginLeft}
        />
      )}
    </div>
  );
};
