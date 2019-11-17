import React, { Component } from 'react';
import { Popover, Button, Alert, Badge, Icon } from 'antd';
import {ExcelRenderer} from 'react-excel-renderer';
import '../css/Game.css';
// import { VoicePlayer, VoiceRecognition } from 'react-voice-components'
import SpeechRecognition from 'react-speech-recognition'
import Sound from 'react-sound';
import UIfx from 'uifx'
import winningSound from '../sound/Tada.mp3'
import failSound from '../sound/buzzer.mp3'
import gameoverSound from '../sound/trombone.mp3'
import firebaseApp from '../firebaseConfig'
import ChooseFile from './Upload';
import Thinking from './Thinking';






class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected:'',
            words:[],
            translates:[],
            flag:false,
            flag2:false,
            mainRandomNumber:0,
            randomNumbers:[],
            positiveScore:0,
            negativeScore:0,
            tempFlaf:false,
            alertClassName:'translateBtn',
            gameReady:false,
            livesCounter:3
        }   
        this.getLives = this.getLives.bind(this);
    }

    componentWillMount(){
      let userDisplayName =  firebaseApp.auth().currentUser.displayName;
      firebaseApp.database().ref(userDisplayName).once("value", snapshot => {

        const val = snapshot.val();
        let words = [];
        Object.values(val.words).map((wordsVal)=> {
          words.push({word:wordsVal.word})
        });
      
        
        this.setState({
          words:words,
          translates:val.translates,
          userDisplayName:userDisplayName
        },() => this.start());
      });
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];
      
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            var words = [];
            var translates = [];
            resp.rows.forEach(element => {
                words.push(element[2]);
                translates.push(element[3]);
            })
            this.setState({
              words,
              translates,
              flag:true
            });
          }
        });               
      }

      start = (value) => {
        
        var mainRandom = this.randomNumber();
        var randomNumbers = [mainRandom];
        for(let i=0; i<5; i++){
           randomNumbers.push(this.randomNumber());
        }
        //check if came here from choosen word or next button
        //chosen word have a number value 
        if((typeof(value) === 'number')){
          this.setState({
            soundWinningFlag:false,
            soundFailFlag:false,
            positiveScore: this.state.positiveScore + 1
          })
        }
        this.setState({
          mainRandomNumber: mainRandom,
          soundWinningFlag:false,
          soundFailFlag:false,
          randomNumbers: this.shuffleArray(randomNumbers),
          flag2:true,
          gameReady:true
        });
      }

      shuffleArray = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }

      randomNumber = () => {
        return  Math.floor(Math.random() * this.state.words.length);
      }

      getMainWord = () => {
        return <h1 className={"mainWord"} key="mainWord"> { this.state.words[this.state.mainRandomNumber].word } </h1>
      }

      getInputsByValue = (value) =>
      {
          var allInputs = document.getElementsByTagName("button");
          var results = [];
          for(var x=0;x<allInputs.length;x++)
              if(allInputs[x].value == value)
                  return allInputs[x];
      }

      giveSuccessStyle = (value) => {
        const element = this.getInputsByValue(value);
        element.className = 'ant-alert ant-alert-success ant-alert-show-icon translateBtn';
        element.children[0].className = '';
      }

      giveFailStyle = (value) => {
        this.setState({
          livesCounter : this.state.livesCounter-1
        })
        const element = this.getInputsByValue(value);
            if(element.className === 'ant-alert-message')
            {
              element.children[0].className = 'ant-alert-error ant-alert ant-alert-info ant-alert-show-icon translateBtn';
            }else {
              element.className = 'ant-alert-error ant-alert ant-alert-info ant-alert-show-icon translateBtn';
            }
      }

      choose =  (e) => {
          const value = Number(e.currentTarget.value);
          //if the choosen word is correct
          if(value === this.state.mainRandomNumber) 
          {
            this.setState( this.playWinSound(), () => this.giveSuccessStyle(value));
             setTimeout(this.start,1200,value);
          }
          //if the choosen word is wrong
          else 
          {
         
            this.setState( this.playFailSound(), () => this.giveFailStyle(value));
          
          }
      }

      playWinSound = () =>  {
        this.setState({
          soundWinningFlag:true
        })
        this.forceUpdate();
      }


      playFailSound = () =>  {
        this.setState({
          soundFailFlag:true
        })
        this.forceUpdate();
        setTimeout(() => this.setState({soundFailFlag:false}),3000);
      }

      getLives = () => {
        let jsx = [];
        for(var i=0;i<this.state.livesCounter;i++){
          jsx.push(<Icon type="heart" key={i} theme="filled" style={{color:'red'}}/>);
        }
        return jsx;
      }

      getTranslates = () => {
        let jsx = [this.getMainWord()];
        this.state.randomNumbers.map(item => {
          const uuidv1 = require('uuid/v1');
           jsx.push(<button onClick={this.choose.bind(this)} key={uuidv1()} value={item}><Alert className={this.state.alertClassName} message={ this.state.translates[item]} type="info"  /></button>); 
        })
        return jsx;
      }

    beep  = () => (new UIfx({asset: winningSound}).play());

    signOut = () => {firebaseApp.auth().signOut()}

    render() {
      
      const soundWinProps = {
        url:"http://starmen.net/mother1/music/08%20-%20MOTHER%20-%20You%20Won.mp3",
      playStatus: Sound.status.PLAYING,
      playFromPosition: 300, /* in milliseconds */
      onLoading: this.handleSongLoading,
      onPlaying: this.handleSongPlaying,
      onFinishedPlaying: this.handleSongFinishedPlaying,
      ignoreMobileRestrictions:false,
      useHTML5Audio:true
    }
    const soundFailProps = {
      url:"http://www.sounds.beachware.com/2illionzayp3may/zwvyaz/BUZZER.mp3",
    playStatus: Sound.status.PLAYING,
    playFromPosition: 300, /* in milliseconds */
    onLoading: this.handleSongLoading,
    onPlaying: this.handleSongPlaying,
    onFinishedPlaying: this.handleSongFinishedPlaying,
    ignoreMobileRestrictions:false,
    useHTML5Audio:true
  }
    const beep  = new UIfx({asset: winningSound});




      return (
        <div className={"game"}>
          <div>
          <div className="gameHeader">
              <div className="lifes">
                {this.getLives()}  
              </div>
              <div className="displayName">
                {this.state.userDisplayName}
              </div>
              <div className="bestScore">
                <span className="bestScoreTitle">
                Best: 54
                </span>
                <br/>
              </div>
          </div>
            
            {(this.state.soundWinningFlag) ? <Sound {...soundWinProps}/> : '' }
            {(this.state.soundFailFlag) ? <Sound {...soundFailProps}/> : '' }
            {
            (this.state.gameReady)
            ?
              <div>
                <div className="gameWords">
                  {this.getTranslates()}
                </div>
                <div>
                  <Button className={'startBtn'} type={'primary'} onClick={this.start.bind(this)}>
                  Next!
                  </Button>
                </div>
                <div>
                  <Badge className={'positiveScore'}  showZero count={this.state.positiveScore} /> 
                </div>
              </div>
            :
             <Thinking/>
           }
          </div>
        </div>
          );
        }
      }
      
export default Game;
  