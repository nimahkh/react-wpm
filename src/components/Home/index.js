import React from "react"
import {useStateValue} from "../../statemanagement"
import Text from '../Text';
import Generator from '../Generator'
import Result from '../Result'

function Home() {
  const [
    {
      stop
    }
  ] = useStateValue();


  return (
    !stop
    ? <React.Fragment>
      <Generator/>
      <Text/>
    </React.Fragment>
    : <React.Fragment>
      <Result/>
    </React.Fragment>)
}

export default Home;
