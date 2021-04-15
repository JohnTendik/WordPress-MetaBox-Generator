import React, {useState} from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import './blankMetaBox.scss';

const BlankMetaBox = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const isStickyClass = props.sticky ? 'sticky' : '';

  return (
    <div className={`meta-box ${isStickyClass}`}>
      <div className='meta-box-header' onClick={() => setIsOpen(!isOpen)}>
        <strong>{props.title ? props.title : 'Default Meta Box'}</strong>
        { isOpen ? <AiFillCaretUp color="787c82" /> : <AiFillCaretDown color="787c82" /> }
      </div>
      { isOpen && (
        <div className='meta-box-body'>
          {props.customContent ? (
            {...props.customContent}
            ) : (
            <>
              <p>This is a default box for visual representation</p>
              <div className='blank-content'></div>
              <div className='blank-content'></div>
              <div className='blank-content small'></div>
              <div className='blank-content large'></div>
              <div className='blank-content'></div>
              <div className='blank-content small'></div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BlankMetaBox;