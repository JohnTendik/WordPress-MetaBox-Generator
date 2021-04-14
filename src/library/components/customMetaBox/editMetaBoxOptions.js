import React, {useContext, useState} from 'react';
import { AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai';

import { store } from '../../../lib/store';
import CustomScreenTag from '../customScreenTag/customScreenTag';
import CheckboxInput from '../inputs/checkbox/checkbox';
import RadioInput from '../inputs/radio/radiobutton';

const EditMetaBoxOptions = (props) => {
  const { state, dispatch } = useContext(store);
  const { metaBoxGlobalOptions } = state;
  const [newCPTInputValue, setNewCPTInputValue] = useState('');

  const handleOptionsUpdate = (evt, optionName) => {
    const value = evt.currentTarget.value;
    dispatch({
      type: 'update meta box option',
      value: {
        value,
        optionName
      }
    })
  };

  const handleScreenOptionChanges = (value, name) => {
    if (name === '' || !name) {
      return;
    }

    dispatch({
      type: 'update screens',
      value: name
    });
  };

  const handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      handleScreenOptionChanges(true, newCPTInputValue);
      setNewCPTInputValue('');
    }
  };

  return (
    <div className='meta-box item edit-meta-box-screen'>
      <div className='meta-box-header'>
        <strong>Settings - {metaBoxGlobalOptions.title}</strong>
        <div className='meta-box-actions'>
          <button onClick={(evt) => {props.setMetaBoxView('fields')}} className='button edit-meta-done'>Fields <AiOutlineArrowRight /></button>
        </div>
      </div>
      <div className='meta-box-body'>
        <div className='meta-box-options-container'>
          <p>General</p>
          <div className='meta-box-option'>
            <div>
              <label>
                Meta Box Title
                <small><em>(string) (Required) Title of the meta box.</em></small>
              </label>
              <div>
                <input placeholder={metaBoxGlobalOptions.title} value={metaBoxGlobalOptions.title} onChange={(evt) => handleOptionsUpdate(evt, 'title')} />
              </div>
            </div>
          </div>
          
          <div className='meta-box-option'>
            <div>
              <label>
                Meta Box ID
                <small><em>(string) (Required) Meta box ID (used in the 'id' attribute for the meta box).</em></small>
              </label>
              <div>
                <input placeholder={metaBoxGlobalOptions.id} value={metaBoxGlobalOptions.id} onChange={(evt) => handleOptionsUpdate(evt, 'id')} />
              </div>
            </div>
          </div>

          <div className='meta-box-option'>
            <div>
              <label>
                Screens
                <small><em>(Optional) The screen or screens on which to show the box (such as a post type, 'link', or 'comment')</em></small>
              </label>
              <div>
                <div className='screen-post-types'>
                  <CheckboxInput title='post' handleOnChange={(value) => {handleScreenOptionChanges(value, 'post')}} />
                  <CheckboxInput title='page' handleOnChange={(value) => {handleScreenOptionChanges(value, 'page')}} />
                </div>
                <div className='screen-post-types'>
                  {metaBoxGlobalOptions.screens.filter((screen) => screen !== 'post' && screen !== 'page').map((cpt, indx) => {
                    return <CustomScreenTag key={indx} name={cpt} onClose={() => handleScreenOptionChanges(true, cpt)} />
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className='meta-box-option'>
            <div>
              <label>
                Custom Screens
                <small><em>Custom post types (such as 'movie', 'custom_post_type')</em></small>
              </label>
              
              <div className='flex'>  
                <input onKeyPress={handleKeyPress} placeholder='custom' value={newCPTInputValue} onChange={(evt) => setNewCPTInputValue(evt.currentTarget.value)} />
                <button
                  className='button'
                  onClick={(evt) => {handleScreenOptionChanges(true, newCPTInputValue); setNewCPTInputValue('')}}>
                  <AiOutlinePlus /> Add
                  </button>
              </div>
            </div>
          </div>

          <div className='meta-box-option'>
            <div>
              <label>
                Context
                <small><em>(Optional) The context within the screen where the box should display. Available contexts vary from screen to screen. Post edit screen contexts include 'normal', 'side', and 'advanced'.</em></small>
              </label>
              <div>
                <RadioInput
                  name='context'
                  value={metaBoxGlobalOptions.context}
                  options={['advanced', 'side', 'normal']}
                  handleOnChange={(evt) => handleOptionsUpdate(evt, 'context')} />
              </div>
            </div>
          </div>

          <div className='meta-box-option'>
            <div>
              <label>
                Priority
                <small><em>(Optional) The priority within the context where the box should show. Accepts 'high', 'core', 'default', or 'low'.</em></small>
              </label>
              <div>
                <RadioInput
                  name='priority'
                  value={metaBoxGlobalOptions.priority}
                  options={['high', 'core', 'default', 'low']}
                  handleOnChange={(evt) => handleOptionsUpdate(evt, 'priority')} />
              </div>
            </div>
          </div>

          <p>Advanced</p>
          <div className='meta-box-option'>
            <div>
              <label>
                Text Domain
                <small><em>(Optional) text domain for translations</em></small>
              </label>
              
              <div>
                <input placeholder={metaBoxGlobalOptions.textDomain} value={metaBoxGlobalOptions.textDomain} onChange={(evt) => handleOptionsUpdate(evt, 'textDomain')} />
              </div>
            </div>
          </div>

          <div className='meta-box-option'>
            <div>
              <label>
                Class Name
                <small><em>(Optional) The php class name that will be given for your code</em></small>
              </label>
              
              <div>
                <input placeholder={metaBoxGlobalOptions.className} value={metaBoxGlobalOptions.className} onChange={(evt) => handleOptionsUpdate(evt, 'className')} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='meta-box-footer'>
        <button onClick={(evt) => {props.setMetaBoxView('fields')}} className='button primary'>Fields <AiOutlineArrowRight /></button>
      </div>
    </div>
  )
};

export default EditMetaBoxOptions;