import React from 'react'
import Generator from "./index"
import {StateProvider} from "../../statemanagement"
import {mount} from "../../../enzyme"
import axios from 'axios';
import {generateText} from "../../requests/generateText"
import {act} from "react-dom/test-utils"

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
jest.mock('axios');

let params = {
  sentences: 1,
  lorem: 0
};
const url = `https://baconipsum.com/api/?type=all-meat&sentences=${params.sentences}&start-with-lorem=${params.lorem}`
const responseText = ["Jowl turkey shoulder, pig tail corned beef kevin."]
const resp = {
  data: responseText
};

describe('Generating the random text', () => {
  let wrapper;
  beforeEach(() => {
    act(() => {
      wrapper = mount(Component);
    })
  })

  const Component = <StateProvider initialState={initialState} reducer={reducer}>
    <Generator/>
  </StateProvider>;
  axios.get.mockResolvedValue(resp);

  test('Random text will set to state', done => {
    setTimeout(() => {
      expect(wrapper.find('.entryText').text()).toEqual(responseText[0]);
      done()
    })
  })
})
