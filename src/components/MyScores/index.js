import React, {useState} from 'react'
import {getHistory} from "../../requests/history"

function MyScores() {
  const [getId, setGetId] = useState()
  const [loading,setLoading] = useState(false);
  const [response,setResponse] = useState();

  function handleGetId(){
    setLoading(true)
    const result = getHistory(getId)
    result.onreadystatechange = () => {
      if (result.readyState == XMLHttpRequest.DONE) {
        const response = result.responseText;
        const parseResponse=JSON.parse(response);
        setResponse(parseResponse);
        setLoading(false)
      }
    }
  }

  return (<div className="get_id">
    <div className="container">
      <input
        onChange={(e) => setGetId(e.target.value)}
        className="enterId"
        placeholder="Enter the id that you get before..."
        value={getId}/>
      <button onClick={handleGetId} className="search">submit</button>
        {loading &&
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        }
        {response!==undefined &&
          <div className="score_result">
            {response.result}
          </div>
        }
    </div>
  </div>)
}

export default MyScores
