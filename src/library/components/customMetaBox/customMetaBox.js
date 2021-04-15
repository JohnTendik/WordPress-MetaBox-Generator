import React, {useContext, useState} from 'react';
import { AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai';

import './customMetaBox.scss';
import Field from '../fields/field';
import { store } from '../../../lib/store';
import GenerateMetaBox from './generateMetaBox';

const CustomMetaBox = () => {
  const { state } = useContext(store);
  const { metaBoxGlobalOptions, fields } = state;
  
  const [metaBoxView, setMetaBoxView] = useState('fields');

  const renderFields = () => {
    return fields.map((field, indx) => (
      <Field field={field} indx={indx} key={indx} />
    ));
  };

  const renderFieldsScreen = () => (
    <div className='meta-box'>
      <div className='meta-box-header'>
        <strong>{metaBoxGlobalOptions.title}</strong>
        <div className='meta-box-actions'>
          <button onClick={(evt) => {setMetaBoxView('code')}} className='button edit-meta-done'>Code <AiOutlineArrowRight /></button>
        </div>
      </div>
      <div className='meta-box-body'>
        { !fields.length ? (
            <div>
              <p>Begin by adding a new field to your meta-box using the select + button in the side column!</p>
            </div>
        ) : renderFields()}
      </div>
    </div>
  );

  return (
    <div>
      {metaBoxView === 'fields' && renderFieldsScreen()}
      {metaBoxView === 'code' && <GenerateMetaBox setMetaBoxView={setMetaBoxView}/>}
    </div>
  );
};

export default CustomMetaBox;