import React, {useContext} from 'react';

import {store} from '../../../../lib/store';

const NumberField = ({ field, isEditting, indx }) => {
  const { dispatch } = useContext(store);

  const renderPreview = () => {
    return (
      <div className='field-preview'>
        <label htmlFor={field.id}>{field.label}</label>
        <input id={field.id} type='number' min={field.min} max={field.max} step={field.step} />
      </div>
    );
  };

  const handleOptionsUpdate = (evt, optionName) => {
    const value = evt.currentTarget.value;
    dispatch({
      type: 'update field option',
      value: {
        indx,
        value,
        optionName
      }
    })
  };

  return (
    <div className='custom-field'>
      {renderPreview()}
      {isEditting && (
        <div className='field-options'>
          <h4>Field Options</h4>
          <div className='field-option-container'>
            <label>Field label</label>
            <input value={field.label} onChange={(evt) => handleOptionsUpdate(evt, 'label')} />
          </div>

          <div className='field-option-container'>
            <label>Field id</label>
            <input value={field.id} onChange={(evt) => handleOptionsUpdate(evt, 'id')} />
          </div>

          <div className='field-option-container'>
            <label>Min value</label>
            <input type='number' value={field.min} onChange={(evt) => handleOptionsUpdate(evt, 'min')} />
          </div>

          <div className='field-option-container'>
            <label>Max value</label>
            <input type='number' value={field.max} onChange={(evt) => handleOptionsUpdate(evt, 'max')} />
          </div>

          <div className='field-option-container'>
            <label>Step</label>
            <input type='number' value={field.step} onChange={(evt) => handleOptionsUpdate(evt, 'step')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NumberField;