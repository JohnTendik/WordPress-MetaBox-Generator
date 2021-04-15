import React, {useContext, useState} from 'react';

import './previewContainer.scss';
import BlankMetaBox from '../blankMetaBox/blankMetaBox';
import CustomMetaBox from '../customMetaBox/customMetaBox';
import EditMetaBoxOptions from '../customMetaBox/editMetaBoxOptions';
import { store } from '../../../lib/store';

const PreviewContainer = () => {
  const { state, dispatch } = useContext(store);
  const { fields } = state;
  const [addFieldSelection, setAddFieldSelection] = useState('text');

  const addNewField = (type) => {
    dispatch({
      type: 'add new field',
      value: {
        id: `new_field_id_${fields.length}`,
        type,
        label: 'New field',
      }
    })
  };

  const handleFieldSelectChange = (evt) => {
    const value = evt.target.value;
    setAddFieldSelection(value);
  };

  return (
    <section className='layout-container'>
      <div className='main dropzone'>
        <input className='post-title' defaultValue='WordPress Post Title' />
        <div className='item'>
          <CustomMetaBox />
        </div>
        <BlankMetaBox title='Metabox Settings' customContent={(
            <>
              <EditMetaBoxOptions />
            </>
          )} />
      </div>
      <div className='side dropzone'>
        <BlankMetaBox title='Add new fields' customContent={(
          <>
            <p>Add new fields to your meta box below!</p>
            <div className='add-field-container'>
              <label htmlFor='fieldtype'>Field type:</label>
              <select id='fieldtype' onChange={handleFieldSelectChange} defaultValue={addFieldSelection}>
                <option value='text'>Text Input</option>
                <option value='number'>Number</option>
                <option value='tel'>Tel</option>
                <option value='email'>Email</option>
                <option value='password'>Password</option>
                <option value='hidden'>Hidden</option>
                <option value='color'>Color</option>
                <option value='paragraph'>Description Text</option>
              </select>
              <button className='button primary' onClick={() => addNewField(addFieldSelection)}>Add New Field</button>
            </div>
          </>
        )} />
        <BlankMetaBox title='Generate' customContent={(
          <>
            <p>Once you are happy with your meta box, click the generate button below to get your code for free!</p>
            <button className='button primary'>Generate</button>
          </>
        )} />
      </div>
    </section>
  );
};

export default PreviewContainer;