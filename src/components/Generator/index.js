import React, {useEffect, useState, useCallback} from 'react';
import {generateText} from '../../requests/generateText'
import {useStateValue} from '../../statemanagement'

function Generator(props) {
  const [text, setText] = useState();
  const [, dispatch] = useStateValue();

  const generateNewText=useCallback(()=>{
    let params = {
      sentences: 10,
      lorem: 0
    };
    generateText(params).then(res => {
      const {data} = res
      dispatch({type: 'changeText', text: data})
      setText(data);
    })
  },[dispatch])

  useEffect(() => {
    generateNewText()
  }, [generateNewText])

  return (<React.Fragment>
    <div className="generatedText">
      {text}
    </div>
    <div className="newText">
      <button onClick={generateNewText}>
        New Text
      </button>
    </div>
  </React.Fragment>)
}

export default Generator;
