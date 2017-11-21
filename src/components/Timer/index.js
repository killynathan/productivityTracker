import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCompletedSessions, addEntry } from '../../redux/modules/entries';
import './stylesheet.css';
import TimeSetter from './TimeSetter';
import Display from './Display';
import ControlButton from './ControlButton';
import dingAudioFile from '../../assets/ding.mp3';
// import dingAudioFile from './ding.mp3';

const mapDispatchToProps = dispatch => ({
  incrementCompletedSessions: () => {
    dispatch(incrementCompletedSessions());
  },
  addEntry: dateString => {
    dispatch(addEntry(dateString));
  }
});

const mapStateToProps = state => ({
  state: state
});

const states = {
  IN_SESSION: 0,
  IN_BREAK: 1,
  PAUSED: 2,
  ON_STANDBY: 3
};

class TimerHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 1500, //25 mins make into constant
      breakLength: 300, // 5 mins
      timeRemaining: 1500,
      state: states.ON_STANDBY,
      setIntervalId: null,
      isPaused: false
    }
  }

  secondsToMinutes(seconds) {
    return seconds / 60;
  }

  secondsToReadableTime(totalSeconds) {
    let mins = Math.floor(totalSeconds / 60);
  	let seconds = totalSeconds % 60;
  	if (seconds === 0) seconds = "00";
  	else if (seconds < 10) seconds = "0" + seconds;
  	return mins + ":" + seconds;
  }

  stateToString(state) {
    switch(state) {
      case states.IN_SESSION:
      case states.ON_STANDBY:
        return "Session";
      case states.PAUSED:
        return "Paused";
      case states.IN_BREAK:
        return "Break";
      default:
        return "Session";
    }
  }

  changeSessionLength(increase) {
    let newSessionLength;
    if (increase) newSessionLength = this.state.sessionLength + 60;
    else newSessionLength = this.state.sessionLength - 60;
    if (newSessionLength < 0) newSessionLength = 0;

    if (this.state.state === states.ON_STANDBY) {
      this.setState({
        sessionLength: newSessionLength,
        timeRemaining: newSessionLength
      })
    }
    else {
      this.setState({
        sessionLength: newSessionLength
      });
    }
  }

  changeBreakLength(increase) {
    let newBreakLength;
    if (increase) newBreakLength = this.state.breakLength + 60;
    else newBreakLength = this.state.breakLength - 60;
    if (newBreakLength < 0) newBreakLength = 0;
    this.setState({
      breakLength: newBreakLength
    });
  }

  start() {
    // standby -> start
    if (this.state.state === states.ON_STANDBY) {
      let setIntervalId = setInterval(() => this.decrementTime(), 1000);
      this.setState({
        state: states.IN_SESSION,
        setIntervalId: setIntervalId
      });

      // !! FIND BETTER SOLUTION !!
      document.getElementById("filler").style.animationPlayState = "running";
      document.getElementById("filler").style.animationName = "filler";
  		document.getElementById("filler").style.animationDuration = this.state.sessionLength + "s";
    }

    // paused -> start
    else if (this.state.isPaused){
      this.setState({
        isPaused: false
      });

      // !! FIND BETTER SOLUTION !!
      document.getElementById("filler").style.animationPlayState = "running";
    }
  }

  decrementTime() {
    if (this.state.isPaused)
      return; // dont decrement time when paused

    let newTimeRemaining = this.state.timeRemaining - 1;

    // time is up. transition states
    if (newTimeRemaining <= 0) {
      this.playDing();
      // session -> break
      if (this.state.state === states.IN_SESSION) {
        this.setState({
          state: states.IN_BREAK,
          timeRemaining: this.state.breakLength
        })

        // !! FIND BETTER SOLUTION !!
        let filler = document.getElementById("filler")
        filler.style.animationName = "";
        filler.offsetHeight;
        filler.style.animationName = "filler";
        filler.style.animationDuration = this.state.sessionLength + "s";
      }

      // break -> standby
      else if (this.state.state === states.IN_BREAK) {
        this.handleCompletedSession();
      }
    }
    // time remaining. decrease time
    else {
      this.setState({
        timeRemaining: newTimeRemaining
      });
    }
  }

  playDing() {
    var ding = new Audio(dingAudioFile);
    ding.play();
  }

  handleCompletedSession() {

    // initial case where no entires yet
    if (this.props.state.entries.length == 0) {
      this.props.addEntry((new Date()).toDateString());
    }
    this.props.incrementCompletedSessions();
    window.localStorage.setItem('productivityTracker', JSON.stringify(this.props.state));
    this.reset();
  }

  pause() {
    // dont set state to pause if on standby because it will
    // stop start from working properly
    if (this.state.state === states.ON_STANDBY) return;

    this.setState({
      isPaused: true
    })

    // !! FIND BETTER SOLUTION !!
    document.getElementById("filler").style.animationPlayState = "paused";
  }

  reset() {
    if (this.state.setIntervalId) clearInterval(this.state.setIntervalId);
    this.setState({
      state: states.ON_STANDBY,
      timeRemaining: this.state.sessionLength,
      isPaused: false
    });

    // !! FIND BETTER SOLUTION !!
    document.getElementById("filler").style.animationName = "";
  }

  render() {
    return (
      <div className='timer'>
      <div id="wrapper">
    		<div>
    			<TimeSetter
            title='Session'
            timeLength={this.secondsToMinutes(this.state.sessionLength)}
            onMinusClick={() => this.changeSessionLength(false)}
            onPlusClick={() => this.changeSessionLength(true)}
          />
    			<TimeSetter
            title='Break'
            timeLength={this.secondsToMinutes(this.state.breakLength)}
            onMinusClick={() => this.changeBreakLength(false)}
            onPlusClick={() => this.changeBreakLength(true)}
          />
    		</div>


  			<Display
          time={this.secondsToReadableTime(this.state.timeRemaining)}
          title={this.stateToString(this.state.state)}
          animationDuration={2}
          animationState={(this.state.state === states.IN_SESSION || this.state.state === states.IN_BREAK) ? "running" : "paused"}
        />

  			<div>
          <ControlButton
            type='play'
            onClick={() => this.start()}
          />
          <ControlButton
            type='pause'
            onClick={() => this.pause()}
          />
          <ControlButton
            type='undo'
            onClick={() => this.reset()}
          />
  			</div>

    	</div>
      </div>
    )
  }
};

const Timer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerHelper);

export default Timer;
