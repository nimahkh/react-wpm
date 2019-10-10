import {useState} from 'react'

export function useDiff(){
  const [old,setOldText]=useState();
  const [newTexts,setNewText]=useState();
  const [positions,setPosition]=useState();

  function dispatch(oldText,newText,position){
    setOldText(oldText);
    setNewText(newText);
    setPosition(position);
  }

  return [old,newTexts,positions,dispatch];
}
