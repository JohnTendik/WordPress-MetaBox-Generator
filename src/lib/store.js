import React, {createContext, useReducer} from 'react';

const initialState = {
  metaBoxGlobalOptions: {
    id: 'jt-custom-meta-box-id',
    title: 'Custom Meta Box',
    screens: [],
    textDomain: 'jt-mbg-text-domain',
    context: 'advanced',
    priority: 'default',
    className: 'JT_MBG_CLASS',
  },
  fields: [],
  generatedCode: 'Click the generate code button when you are ready.',
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'action description':
        const newState = {...state}// do something with the action
        return newState;

      case 'add new field': {
        const newState = {...state, fields: [...state.fields, action.value]}
        return newState;
      }

      case 'update meta box option': {
        const newState = {...state, metaBoxGlobalOptions: {...state.metaBoxGlobalOptions, [action.value.optionName]: action.value.value}}
        return newState;
      }

      case 'update field option': {
        const fields = state.fields;
        fields[action.value.indx] = {...fields[action.value.indx], [action.value.optionName]: action.value.value};
        const newState = {...state, fields}
        return newState;
      };

      case 'update screens': {
        let screens = state.metaBoxGlobalOptions.screens;

        if (screens.includes(action.value)) {
          // remove
          screens = screens.filter((screen) => screen !== action.value);
        } else {
          screens = [...screens, action.value];
        }

        const newState = {...state, metaBoxGlobalOptions: {
          ...state.metaBoxGlobalOptions,
          screens
        }}

        return newState;
      };

      case 'delete field': {
        let fields = state.fields;
        fields = fields.filter((field, indx) => indx !== action.value);

        const newState = {...state, fields};
        return newState;
      };

      case 'update generated code': {      
        const newState = {...state, generatedCode: action.value}
        return newState;
      };

      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }