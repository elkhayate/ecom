import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import ProLiPa from './Components/ProLiPa'
import { CategoryQuery, CurrenciesQuery } from './Queries'
export default class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       itemsSold : [{Pid : "simo" , count : 1}],
       Category : '',
       showCurrencies : false,
       showCartOverlay : false,
    }
  }
  handleSoldCount=(val,Id)=>{
    let listOut = this.state.itemsSold;
    for(let i = 0; i < listOut.length; i++) {
      if(listOut[i].Pid === Id && val === 'minus' && listOut[i].count === 1) {
        listOut.splice(listOut[i], 1)
      }else if (listOut[i].Pid === Id && val === 'minus') {
        listOut[i].count -= 1;
      }else if (listOut[i].Pid === Id && val === 'plus'){
        listOut[i].count += 1;
      }
    }
    this.setState({
      itemsSold : listOut,
    })
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
      <div onClick={ () => {
        this.state.showCurrencies === true 
        &&
        this.setState({showCurrencies : false})}}
      >
      <CurrenciesQuery>
        {({data, loading, error})=>{

          if(loading) return null;
          if(error) console.log(`Error : ${error}`)
            return ( 
            <Navbar 
              ShowCartOverlay = {this.state.showCartOverlay}
              ShowCurrencies = {this.state.showCurrencies} 
              HandleToggler={this.handleToggler}
              HandleCategory={this.handleCategory} 
              Sold={this.state.itemsSold}
              Currencies = {data}
            />
            )
        }}
      </CurrenciesQuery>
      {this.state.itemsSold[0] ? <h1>{`hanaaa : ${this.state.itemsSold[0].count}`}</h1> : <h1>hello</h1>}
      <button onClick={()=>this.handleSoldCount('plus', 'simo')}>zid</button>
      <button onClick={()=>this.handleSoldCount('minus', 'simo')}>nqes</button>
      </div>
    )
  }
}