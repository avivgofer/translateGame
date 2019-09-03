import React, { Component } from 'react';
import { Popover, Button, Alert, Badge } from 'antd';
import {ExcelRenderer} from 'react-excel-renderer';
import '../css/Game.css';
// import { VoicePlayer, VoiceRecognition } from 'react-voice-components'
import SpeechRecognition from 'react-speech-recognition'
import Sound from 'react-sound';
import UIfx from 'uifx'
import mp3File from '../sound/Tada.mp3'
import Firebase from '../firebaseConfig'






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
            alertClassName:'translateBtn'
        }   
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
        //check if we came here from choosen word or next button
        //chosen word have a number value 
        
        if((typeof(value) === 'number')){
          this.setState({
            soundPlayFlag:false,
            positiveScore: this.state.positiveScore + 1
          })
        }
        this.setState({
          mainRandomNumber: mainRandom,
          soundPlayFlag:false,
          randomNumbers: this.shuffleArray(randomNumbers),
          flag2:true
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

      mainWord = () => {
        return <h1 className={"mainWord"}> { this.state.words[this.state.mainRandomNumber] } </h1>
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
        // console.log(element);
        // // console.log(value);
        // debugger;
        element.className = 'ant-alert ant-alert-success ant-alert-show-icon translateBtn';
        element.children[0].className = '';
        // if(e.target.className === 'ant-alert-message')
        // {
        //   // this.setState({
        //   //   alertClassName:'ant-alert ant-alert-success ant-alert-show-icon translateBtn'
        //   // })
        //   e.currentTarget.firstElementChild.className = 'ant-alert ant-alert-success ant-alert-show-icon translateBtn';
        // }else{
        //   // this.setState({
        //   //   alertClassName:'ant-alert ant-alert-success ant-alert-show-icon translateBtn'
        //   // })
        //   e.target.className = 'ant-alert ant-alert-success ant-alert-show-icon translateBtn';
        // }
      }

      choose =  (e) => {
          const value = Number(e.currentTarget.value);
          //if the choosen word is correct
          if(value === this.state.mainRandomNumber) 
          {
            this.setState( this.playWinSound(), () => this.giveSuccessStyle(value));
            // if(e.target.className === 'ant-alert-message')
            // {
            //   // this.setState({
            //   //   alertClassName:'ant-alert ant-alert-success ant-alert-show-icon translateBtn'
            //   // })
            //   e.currentTarget.firstElementChild.className = 'ant-alert ant-alert-success ant-alert-show-icon translateBtn';
            // }else{
            //   // this.setState({
            //   //   alertClassName:'ant-alert ant-alert-success ant-alert-show-icon translateBtn'
            //   // })
            //   e.target.className = 'ant-alert ant-alert-success ant-alert-show-icon translateBtn';
            // }
            
            // const delay = ms => new Promise(res => setTimeout(res, ms));
            // await delay(5000);
      
             setTimeout(this.start,1200,value);
             
            //  this.start(value);
          }
          //if the choosen word is wrong
          else 
          {
            if(e.target.className === 'ant-alert-message')
            {
              // this.setState({
              //   alertClassName:'ant-alert-error ant-alert ant-alert-info ant-alert-show-icon translateBtn'
              // })
               e.currentTarget.firstElementChild.className = 'ant-alert-error ant-alert ant-alert-info ant-alert-show-icon translateBtn';
            }else{
              // this.setState({
              //   alertClassName:'ant-alert-error ant-alert ant-alert-info ant-alert-show-icon translateBtn'
              // })
              e.target.className = 'ant-alert-error ant-alert ant-alert-info ant-alert-show-icon translateBtn';
            }
          }
      }

      playWinSound = () =>  {
        this.setState({
          soundPlayFlag:true
        })
        this.forceUpdate();
      }


      // playWinSound = () => {
      //   if(this.state.tempFlaf)
      // }
  

    //   <Sound
    //   url="http://starmen.net/mother1/music/08%20-%20MOTHER%20-%20You%20Won.mp3"
    //   playStatus={Sound.status.PLAYING}
    //   playFromPosition={300 /* in milliseconds */}
    //   onLoading={this.handleSongLoading}
    //   onPlaying={this.handleSongPlaying}
    //   onFinishedPlaying={this.handleSongFinishedPlaying}
    // /> ;
    beep  = () => (new UIfx({asset: mp3File}).play());

    signOut = () => {Firebase.auth().signOut();
   console.log(!!Firebase.auth().currentUser)
  }

    render() {
      
      const soundProps = {
        url:"http://starmen.net/mother1/music/08%20-%20MOTHER%20-%20You%20Won.mp3",
      playStatus: Sound.status.PLAYING,
      playFromPosition: 300, /* in milliseconds */
      onLoading: this.handleSongLoading,
      onPlaying: this.handleSongPlaying,
      onFinishedPlaying: this.handleSongFinishedPlaying,
      ignoreMobileRestrictions:true,
      useHTML5Audio:true
    }
    const beep  = new UIfx({asset: mp3File});




      return (
        <div>
          <div>
             {
            (!this.state.flag )
             ?
             <div>
             <input className="chooseFile" type="file" onChange={this.fileHandler.bind(this)} />
             {/* <Button onClick = {this.props.handler}>go to parent</Button> */}
             {/* <VoicePlayer
                play
                text="React voice player demonstration"
              /> */}
              {/* <SpeechRecognition/> */}
              {/* {this.playSound()} */}
              <Button onClick={beep.play}>Signup</Button>
              <Button onClick={this.signOut}>SignOut</Button>
              <Button onClick={this.playWinSound}>playSound</Button>
              {/* {(this.state.tempFlaf) ? <Sound {...soundProps}/> : '' } */}
              {/* {this.playWinSound()} */}
             </div>
             :
             ''
            }
            { this.state.flag2 ? this.mainWord() : '' }
            {(this.state.soundPlayFlag) ? <Sound {...soundProps}/> : '' }
            <div className="buttonsTrans">
              { this.state.randomNumbers.map(item => {
                const uuidv1 = require('uuid/v1');
                 return <button onClick={this.choose.bind(this)} key={uuidv1()} value={item}><Alert className={this.state.alertClassName} message={ this.state.translates[item]} type="info"  /></button>;
              })}
            </div>
            {(this.state.flag ) ?
            <div>
            <Button className={'startBtn'} type={'primary'} onClick={this.start.bind(this)}>
            {(!this.state.flag2)?
            'Start Game!' : 'Next!'}
            </Button>
            <div>
            {(this.state.flag2) ?
              <Badge className={'positiveScore'} showZero count={this.state.positiveScore} /> 
              : ''
            }
            </div>
            </div>
            :''}
          </div>
        </div>
          );
        }
      }
      
export default Game;
  