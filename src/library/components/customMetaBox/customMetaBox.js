import React, {useContext, useState} from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai';

import './customMetaBox.scss';
import Field from '../fields/field';
import DropDown from '../dropDown/dropDown';
import { store } from '../../../lib/store';
import EditMetaBoxOptions from './editMetaBoxOptions';

const CustomMetaBox = () => {
  const { state, dispatch } = useContext(store);
  const { metaBoxGlobalOptions, fields } = state;
  
  const [isEditingMetaBox, setIsEditingMetaBox] = useState(true);

  const renderFields = () => {
    return fields.map((field, indx) => (
      <Field field={field} indx={indx} key={indx} />
    ));
  };

  const addNewField = (type) => {
    dispatch({
      type: 'add new field',
      value: {
        id: `new-field-id-${fields.length}`,
        type,
        label: 'New field',
      }
    })
  };

  return (
    <div>
      {isEditingMetaBox ? <EditMetaBoxOptions setIsEditingMetaBox={setIsEditingMetaBox} /> : (
        <div className='meta-box'>
          <div className='meta-box-header'>
            <strong>Fields - {metaBoxGlobalOptions.title}</strong>
            <div className='meta-box-actions'>
              <button onClick={(evt) => {setIsEditingMetaBox(true)}} className='button edit-meta-done'><AiOutlineArrowLeft /> Settings</button>
              <button onClick={(evt) => {setIsEditingMetaBox(true)}} className='button edit-meta-done'>Code <AiOutlineArrowRight /></button>
            </div>
          </div>
          <div className='meta-box-body'>
            { !fields.length ? (
                <div>
                  <p>Begin by adding a new field to your meta-box!</p>
                </div>
            ) : renderFields()}
          </div>
          <div className='meta-box-footer'>
            <DropDown primary={true} buttonText={<>Add New Field <AiOutlinePlus /></>}>
              <button onClick={() => addNewField('text')}>Text</button>
              <button onClick={() => addNewField('number')}>Number</button>
              <button onClick={() => addNewField('tel')}>Tel</button>
              <button onClick={() => addNewField('url')}>Url</button>
              <button onClick={() => addNewField('password')}>Password</button>
              <button onClick={() => addNewField('email')}>Email</button>
              <button onClick={() => addNewField('hidden')}>Hidden</button>
              <button onClick={() => addNewField('color')}>Color</button>
            </DropDown>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMetaBox;