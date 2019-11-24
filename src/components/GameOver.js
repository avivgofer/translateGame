import React, { Component } from 'react';
import {Button} from 'antd'
import Sound from 'react-sound';
import '../css/GameOver.css'




class GameOver extends Component {
  
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidUpdate() {

    }
    render() {
      const soundFailProps = {
        url:"https://www.fesliyanstudios.com/play-mp3/5641",
      playStatus: Sound.status.PLAYING,
      playFromPosition: 300, /* in milliseconds */
      onLoading: this.handleSongLoading,
      onPlaying: this.handleSongPlaying,
      onFinishedPlaying: this.handleSongFinishedPlaying,
      ignoreMobileRestrictions:false,
      useHTML5Audio:true
    }
      return (
        <div className="gameOverContainer">
        <Sound {...soundFailProps}/>
        <div className="gameOver">
        <span className="gameOverTitle">
          Game Over!
        </span>
        <br/>
        <span className="gameOverScore">
          Game score: {this.props.positiveScore}
        </span>
          {/* <div className="gameOver">
          </div> */}
          <Button className="againBtn" onClick={this.props.playAgain} type={'primary'}>
           Play again!
          </Button>
        </div>
        </div>
          );
        }
      }
      
export default GameOver;
  