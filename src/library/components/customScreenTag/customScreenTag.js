import React from 'react';
import Proptypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

import './customScreenTag.scss';

const CustomScreenTag = (props) => {

  return (
    <div className='tag'>
      <span>{props.name}</span>
      <button onClick={props.onClose}><AiOutlineClose /></button>
    </div>
  )
};

CustomScreenTag.propTypes = {
  name: Proptypes.string.isRequired,
  onClose: Proptypes.func.isRequired,
};

export default CustomScreenTag;