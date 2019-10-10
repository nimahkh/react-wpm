import React, {useEffect, useState} from 'react'

export function Timer(props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setElapsed(new Date() - props.start)
    }, 50);

    return() => {
      clearInterval(timer);
    }

  }, [props.start])

  let elapse = Math.round(elapsed / 100);
  // This will give a number with one digit after the decimal dot (xx.x):
  var seconds = (elapse / 10).toFixed(1);

  return (<p>This example was started <b>{seconds} seconds</b> ago.</p>)

}
