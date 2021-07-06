import React, { } from 'react';
import logo from '../Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';


class FormTXt extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        age: null,
        notes:'',
        advices:'',
        medicines:'',
        doses:"",
        nextdates:""
      };
    }
    TextFile = () => {
        const element = document.createElement("a");
        let notes = 'Notes :=> '+ document.getElementById('notes').value +' \n\n\n'
        let advices = 'Advises :=> '+ document.getElementById('advices').value +' \n\n\n'
        let medicines = 'Medicies :=> '+ document.getElementById('medicines').value +' \n\n\n'
        let doses = 'Doses :=> '+ document.getElementById('doses').value+' \n\n\n'
        let nextdates = 'Next Consultation Dates :=> '+ document.getElementById('nextdates').value +' \n\n\n'
        const file = new Blob([
           notes,advices,medicines,doses,nextdates
        ], {type: 'text/plain'});
        console.log(file)
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }
    mySubmitHandler = (event) => {
        event.preventDefault();
        this.TextFile()
        console.log("Should be downloaded")
      }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      console.log(nam)
      console.log(val)
      this.setState({[nam]: val});
    }
    navigateBack=()=>{
        this.props.history.goBack();
    }
    render() {
      return (
        <form onSubmit={this.mySubmitHandler}>
        <h1>Welcome to BlockPres Prescription Creation Portal</h1>
        {/* <h2>Create Digital Prescription!</h2> */}
        <p style={{fontSize:'16px',fontWeight:'600',}}>Notes:</p>
        <input
          type='text'
          name='notes'
          id='notes'
          onChange={this.myChangeHandler}
          style={{backgroundColor:' rgb(158, 250, 158)',width:'100%',height:'12px'}}
        />
        <hr></hr>
        <p style={{fontSize:'16px',fontWeight:'600',}}>Advices:</p>
        <input
          type='text'
          name='advices'
          id='advices'
          onChange={this.myChangeHandler}
          style={{backgroundColor:' rgb(158, 250, 158)',width:'100%',height:'12px'}}
        />
        <hr></hr>
        <p style={{fontSize:'16px',fontWeight:'600',}}>Medicines:</p>
        <input
          type='text'
          name='medicines'
          id='medicines'
          onChange={this.myChangeHandler}
          style={{backgroundColor:' rgb(158, 250, 158)',width:'100%',height:'12px'}}
        />
        <hr></hr>
         <p style={{fontSize:'16px',fontWeight:'600'}}>Doses:</p>
        <input
          type='text'
          name='doses'
          id='doses'
          onChange={this.myChangeHandler}
          style={{backgroundColor:' rgb(158, 250, 158)',width:'100%',height:'12px'}}
        />
        <hr></hr>
        <p style={{fontSize:'16px',fontWeight:'600',}}>Next Consultation Details:</p>
        <input
          type='text'
          name='nextdates'
          id='nextdates'
          onChange={this.myChangeHandler}
          style={{backgroundColor:' rgb(158, 250, 158)',width:'100%',height:'12px'}}
        />
         <br/>
        <br/>
         <input type='submit' style={{backgroundColor:'blue'}}/>
         <button type='button' className='btn btn-primary' style={{backgroundColor:'blue'}} onClick={this.navigateBack}>Go Back!</button>
        </form>
      );
    }
  }
  

export default FormTXt;