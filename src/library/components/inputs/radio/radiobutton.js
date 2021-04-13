import React from 'react';
import Proptypes from 'prop-types';

import './radiobutton.scss';

const RadioInput = (props) => {
  const {
    name,
    value,
    options,
    handleOnChange
  } = props;

  const onValueChange = (evt) => {
    const { name, value } = evt.target;
    handleOnChange(evt, value);
  };

  if (!options.length) {
    return;
  }

  return (
    <div className='radio-buttons-container'>
      {options.map((option, key) => {
        return (
          <label htmlFor={`${option}_${key}`} className='radioInput' key={key}><input id={`${option}_${key}`} defaultChecked={key === 0} checked={value === option} type='radio' name={name} value={option} onChange={onValueChange} /> {option}</label>
        );
      })}
    </div>
  )
};

RadioInput.propTypes = {
  name: Proptypes.string.isRequired,
  options: Proptypes.array.isRequired,
  handleOnChange: Proptypes.func.isRequired,
};

export default RadioInput;