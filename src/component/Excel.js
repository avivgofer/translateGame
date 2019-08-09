import React, { Component } from 'react';
import { Button } from 'antd';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

class Excel extends Component {
    constructor(props){
        super(props)
        this.state = {
            cols:[],
            rows:[],
            words:[],
            translates:[],
            flag:false
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
            this.setState({
              cols: resp.cols,
              rows: resp.rows
            });
            this.load();
          }
        });               
      
      }

      load = () => {
        this.state.rows.forEach(element => {
            const words = this.state.words.concat(element[2]);
            const translates = this.state.translates.concat(element[3]);
            this.setState({
               words,
               translates,
               // translate: this.state.translate.concat(x[3])
           })
        })
         console.log(this.state);
      }

      start = () => {
        this.setState({
          flag:true
        });
      }

      game = () =>{
        const randomNumber = Math.floor(Math.random() * this.state.words.length);
        return <h1>{this.state.words[randomNumber] }</h1>
      }

    render() {
      return (
        <div>
          <div>
            <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
            {/* <Button onClick={this.log.bind(this)}>Load!</Button> */}
          </div>
          <div>
            <Button onClick={this.start.bind(this)}>Start Game!</Button>
            {
              this.state.flag ? this.game() : ''
            }
          </div>
        </div>
          );
        }
      }
      
export default Excel;
  