import React, {useContext} from 'react';

import {store} from '../../../../lib/store';

const ParagraphField = ({ field, isEditting, indx }) => {
  const { dispatch } = useContext(store);
  const defaultOptions = [{
    label: 'Field Id',
    value: field.id,
    optionName: 'id',
  },{
    label: 'Text',
    value: field.text,
    optionName: 'text',
  }];

  const renderPreview = () => {
    return (
      <div className='field-preview'>
        <span id={field.id}>{field.text || 'Add some descriptive text here'}</span>
      </div>
    );
  };

  const renderOptions = () => {
    return defaultOptions.map((optionField) => {
      if (optionField.optionName === 'text') {
        return (
          <div className='field-option-container'>
            <label>{optionField.label}</label>
            <textarea style={{resize: 'none'}} onChange={(evt) => handleOptionsUpdate(evt, optionField.optionName)}>{optionField.value}</textarea>
          </div>
        )
      }
      return (
        <div className='field-option-container'>
          <label>{optionField.label}</label>
          <input type={optionField.type || 'text'} value={optionField.value} onChange={(evt) => handleOptionsUpdate(evt, optionField.optionName)} />
        </div>
      )
    });
  };

  const renderEdit = () => {
    if (!isEditting) {
      return;
    } else {
      return (
        <div className='field-options'>
          <h4>Field Options</h4>
          {renderOptions()}
        </div>
      );
    }
  };

  const handleOptionsUpdate = (evt, optionName) => {
    let value = evt.currentTarget.value;

    if (optionName === 'id') {
      value = value.replace(/[- ]/gi,'_');
      value = value.replace(/[^a-z0-9_]/gi,'');
    }

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
      {renderEdit()}
    </div>
  );
};

export default ParagraphField;