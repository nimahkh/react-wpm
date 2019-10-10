import React, {useEffect, useState, useCallback} from 'react';
import {generateText} from '../../requests/generateText'
import {useStateValue} from '../../statemanagement'

function Generator(props) {
  const [text, setText] = useState();
  const [{errors}, dispatch] = useStateValue();
  let InnerText=errors !== "" ? errors : text;

  const generateNewText=useCallback(()=>{
    let params = {
      sentences: 1,
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
      <span dangerouslySetInnerHTML={{__html: InnerText}} />
    </div>
    <div className="newText">
      <button onClick={generateNewText}>
        New Text
      </button>
    </div>
  </React.Fragment>)
}

export default Generator;
