import React, {useContext, useState} from 'react';

import './previewContainer.scss';
import BlankMetaBox from '../blankMetaBox/blankMetaBox';
import CustomMetaBox from '../customMetaBox/customMetaBox';
import EditMetaBoxOptions from '../customMetaBox/editMetaBoxOptions';
import { store } from '../../../lib/store';
import GenerateMetaBox from '../customMetaBox/generateMetaBox';
import Code from '../../../lib/generateCodeTemplate.js';

const PreviewContainer = () => {
  const { state, dispatch } = useContext(store);
  const { fields, metaBoxGlobalOptions } = state;
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

  const generateCode = () => {
    if (!fields.length) {
      alert('You must add at least 1 field before you can generate the meta box.');
      return;
    }
    
    let generatedCode = Code;

    generatedCode = generatedCode.replace('@@metabox-id@@', metaBoxGlobalOptions.id);
    generatedCode = generatedCode.replace('@@metabox-title@@', metaBoxGlobalOptions.title);
    generatedCode = generatedCode.replace('@@text-domain@@', metaBoxGlobalOptions.textDomain);
    generatedCode = generatedCode.replace('@@context@@', metaBoxGlobalOptions.context);
    generatedCode = generatedCode.replace('@@priority@@', metaBoxGlobalOptions.priority);

    if (metaBoxGlobalOptions.screens.length) {
      let screens = metaBoxGlobalOptions.screens.map((screen) => `'${screen}'`);
      generatedCode = generatedCode.replace('@@screens@@', screens.join(','));
    } else {
      generatedCode = generatedCode.replace('@@screens@@', '');
    }

    if (fields.length) {
      let fieldsHtml = fields.map((field) => {
        if (field.type === 'color') {
          return `
            $${field.id}_value = $this->get_value('${field.id}');
            echo "<div class='jt-meta-box-flex'><label for='${field.id}'>${field.label}</label><input id='${field.id}' name='${field.id}' value='#$${field.id}_value' type='${field.type}' /></div>";
          `;
        } else if (field.type === 'paragraph') {
          return `
            $${field.id}_value = $this->get_value('${field.id}');
            echo "<div class='jt-meta-box-flex'><span id='${field.id}'>${field.text}</span></div>";
          `;
        } else {
          const placeholder = field.placeholder ? `placeholder='${field.placeholder}'` : '';
          return `
            $${field.id}_value = $this->get_value('${field.id}');
            echo "<div class='jt-meta-box-flex'><label for='${field.id}'>${field.label}</label><input id='${field.id}' name='${field.id}' value='$${field.id}_value' type='${field.type}' ${placeholder} /></div>";
          `;
        }
      });
      generatedCode = generatedCode.replace('@@fields@@', fieldsHtml.join('\n\r'));

      // save posts
      let savePostHtml = fields.map((field) => `$${field.id}_new_val = ( isset( $_POST['${field.id}'] ) ? sanitize_html_class( $_POST['${field.id}'] ) : null );
      if ($${field.id}_new_val !== null) {
        update_post_meta( $post_id, $meta_key_prefix . "${field.id}", $${field.id}_new_val );
      }`);
      generatedCode = generatedCode.replace('@@save_post@@', savePostHtml.join('\n\r'));
    } else {
      generatedCode = generatedCode.replace('@@fields@@', '');
    }    

    dispatch({type: 'update generated code', value: generatedCode});
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

        <BlankMetaBox title='Code' customContent={(
            <>
              <GenerateMetaBox />
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
                <option value='date'>Date</option>
                <option value='time'>Time</option>
                <option value='range'>Range</option>
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
            <button className='button primary' onClick={generateCode}>Generate</button>
          </>
        )} />
      </div>
    </section>
  );
};

export default PreviewContainer;