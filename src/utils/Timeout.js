import React, {useEffect, useState} from 'react'
import {useStateValue} from '../statemanagement'
import PropTypes from 'prop-types';

export function Timer(props) {
  const [elapsed, setElapsed] = useState(0);
  const [, dispatch] = useStateValue();
  const [stopIt, setStopIt] = useState(false);

  useEffect(() => {
    let timer;
    let elapsed = 0;

    if (!stopIt) {
      timer = setInterval(() => {
        elapsed++
        // time to stop
        if (parseInt(elapsed) !== props.stop) {
          setElapsed(elapsed)
        } else {
          setStopIt(true)
          clearInterval(timer)
          dispatch({type: "stopTimer", stop: true})
        }
      }, 1000);
    }

    return() => {
      // to prevent memory leaks
      clearInterval(timer);
    }

  }, [dispatch, props.start, props.stop, stopIt])

  return (<React.Fragment>
    {
      stopIt
        ? <p>Done</p>
        : <p>your time to finish the game :
            <b>{elapsed}
              seconds</b>
          </p>
    }
  </React.Fragment>)

}

Timer.propTypes = {
    stop: PropTypes.number,
    start: PropTypes.number,
}
