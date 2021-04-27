import React, {useContext} from 'react';
import { CopyBlock, dracula } from "react-code-blocks";

import { store } from '../../../lib/store';

const GenerateMetaBox = () => {
  const { state } = useContext(store);
  const { generatedCode } = state;
  console.log(state);

  return (
    <div className=''>
      <CopyBlock
        text={generatedCode}
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
  )
};

export default GenerateMetaBox;