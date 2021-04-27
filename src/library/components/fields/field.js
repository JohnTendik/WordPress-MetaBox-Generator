import React, {useState, useContext} from 'react';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineDelete } from 'react-icons/ai';

import './field.scss';
import { store } from '../../../lib/store';
import TextField from './textfield/textfield';
import ParagraphField from './paragraph/paragraph';

const Field = ({ field, indx }) => {
  const { dispatch } = useContext(store);
  const [isEditting, setIsEditting] = useState(false);

  const handleEditField = () => {
    setIsEditting(!isEditting);
  };

  const handleDeleteField = () => {
    dispatch({
      type: 'delete field',
      value: indx
    })
  };

  const RenderField = (props) => {
    switch (field.type) {
      case 'tel':
      case 'url':
      case 'date':
      case 'time':
      case 'text':
      case 'email':
      case 'color':
      case 'range':
      case 'button':
      case 'number':
      case 'hidden':
      case 'password':
        return <TextField {...props} />;
        break;
      case 'paragraph':
        return <ParagraphField {...props} />;
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
      {isEditting && <button className='button edit-field' onClick={handleDeleteField}><AiOutlineDelete /> Delete</button>}
      <button className='button edit-field' onClick={handleEditField}>{isEditting ? <AiFillCaretUp /> : <AiFillCaretDown />} Edit</button>
    </div>
  );
};

export default Field;