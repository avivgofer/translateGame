import React, { Component } from 'react';
import { Popover, Button } from 'antd';
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
          randomNumbers: randomNumbers,
          flag2:true
        });
      }

      randomNumber = () => {
        return  Math.floor(Math.random() * this.state.words.length);
      }

      game = () => {
        console.log(this.state)
        return <h1> { this.state.words[this.state.mainRandomNumber] } </h1>
        
      }

      choose = (e) => {
          const value = Number(e.target.value);
          if(value === this.state.mainRandomNumber)
          {
            e.target.className = 'translateBtn ant-btn-primary';
          }
          else
          {
              e.target.className = 'translateBtn ant-btn-danger';
          }
        // console.log(e.target.value);
        // console.log(e.target);
        // this.setState({selected:e.target.value});
      }


    render() {
      return (
        <div>
          <div>
             {
            (!this.state.flag )
             ?
             <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
             :
             <Button type={'primary'} onClick={this.start.bind(this)}>Start Game!</Button>
            }
            { this.state.flag2 ? this.game() : '' }
            {/* { this.state.flag ? this.printTranslates() : '' } */}
            <div className="buttonsTrans">
              { this.state.randomNumbers.map(item => {
                 return <Button className={'translateBtn'} key={item} onClick={this.choose.bind(this)} value={item}>{ this.state.translates[item] }</Button> ;
              })}
            </div>
            
          </div>
        </div>
          );
        }
      }
      
export default Excel;
  