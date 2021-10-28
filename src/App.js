import React, { Component } from 'react'
import Navbar from './Components/Navbar'


export default class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       itemsSold : [],
       Category : ''
    }
  }
    handleCategory=(val)=>{
    this.setState({
      Category : val
    })
  }
  render(){
    return(
      <Navbar Sold={this.state.itemsSold}/>
    )
  }
}