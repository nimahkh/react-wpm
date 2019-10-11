import React from "react"
import Text from '../Text';
import Generator from '../Generator'
import Result from '../Result'
import {useStateValue} from "../../statemanagement"

function MainComponent(props){
  const [{stop}, dispatch] = useStateValue();

  return(
    !stop ?
    <React.Fragment>
      <Generator/>
      <Text/>
    </React.Fragment>
    :
    <React.Fragment>
      <Result/>
    </React.Fragment>

  )
}

export default MainComponent;
