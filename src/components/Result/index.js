import React,{useEffect,useState} from 'react'
import {useStateValue} from "../../statemanagement"

function Result(props){
  const [{testResult:WPMResult, text}, dispatch] = useStateValue();
  const [percentage,setPercentage] = useState(0);

  function reTest(){
    //reset everything
    dispatch({
      type:'WPMResult',
      testResult: {...WPMResult, userInput:''}
    })
    dispatch({
      type:'changeErrors',
      stop:''
    })

    setTimeout(()=>{
      dispatch({
        type:'stopTimer',
        stop:false
      })
    },500)
  }

  useEffect(()=>{
    let wholeTextCount=text[0].length;
    let userEntered=WPMResult.userInput.length
    let percentageOfCompleted = (userEntered*100)/wholeTextCount
    console.log(wholeTextCount,userEntered);
    setPercentage(percentageOfCompleted);
  },[])

  return(
    <React.Fragment>
      <div className="result">
        <ul>
          <li>WPM : {WPMResult.wpm}</li>
          <li>percentage : {percentage.toFixed(0)} % </li>
        </ul>
        <div className="message">Your time is finished</div>
        <div className="retest">
          <button onClick={reTest}> Come on  ! Do it again</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Result
