import React, {useState, useEffect} from 'react';
import {useStateValue} from '../../statemanagement'
import {Timer} from "../../utils/Timeout"
// import {useDiff} from '../../utils/wpm'
import {selectText, stringCount} from '../../utils/utils'

function Text(props) {
  const [{text},dispatch] = useStateValue();
  const [typeText, setNewText] = useState();
  const [countNode, setCountNode] = useState(0);
  const [misspeledNode, setMissPelledNode] = useState(0);
  const [errorNode, setErrorNode] = useState(0);
  const [accuracyNode, setAccuracyNode] = useState();
  const [elapsedTimeNode, setElapsedTimeNode] = useState();
  const [completed, setCompleted] = useState(false);
  const [WPM, setWPM] = useState();
  // const [oldText,newText,position,dispatch] = useDiff(text,typeText,10);
  let currentText = text !== ""
    ? selectText(text)
    : "";
  let begun = false;
  let startTime;
  let endTime;
  let enteredWordCount = 0;
  let elapsedTime;
  let generalTextLenght = text !== ""
    ? stringCount(text[0])
    : 0;
  let accuracy;
  let markupText = "";

  function handleInput(event) {
    const value = event.target.value;

    //First start the test
    if (!begun) {
      begun = true;
      startTime = new Date();
    }

    //count user Entery
    enteredWordCount = stringCount(value);
    if (enteredWordCount >= 0) {
      //if entered Word Count is bigger than 0 , then set count node equals to enteredWordCount to show to the user
      setCountNode(enteredWordCount);
    }

    //if enteredWordCount count is equal to generalTextLenght , it means that test is finished .
    if (enteredWordCount === generalTextLenght) {
      endTime = new Date();
    }

    let lastWordEnetred = enteredWordCount - 1;
    let filterUserInput = value.split(' ').filter(e => e);
    let exactLastword = filterUserInput[lastWordEnetred];
    let filterCurrentText = currentText.split(' ').filter(e => e);
    let targetWord = filterCurrentText[lastWordEnetred];
    let lastWordsMatch = (exactLastword === targetWord);

    let misspelledWords = 0;

    for (let i = 0; i < lastWordEnetred; i++) {
      if (filterCurrentText[i] !== filterUserInput[i]) {
        misspelledWords++;
      }
    }

    if (misspelledWords >= 0) {
      setMissPelledNode(misspelledWords)
    }

    // count character accuracy
    //let mistakes = 0;
    let characters = 0;
    let mistakes=0

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
      setErrorNode(mistakes);
      dispatch({
        type:'changeErrors',
        errors:markupText
      })
      // reset markupText
      markupText = "";
    }

    // display character accuracy
    accuracy = Math.floor(((characters - mistakes) / characters) * 100);

    // ignore not-a-number errors when updating
    if (!isNaN(accuracy)) {
      setAccuracyNode(`${accuracy}%`)
    }

    // calculate words per minute
    let entryTime = new Date();

    let elapsedMinutes = (entryTime - startTime) / 60;
    let wpm= Math.floor(enteredWordCount / elapsedMinutes);

    if(wpm!== Infinity && !isNaN(wpm)){
      setWPM(wpm)
    }

    // calculate total typing time, only once per given text
    if (endTime && !completed && lastWordsMatch) {
      elapsedTime = (endTime - startTime) / 1000;
      let minutes = Math.floor(elapsedTime / 60);
      let seconds = Math.floor(elapsedTime % 60);
      setElapsedTimeNode(`${minutes}m ${seconds}s `)
      setCompleted(true)
    }

    if (mistakes === 0) {
      setNewText(value)
    }else{
      return false;
    }
  }

  return (<React.Fragment>
    <div>
      <span>WPM : {WPM} </span>
      <span>Elapsed Time : {elapsedTimeNode} </span>
      <span>Count Node : {countNode} </span>
      <span>Misspeled Node : {misspeledNode} </span>
      <span>Accuracy Node : {accuracyNode} </span>
      <span>errorNode : {errorNode} </span>
      <Timer start={Date.now()}/>
    </div>
    <textarea onChange={(e) => handleInput(e)} value={typeText}/>
  </React.Fragment>)
}

export default Text;
