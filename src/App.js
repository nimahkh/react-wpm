import React from 'react';
import './App.css';
import Text from './components/Text';
import Generator from './components/Generator'
import {StateProvider} from "./statemanagement"

function App() {
  const initialState = {
    text: ''
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeText':
        return {
          ...state,
          text: action.text
        };

      default:
        return state;
    }
  };

  return (<div className="App">
    <StateProvider initialState={initialState} reducer={reducer}>
      <Generator/>
      <Text/>
    </StateProvider>
  </div>);
}

export default App;
