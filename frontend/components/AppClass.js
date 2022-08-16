import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps
    }
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  
  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(this.state.index === 0) {
      const xy = {x:1,y:1}
      return xy
    } else if(this.state.index === 1) {
      const xy = {x:2,y:1}
      return xy
    } else if(this.state.index === 2) {
      const xy = {x:3,y:1}
      return xy
    } else if(this.state.index === 3) {
      const xy = {x:1,y:2}
      return xy
    } else if(this.state.index === 4) {
      const xy = {x:2,y:2}
      return xy
    } else if(this.state.index === 5) {
      const xy = {x:3,y:2}
      return xy
    } else if(this.state.index === 6) {
      const xy = {x:1,y:3}
      return xy
    } else if(this.state.index === 7) {
      const xy = {x:2,y:3}
      return xy
    } else if(this.state.index === 8) {
      const xy = {x:3,y:3}
      return xy
    } else {
      return 'Secret Message'
    }
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const xy = this.getXY()
    return `Coordinates (${xy.x},${xy.y})`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({...this.state, 
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps
    })
  }

  getNextIndex = (direction) => {
    if(direction === 'up' && this.state.index !== 0 && this.state.index !== 1 && this.state.index !== 2 ) {
      return this.state.index - 3
    } else if(direction === 'down' && this.state.index !== 6 && this.state.index !== 7 && this.state.index !== 8) {
      return this.state.index + 3
    } else if(direction === 'left' && this.state.index !== 0 && this.state.index !== 3 && this.state.index !== 6) {
      return this.state.index - 1
    } else if(direction === 'right' && this.state.index !== 2 && this.state.index !== 5 && this.state.index !== 8) {
      return this.state.index + 1
    } else {
      return this.state.index
    }
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    // debugger
    this.setState({index: this.getNextIndex(evt), steps: this.state.steps + 1})
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({email: evt.target.value})
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">{`You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.move('left')}>LEFT</button>
          <button id="up" onClick={() => this.move('up')}>UP</button>
          <button id="right" onClick={() => this.move('right')}>RIGHT</button>
          <button id="down" onClick={() => this.move('down')}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.onChange}></input>
          <input id="submit" type="submit" onClick={() => onSubmit()}></input>
        </form>
      </div>
    )
  }
}
