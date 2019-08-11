import React, { Component } from 'react';
import { Popover, Button, Alert, Badge } from 'antd';
import {ExcelRenderer} from 'react-excel-renderer';
import '../css/Excel.css';




class Excel extends Component {
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
            negativeScore:0
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

      start = () => {
        var mainRandom = this.randomNumber();
        var randomNumbers = [mainRandom];
        for(let i=0; i<5; i++){
           randomNumbers.push(this.randomNumber());
        }
        this.setState({
          mainRandomNumber: mainRandom,
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

      game = () => {
        return <h1 className={"mainWord"}> { this.state.words[this.state.mainRandomNumber] } </h1>
        
      }

      choose = (e) => {
          console.log(e.target.className);
          const value = Number(e.currentTarget.value);
          
          if(value === this.state.mainRandomNumber)
          {
            if(e.target.className === 'ant-alert-message')
            {
              e.currentTarget.firstElementChild.className = 'ant-alert ant-alert-success ant-alert-show-icon translateBtn';
            }else{
              e.target.className = 'ant-alert ant-alert-success ant-alert-show-icon translateBtn';
            }
            this.setState({
              positiveScore: this.state.positiveScore + 1
            })
            this.start();
          }
          else
          {
            if(e.target.className === 'ant-alert-message')
            {
               e.currentTarget.firstElementChild.className = 'ant-alert-error ant-alert ant-alert-info ant-alert-show-icon translateBtn';
            }else{
              e.target.className = 'ant-alert-error ant-alert ant-alert-info ant-alert-show-icon translateBtn';
            }
          }
      }


    render() {
      return (
        <div>
          <div>
             {
            (!this.state.flag )
             ?
             <input className="chooseFile" type="file" onChange={this.fileHandler.bind(this)} />
             :
             ''
            }
            { this.state.flag2 ? this.game() : '' }
            <div className="buttonsTrans">
              { this.state.randomNumbers.map(item => {
                const uuidv1 = require('uuid/v1');
                 return <button onClick={this.choose.bind(this)} key={uuidv1()} value={item}><Alert className={'translateBtn'} message={ this.state.translates[item]} type="info"  /></button>;
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
      
export default Excel;
  