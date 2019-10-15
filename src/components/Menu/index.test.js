import React from 'react'
import renderer from 'react-test-renderer';
import Menu from "./index"
import {StateProvider} from "../../statemanagement"
import {BrowserRouter as Router, Link} from "react-router-dom";

describe('rRnder Menu list', () => {
  test('Check List', () => {
    const initialState = {
      text: '',
      errors: '',
      stop: false,
      start: false,
      testResult: {
        wpm: 0,
        elapsedTime: 0,
        accuracy: 0,
        mistakes: 0,
        misspelled: 0,
        userInput: ''
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
          return {
            ...state,
            errors: action.errors
          };
        case 'stopTimer':
          return {
            ...state,
            stop: action.stop
          };
        case 'startTheGame':
          return {
            ...state,
            start: action.start
          };
        case 'WPMResult':
          return {
            ...state,
            testResult: {
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

    const component = renderer.create(<StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Menu/>
      </Router>
    </StateProvider>);
    const instance= component.root;
    expect(instance.findAllByType(Link).length===2).toBe(true);
  })
})
