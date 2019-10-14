import React,{useEffect,useState} from 'react'
import {useStateValue} from "../../statemanagement"
import {postHistory} from "../../requests/history"

function Result(props){
  const [{testResult:WPMResult, text}, dispatch] = useStateValue();
  const [percentage,setPercentage] = useState(0);
  const [responseId,setResponseId] = useState();
  const [loading,setLoading] = useState(false);

  function reTest(){
    //reset everything
    dispatch({
      type:'WPMResult',
      testResult: {...WPMResult, userInput:''}
    })
    dispatch({
      type:'startTheGame',
      start: false
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

  function save(){
    setLoading(true)
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const data={result:` wpm: ${WPMResult.wpm} and the percentage is : ${parseFloat(percentage).toFixed(2)} % | Date: ${date} `}
    const dataToJson=JSON.stringify(data)
    const result = postHistory(dataToJson)
    result.onreadystatechange = () => {
      if (result.readyState === XMLHttpRequest.DONE) {
        const response = result.responseText;
        const parseResponse=JSON.parse(response);
        setResponseId(parseResponse.id);
        setLoading(false)
      }
    }
  }

  useEffect(()=>{
    let wholeTextCount=text[0].length;
    let userEntered=WPMResult.userInput.length
    let percentageOfCompleted = (userEntered*100)/wholeTextCount
    setPercentage(percentageOfCompleted);
  },[WPMResult.userInput.length,text])

  return(
    <React.Fragment>
      <div className="result flex">
        {loading &&
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        }
        {responseId &&
        <div className="YourId">
          <div>You can use your id to check the score again</div>
          id: {responseId}
        </div>
        }
        <ul>
          <li>WPM : {WPMResult.wpm}</li>
          <li>percentage : {percentage.toFixed(0)} % </li>
        </ul>
        <div className="message">Your time is finished</div>
        <div className="retest">
          <button onClick={reTest}> Come on  ! Do it again</button>
          <button onClick={save}>Save your Result</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Result
