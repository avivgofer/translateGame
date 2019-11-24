import React, { Component } from 'react';
import {Spin} from 'antd';

class GoHome extends Component {
    constructor(props){
        super(props)
        this.state = {}
     }

     componentDidMount(){
       
     }
    render() {
      return (
        <div className={"thinking"}>
            <Spin size="large" />
        </div>
      );
    }
  }
  
  export default GoHome;