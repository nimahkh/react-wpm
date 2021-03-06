import React, {useState} from 'react';
import {useStateValue} from '../../statemanagement'
import {selectText, stringCount} from '../../utils/utils'

export default function TextHandler(props) {
  const [
    {
      text,
      stop,
      start,
      testResult
    }, dispatch] = useStateValue();
  const [typeText, setNewText] = useState();
  const [startTime, setStartTime] = useState();
  const [completed, setCompleted] = useState(false);

  let currentText = text !== ""
    ? selectText(text)
    : "";
  let endTime;
  let enteredWordCount = 0;
  let elapsedTime;
  let generalTextLenght = text !== ""
    ? stringCount(text[0])
    : 0;
  let accuracy;
  let markupText = "";
  let lastWordEnetred;
  let mistakes;
  let lastWordsMatch;

  function handleInput(event) {
    if (!start) {
      dispatch({type: 'startTheGame', start: true})
    }

    const value = event.target.value;
    setNewText(value)

    //First start the test
    if (!start) {
      //set StartTime just once
      setStartTime(new Date());
    }

    //count user Entery
    enteredWordCount = stringCount(value);

    //if enteredWordCount count is equal to generalTextLenght , it means that test is finished .
    if (enteredWordCount === generalTextLenght) {
      endTime = new Date();
    }

    lastWordEnetred = enteredWordCount - 1;
    let filterUserInput = value.split(' ').filter(e => e);
    let exactLastword = filterUserInput[lastWordEnetred];
    let filterCurrentText = currentText.split(' ').filter(e => e);
    let targetWord = filterCurrentText[lastWordEnetred];
    lastWordsMatch = (exactLastword === targetWord);

    let misspelledWords = 0;

    for (let i = 0; i < lastWordEnetred; i++) {
      if (filterCurrentText[i] !== filterUserInput[i]) {
        misspelledWords++;
      }
    }

    if (misspelledWords >= 0) {
      dispatch({
        type: 'WPMResult',
        testResult: {
          ...testResult,
          misspelled: misspelledWords
        }
      })
    }

    // count character accuracy
    //let mistakes = 0;
    let characters = 0;
    mistakes = 0

    for (let i = 0; i <= lastWordEnetred; i++) {
      let userword = filterUserInput[i];
      let originalTextWord = filterCurrentText[i];
      if (userword && originalTextWord) {
        for (let j = 0; j < userword.length; j++) {
          characters++;
          if (userword[j] !== originalTextWord[j]) {
            mistakes++;
          }
        } // end of inner for loop
      }
    } // end of outer for loop

    // markup and replace text to insert highlighted spans for detected typing errors
    for (let i = 0; i < generalTextLenght; i++) {
      // highlight previously mispelled words in red
      if ((i < lastWordEnetred && filterCurrentText[i] !== filterUserInput[i])) {
        markupText += `<span style='background: red;'>${filterCurrentText[i]}</span> `;
        // in the current word, if there are non-matching characters, highlight them in yellow
      } else if (i === lastWordEnetred && filterCurrentText[i] !== filterUserInput[i]) {
        let currentUserWord = filterUserInput[i];
        let currentWordLength = currentUserWord.length;
        let originalWord = filterCurrentText[i];
        let buildWord = "";
        for (let j = 0; j < originalWord.length; j++) {
          if (j >= currentWordLength || currentUserWord[j] === originalWord[j]) {
            buildWord += `<span style='background: green;'>${originalWord[j]}</span>`;
          } else {
            buildWord += `<span style='background: yellow;'>${originalWord[j]}</span>`;
          }
        }
        markupText += `${buildWord} `;
        // otherwise, just add the word from the original source
      } else {
        markupText += `${filterCurrentText[i]} `;
      }
    }

    // only display positive integers, reset markupText
    if (mistakes >= 0) {
      dispatch({
        type: 'WPMResult',
        testResult: {
          ...testResult,
          mistakes: mistakes
        }
      })
      dispatch({type: 'changeErrors', errors: markupText})
      // reset markupText
      markupText = "";
    }

    // display character accuracy
    accuracy = Math.floor(((characters - mistakes) / characters) * 100);

    // ignore not-a-number errors when updating
    if (!isNaN(accuracy)) {
      dispatch({
        type: 'WPMResult',
        testResult: {
          ...testResult,
          accuracy: accuracy
        }
      })
    }

    // calculate words per minute
    let entryTime = new Date();
    let elapsedMinutes = (entryTime - startTime) / 1000 / 60;
    let wpm = Math.floor(enteredWordCount / elapsedMinutes);

    if (wpm !== Infinity && !isNaN(wpm)) {
      dispatch({
        type: 'WPMResult',
        testResult: {
          ...testResult,
          wpm: wpm
        }
      })
    }

    if (endTime && !completed && lastWordsMatch) {
      elapsedTime = (endTime - startTime) / 1000;
      let minutes = Math.floor(elapsedTime / 60);
      let seconds = Math.floor(elapsedTime % 60);

      dispatch({
        type: 'WPMResult',
        testResult: {
          ...testResult,
          elapsedTime: minutes + seconds
        }
      })

      setCompleted(true)
      //ok lets to see what you done
      dispatch({type: "stopTimer", stop: true})
    }

    if (mistakes === 0) {
      dispatch({
        type: 'WPMResult',
        testResult: {
          ...testResult,
          userInput: value
        }
      })
      setNewText(value)
    } else {
      return false;
    }
  }

  return (<React.Fragment>
    <div className="textArea">
    <textarea onChange={(
        e) => stop
        ? false
        : handleInput(e)} value={typeText}/>
    </div>
  </React.Fragment>)
}
