import React, { Component } from 'react';
import { Popover, Button, Alert, Badge } from 'antd';
import {ExcelRenderer} from 'react-excel-renderer';
import '../css/Excel.css';




class ChooseFile extends Component {
    constructor(props){
        super(props)
        this.state = {
        }   
    }


    render() {
      return (
        <div>
             <input className="chooseFile" type="file" onChange={this.fileHandler.bind(this)} />
             {/* <VoicePlayer
                play
                text="React voice player demonstration"
              /> */}
              {/* <SpeechRecognition/> */}
             
        </div>
          );
        }
      }
      
export default ChooseFile;
  