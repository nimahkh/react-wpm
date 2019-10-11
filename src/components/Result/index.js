import React from 'react'
import {useStateValue} from "../../statemanagement"

function Result(props){
  const [, dispatch] = useStateValue();

  function reTest(){
    dispatch({
      type:'stopTimer',
      stop:false
    })
  }

  return(
    <div onClick={reTest}>Your time is finished</div>
  )
}

export default Result
