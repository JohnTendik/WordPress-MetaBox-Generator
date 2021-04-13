import React, {useState} from 'react';
import Proptypes from 'prop-types';

const CheckboxInput = (props) => {
  const {
    title,
    handleOnChange
  } = props;

  return (
    <div className='checkbox-container'>
      <span>{title}</span>
      <input type='checkbox' onChange={(evt) => handleOnChange(evt.target.checked, evt)} />
    </div>
  )
};

CheckboxInput.propTypes = {
  handleOnChange: Proptypes.func.isRequired,
};

export default CheckboxInput;