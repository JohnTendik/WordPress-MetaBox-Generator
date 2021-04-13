import { render } from '@testing-library/react';
import React, {useContext} from 'react';

import {store} from '../../../../lib/store';

const TextField = ({ field, isEditting, indx }) => {
  const { dispatch } = useContext(store);
  const defaultOptions = [{
    label: 'Field Id',
    value: field.id,
    optionName: 'id',
  },{
    label: 'Field Label',
    value: field.label,
    optionName: 'label',
  }];

  const textFieldOptions = [{
    label: 'Placeholder',
    value: field.placeholder,
    optionName: 'placeholder',
  }];

  const numberFieldOptions = [{
    label: 'Max value',
    value: field.max,
    optionName: 'max',
    type: 'number'
  }, {
    label: 'Min value',
    value: field.min,
    optionName: 'min',
    type: 'number'
  }, {
    label: 'Step',
    value: field.step,
    optionName: 'step',
    type: 'number'
  }];

  const getAvailableOptions = () => {
    let options = [...defaultOptions];
    switch (field.type) {
      case 'text':
        options = [...options, ...textFieldOptions];
        break;
      case 'number':
        options = [...options, ...numberFieldOptions];
      default:
        break;
    }
    return options;
  };

  const renderPreview = () => {
    return (
      <div className='field-preview'>
        <label htmlFor={field.id}>{field.label}</label>
        <input {...field} />
      </div>
    );
  };

  const renderOptions = () => {
    return getAvailableOptions().map((optionField) => {
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
      {renderEdit()}
    </div>
  );
};

export default TextField;