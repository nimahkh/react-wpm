import React from 'react';
import {useStateValue} from '../../statemanagement'

function Text(props){
  const [{text}, ] = useStateValue();

  return(
    <React.Fragment>
      <textarea />
    </React.Fragment>
  )
}

export default Text;
