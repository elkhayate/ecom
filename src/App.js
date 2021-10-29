import React, { Component } from 'react'
import Navbar from './Components/Navbar'


export default class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       itemsSold : [],
       Category : '',
       showCurrencies : false,
    }
  }

  handleCategory=(val)=>{
     this.setState({
      Category : val
    })
  }

  handleToggler=()=>{
    this.setState({
      showCurrencies : !this.state.showCurrencies
    })
  }
  
  
  render(){
    return(
      <Navbar 
        ShowCurrencies = {this.state.showCurrencies} 
        HandleToggler={this.handleToggler}
        HandleCategory={this.handleCategory} 
        Sold={this.state.itemsSold}
      />
    )
  }
}