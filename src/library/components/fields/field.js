import React, {useState} from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import './field.scss';
import NumberField from './numberfield/numberfield';
import TextField from './textfield/textfield';

const Field = ({ field, indx }) => {
  const [isEditting, setIsEditting] = useState(false);

  const handleEditField = () => {
    setIsEditting(!isEditting);
  };

  const RenderField = (props) => {
    switch (field.type) {
      case 'tel':
      case 'url':
      case 'text':
      case 'email':
      case 'color':
      case 'number':
      case 'hidden':
      case 'password':
        return <TextField {...props} />;
        break;
      default:
        break;
    }
  };

  const defaultProps = {
    indx,
    field,
    isEditting,
  };

  return (
    <div className={`custom-field-container ${isEditting ? 'editting' : ''}`}>
      {RenderField(defaultProps)}
      <button className='button edit-field' onClick={handleEditField}>{isEditting ? <AiFillCaretUp /> : <AiFillCaretDown />} Edit</button>
    </div>
  );
};

export default Field;