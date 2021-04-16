import React, {useContext, useState} from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CopyBlock, dracula } from "react-code-blocks";

import { store } from '../../../lib/store';
import Code from '../../../lib/generateCodeTemplate.js';

const GenerateMetaBox = (props) => {
  const { state, dispatch } = useContext(store);
  const { metaBoxGlobalOptions, fields } = state;

  const generateCode = () => {
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

    return generatedCode;
  };

  return (
    <div className='meta-box generate-meta-box-screen'>
      <div className='meta-box-header'>
        <strong>{metaBoxGlobalOptions.title}</strong>
        <div className='meta-box-actions'>
          <button onClick={(evt) => {props.setMetaBoxView('fields')}} className='button edit-meta-done'><AiOutlineArrowLeft /> Fields</button>
        </div>
      </div>
      <div className='meta-box-body'>
        <CopyBlock
          text={generateCode()}
          useScroll
          customStyle={{
            maxHeight: '600px',
            overflow: 'scroll',
          }}
          showLineNumbers={true}
          language={'php'}
          theme={dracula}
          codeBlock
        />
      </div>
    </div>
  )
};

export default GenerateMetaBox;