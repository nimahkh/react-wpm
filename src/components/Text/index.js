import React, {useState} from 'react';
import {useStateValue} from '../../statemanagement'
import TextHandler from "./TextHandler"
import {Timer} from "../../utils/Timeout"

function Text(props) {
  const [
    {
      start
    }
  ] = useStateValue()

  return (<React.Fragment>
    {start && <Timer stop={1}/>}
    <TextHandler/>
  </React.Fragment>)
}

export default Text;
