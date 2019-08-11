import React, { Component } from 'react';
import { Button } from 'antd';
import {ExcelRenderer} from 'react-excel-renderer';
import '../css/Excel.css';


class Excel extends Component {
    constructor(props){
        super(props)
        this.state = {
            words:[],
            translates:[],
            flag:false,
            mainRandomNumber:0,
            randomNumbers:[]
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
              translates
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
          flag: true,
          mainRandomNumber: mainRandom,
          randomNumbers: randomNumbers
        });
      }

      randomNumber = () => {
        return  Math.floor(Math.random() * this.state.words.length);
      }

      game = () => {
        console.log(this.state)
        return <h1> { this.state.words[this.state.mainRandomNumber] } </h1>
        
      }

      printTranslates = () => {
        this.state.translates.forEach(element => {
          return <h2>sdfs</h2>
        })
      }


    render() {
      return (
        <div>
          <div>
            <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
          </div>
          <div>
            <Button onClick={this.start.bind(this)}>Start Game!</Button>
            { this.state.flag ? this.game() : '' }
            { this.state.flag ? this.printTranslates() : '' }
            <ul>
              { this.state.randomNumbers.map(item => {
                 return <li className='translateLi'>{ this.state.translates[item] } </li>;
              })}
            </ul>
            
          </div>
        </div>
          );
        }
      }
      
export default Excel;
  