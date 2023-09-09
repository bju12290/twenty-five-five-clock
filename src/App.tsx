import React from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [running, setRunning] = React.useState(false)
  const [breakLength, setBreakLength] = React.useState(5)
  const [sessionLength, setSessionLength] = React.useState(25)
  const [timeRemaining, setTimeRemaining] = React.useState(25 * 60)
  const [intervalId, setIntervalId] = React.useState(null)

  React.useEffect(() =>{
    setTimeRemaining(sessionLength * 60)
  }, [sessionLength])
  const handleReset = () => {
    setBreakLength(5)
    setSessionLength(25)
    clearInterval(intervalId)
    setRunning(false)
    setTimeRemaining(25 * 60)
  }

  const handleStart = () => {
    if (!running) {
      setRunning(true);

      
      const id = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime === 0) {
            clearInterval(id)
            return 0;
          } else {
            return prevTime - 1
          }
        })
      }, 1000)

      setIntervalId(id)
    } else {
      setRunning(false)
      clearInterval(intervalId)
    }
  }

  const playPauseIcon = running ? <FontAwesomeIcon id="start_stop" onClick={handleStart} icon={faPause} /> : <FontAwesomeIcon onClick={handleStart} icon={faPlay} />

  const handleBreakIncrement = () => {
    setBreakLength(prevLength => prevLength < 60 ? prevLength + 1 : prevLength)
  }
  const handleBreakDecrement = () => {
    setBreakLength(prevLength => prevLength > 1 ? prevLength - 1 : prevLength)
  }
  const handleSessionIncrement = () => {
    setSessionLength(prevLength => prevLength < 60 ? prevLength + 1 : prevLength)
  }
  const handleSessionDecrement = () => {
    setSessionLength(prevLength => prevLength > 1 ? prevLength - 1 : prevLength)
  }

  const timeLeft = <div id="time-left">
  {`${Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:${(timeRemaining % 60).toString().padStart(2, '0')}`}
</div>

  return (
    <>
      <h1 className="header">25 + 5 Clock</h1>
      <div className="label--container">
        <div id="break-label">Break Length</div>
        <div id="session-label">Session Length</div>
      </div>
        <div className="buttons--container">
          <div className="break--container">
            <FontAwesomeIcon id="break-increment" onClick={handleBreakIncrement} icon={faCaretUp} />
              <div id="break-length">{breakLength}</div>
            <FontAwesomeIcon id="break-decrement" onClick={handleBreakDecrement} icon={faCaretDown} />
          </div>
          <div className="session--container">
            <FontAwesomeIcon id="session-increment" onClick={handleSessionIncrement} icon={faCaretUp} />
              <div id="session-length">{sessionLength}</div>
            <FontAwesomeIcon id="session-decrement" onClick={handleSessionDecrement} icon={faCaretDown} />
          </div>
        </div>
        <div className="timer--container">
          <div id="timer-label">Session</div>
          <div>{timeLeft}</div>
          {playPauseIcon}
          <FontAwesomeIcon id="reset" onClick={handleReset} icon={faRotateLeft} />
        </div>
    </>
  )
}

export default App
