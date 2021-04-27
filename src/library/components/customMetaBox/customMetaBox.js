import React, {useContext, useState, useEffect} from 'react';
import { AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai';

import './customMetaBox.scss';
import Field from '../fields/field';
import { store } from '../../../lib/store';

const CustomMetaBox = (props) => {
  const { state } = useContext(store);
  const { metaBoxGlobalOptions, fields } = state;
  
  const [metaBoxView, setMetaBoxView] = useState('fields');

  useEffect(() => {
    if (props.metaBoxView !== metaBoxView) {
      setMetaBoxView(props.metaBoxView);
    }
  }, [props.metaBoxView])

  const renderFields = () => {
    return fields.map((field, indx) => (
      <Field field={field} indx={indx} key={indx} />
    ));
  };

  const renderFieldsScreen = () => (
    <div className='meta-box'>
      <div className='meta-box-header'>
        <strong>{metaBoxGlobalOptions.title}</strong>
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
      {renderFieldsScreen()}
    </div>
  );
};

export default CustomMetaBox;