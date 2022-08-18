import React, {useState} from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at



export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [index, setIndex] = useState(initialIndex)
  const [steps, setSteps] = useState(initialSteps)
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(index === 0) {
      const xy = {x:1,y:1}
      return xy
    } else if(index === 1) {
      const xy = {x:2,y:1}
      return xy
    } else if(index === 2) {
      const xy = {x:3,y:1}
      return xy
    } else if(index === 3) {
      const xy = {x:1,y:2}
      return xy
    } else if(index === 4) {
      const xy = {x:2,y:2}
      return xy
    } else if(index === 5) {
      const xy = {x:3,y:2}
      return xy
    } else if(index === 6) {
      const xy = {x:1,y:3}
      return xy
    } else if(index === 7) {
      const xy = {x:2,y:3}
      return xy
    } else if(index === 8) {
      const xy = {x:3,y:3}
      return xy
    } else {
      return 'Secret Message'
    }
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const xy = getXY()
    return `Coordinates (${xy.x},${xy.y})`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage)
    setEmail(initialEmail)
    setIndex(initialIndex)
    setSteps(initialSteps)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'up') {
      if(index !== 0 && index !== 1 && index !== 2) {
        setSteps(steps + 1)
      return index - 3
      } else if(index === 0 || index === 1 || index === 2) {
        setMessage("You can't go up")
        return index
      }
    } else if(direction === 'down') {
      if(index !== 6 && index !== 7 && index !== 8) {
        setSteps(steps + 1)
        return index + 3
      } else if(index === 6 || index === 7 || index === 8) {
        setMessage("You can't go down")
        return index
      }
    } else if(direction === 'left') {
      if(index !== 0 && index !== 3 && index !== 6) {
        setSteps(steps + 1)
        return index - 1
      } else if(index === 0 || index === 3 || index === 6) {
        setMessage("You can't go left")
        return index
      }
    } else if(direction === 'right') {
      if(index !== 2 && index !== 5 && index !== 8) {
        setSteps(steps + 1)
        return index + 1
      } else if(index === 2 || index === 5 || index === 8) {
        setMessage("You can't go right")
        return index
      }
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    setMessage(initialMessage)
    setIndex(getNextIndex(evt))
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()

    if(email === 'foo@bar.baz') {
      setMessage('foo@bar.baz failure #71')
    } else if(email === initialEmail) {
      setMessage('Ouch: email is required')
    } else if(email.match(/^((?!.com).)*$/)) {
      setMessage('Ouch: email must be a valid email')
    } else {
      const xy = getXY()
    const data = {
      x: xy.x,
      y: xy.y,
      steps: steps,
      email: email
    }
    axios.post('http://localhost:9000/api/result', data)
      .then(res => {
        setMessage(res.data.message)
        setEmail(initialEmail)
      })
      .catch(err => setMessage(err.message))
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates ${getXYMessage()}`}</h3>
        <h3 id="steps">{steps !== 1 ? `You moved ${steps} times` : `You moved ${steps} time`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
      <button id="left" onClick={() => move('left')}>LEFT</button>
          <button id="up" onClick={() => move('up')}>UP</button>
          <button id="right" onClick={() => move('right')}>RIGHT</button>
          <button id="down" onClick={() => move('down')}>DOWN</button>
          <button id="reset" onClick={() => reset()}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit" data-testid='submitbtn'></input>
      </form>
    </div>
  )
}
