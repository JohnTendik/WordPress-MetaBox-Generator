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
      let fieldsHtml = fields.map((field) => `echo "<div class='jt-meta-box-flex'><label for='${field.id}'>${field.label}</label><input id='${field.id}' type='${field.type}' placeholder='${field.placeholder}' /></div>";`);
      generatedCode = generatedCode.replace('@@fields@@', fieldsHtml.join('\n\r'));
    } else {
      generatedCode = generatedCode.replace('@@fields@@', '');
    }

    return generatedCode;
  };

  return (
    <div className='meta-box generate-meta-box-screen'>
      <div className='meta-box-header'>
        <strong>Fields - {metaBoxGlobalOptions.title}</strong>
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