import React, {useContext} from 'react';

import {store} from '../../../../lib/store';

const TextField = ({ field, isEditting, indx }) => {
  const { dispatch } = useContext(store);

  const renderPreview = () => {
    return (
      <div className='field-preview'>
        <label htmlFor={field.id}>{field.label}</label>
        <input id={field.id} type='text' placeholder={field.placeholder} />
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
            <label>Placeholder</label>
            <input value={field.placeholder} onChange={(evt) => handleOptionsUpdate(evt, 'placeholder')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextField;