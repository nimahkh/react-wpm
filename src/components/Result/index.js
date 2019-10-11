import React,{useEffect} from 'react'
import {useStateValue} from "../../statemanagement"

function Result(props){
  const [{testResult:WPMResult}, dispatch] = useStateValue();

  function reTest(){
    dispatch({
      type:'stopTimer',
      stop:false
    })
    dispatch({
      type:'changeErrors',
      stop:''
    })
  }

  return(
    <React.Fragment>
      <div>
        <span>WPM : {WPMResult.wpm}</span>
        <span>Elapsed Time : {WPMResult.elapsedTime}</span>
        <span>Misspeled Node : {WPMResult.misspelled}</span>
        <span>Accuracy Node : {WPMResult.accuracy}</span>
      </div>
      <div onClick={reTest}>Your time is finished</div>
    </React.Fragment>
  )
}

export default Result
