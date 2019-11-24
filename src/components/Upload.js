import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
import {ExcelRenderer} from 'react-excel-renderer';
import firebaseApp from '../firebaseConfig';
import { throwStatement } from '@babel/types';
import '../css/Upload.css';




class ChooseFile extends Component {
  
    constructor(props){
        super(props)
        this.state = {
          bestScore:0
        }
        this.click = this.click.bind(this);
        this.save = this.save.bind(this);
    }

    click() {debugger}

    reload() {
      window.location.reload();
    }

    save(){
      let user = firebaseApp.auth().currentUser;
      var globalThis = this;
      firebaseApp.database().ref(user.displayName).set(this.state)
        .then((res) => {
         user.updateProfile({
            photoURL:'aaa'
         }).then(function() {
           globalThis.reload();
           // Update successful.
         }).catch(function(error) {
           // An error happened.
         })
       });
    }

    saveWords = (fileObj) => {
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            var words = [];
            var translates = [];
            resp.rows.forEach(element => {
                words.push({word:element[2],status:'unknown'});
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
    
    onChange = (info) => {
      const { status } = info.file;
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        
        this.saveWords(info.file.originFileObj);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }


    render() {
      const { Dragger } = Upload;
      const props = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      };

      return (
        <div>
          <span className="explanition">
          Go to <a href="https://translate.google.co.il/?hl=iw#view=saved">Google transate saved word </a> 
          and export your excel file.
          </span>
          <div className="dragger">
            <Dragger {...props} onChange={this.onChange}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag your <br/> Google translate saved word excel file</p>
              <p className="ant-upload-hint">
                for support - aviv.gofer@gmail.com
              </p>
            </Dragger>
            <Button className="uploadSaveBtn" onClick={this.save}>save</Button>
          </div>
        </div>
          );
        }
      }
      
export default ChooseFile;
  