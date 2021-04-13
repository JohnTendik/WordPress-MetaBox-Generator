import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';

import './dropDown.scss';

const DropDown = (props) => {
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // mount
    document.addEventListener('mousedown', handleClickOutside);

    // unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (evt) => {
    if (containerRef && containerRef.current && !containerRef.current.contains(evt.target)) {
      setIsOpen(false);
    }
  }

  return (
    <div className='dropdown-container'>
      <button className={`${props.primary && 'primary'} button dropdown-button`} onClick={() => { setIsOpen(!isOpen) }}>{props.buttonText || 'Open'}</button>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} ref={containerRef} className='dropdown-children'>
          {props.children}
        </div>
      )}
    </div>
  )
};

export default DropDown;