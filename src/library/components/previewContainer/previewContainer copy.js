import React, {useEffect} from 'react';
import { Droppable } from '@shopify/draggable';

import './previewContainer.scss';
import BlankMetaBox from '../blankMetaBox/blankMetaBox';
import CustomMetaBox from '../customMetaBox/customMetaBox';

const PreviewContainer = () => {

  useEffect(() => {
    const droppable = new Droppable(document.querySelectorAll('.layout-container'), {
      handle: '.meta-box-header strong',
      dropzone: '.dropzone',
      draggable: '.item',
    });
  }, []);

  return (
    <section className='layout-container'>
      <div className='main dropzone'>
        <input className='post-title' defaultValue='WordPress Post Title' />
        <BlankMetaBox customContent={(
            <>
              <p>This is a default box for visual representation. Scroll down to setup your custom meta </p>
              <div className='blank-content'></div>
              <div className='blank-content'></div>
              <div className='blank-content small'></div>
              <div className='blank-content large'></div>
              <div className='blank-content'></div>
              <div className='blank-content small'></div>
            </>
          )} />
        <div className='item'>
          <CustomMetaBox />
        </div>
      </div>
      <div className='side dropzone'>
        <BlankMetaBox customContent={(
          <>
            <p>This is a default box for visual representation</p>
            <div className='blank-content'></div>
            <div className='blank-content'></div>
            <div className='blank-content small'></div>
          </>
        )} />
        <BlankMetaBox customContent={(
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