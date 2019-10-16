import React from 'react'
import renderer from 'react-test-renderer';
import MyScores from "./index"
import {StateProvider} from "../../statemanagement"
import {createXHRmock} from "../../requests/history.test"
import {getHistory} from "../../requests/history"
import {mount} from "../../../enzyme"
import {act} from "@testing-library/react";

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

describe('Get Scores', () => {

  it('Check It', done => {

    act(() => {
      let wrapper = mount(<StateProvider initialState={initialState} reducer={reducer}>
        <MyScores/>
      </StateProvider>)

      wrapper.find('button').props().onClick()

      const input = wrapper.find('.enterId');
      const event = {
        target: {
          value: 'testValue'
        }
      };

      input.simulate('change', event);
      wrapper.find('.search').simulate('click');

      setTimeout(() => {
        wrapper.update();
        createXHRmock();
        const history=getHistory(1)
        const responseOfRequest=JSON.parse(history.response)[0].data.Sample;
        expect(responseOfRequest.length>0).toBeTruthy();
        done()
      })

    })
  })
})
