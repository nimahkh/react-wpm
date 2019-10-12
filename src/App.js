import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import {StateProvider} from "./statemanagement"

function App() {
  const initialState = {
    text: '',
    errors: '',
    stop : false,
    start:false,
    testResult:{
      wpm: 0,
      elapsedTime: 0,
      accuracy: 0,
      mistakes: 0,
      misspelled: 0,
      userInput: '',
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeText':
        return {
          ...state,
          text: action.text
        };
        case 'changeErrors':
        return{
          ...state,
          errors: action.errors
        };
        case 'stopTimer':
        return{
          ...state,
          stop: action.stop
        };
        case 'startTheGame':
        return{
          ...state,
          start: action.start
        };
        case 'WPMResult':
        return {
          ...state,
          testResult:{
            wpm: action.testResult.wpm,
            elapsedTime: action.testResult.elapsedTime,
            accuracy: action.testResult.accuracy,
            mistakes: action.testResult.mistakes,
            misspelled: action.testResult.misspelled,
            userInput: action.testResult.userInput
          }
        };

      default:
        return state;
    }
  };

  return (<div className="App">
    <StateProvider initialState={initialState} reducer={reducer}>
        <MainComponent/>
    </StateProvider>
  </div>);
}

export default App;
