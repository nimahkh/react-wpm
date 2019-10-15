import React, {useEffect, useState, useCallback} from 'react';
import {generateText, cancel} from '../../requests/generateText'
import {useStateValue} from '../../statemanagement'

function Generator(props) {
  const [text, setText] = useState();
  const [
    {
      errors
    }, dispatch] = useStateValue();

  const generateNewText = useCallback(() => {
    let params = {
      sentences: 1,
      lorem: 0
    };

    generateText(params).then(res => {
      const {data} = res
      dispatch({type: 'changeText', text: data})
      setText(data);
    }).catch(()=> {})

  }, [dispatch])

  useEffect(() => {
    generateNewText()

    return()=>{
      cancel()
    }
  }, [generateNewText])
  return (<React.Fragment>
    <div className="generatedText">
      <div className="entryText" dangerouslySetInnerHTML={{
          __html: (errors !== "" && errors !== undefined)
            ? errors
            : text
        }}/>
    </div>

  </React.Fragment>)
}

export default Generator;
