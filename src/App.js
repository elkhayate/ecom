import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import ProLiPa from './Components/ProLiPa'
import { CategoryQuery, CurrenciesQuery } from './Queries'
export default class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       itemsSold : [],
       Category : '',
       showCurrencies : false,
       showCartOverlay : false,
       whichCurrency : 'USD',
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
  handleCurrency = (val) => {
    this.setState({
      whichCurrency : val,
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
  
  handlePrice = (Data) => {
    switch(this.state.whichCurrency) {
      case 'USD': 
        return `$${Data[0].amount}`;
      case "GBP": 
        return `£${Data[1].amount}`;
      case "AUD": 
        return `$${Data[2].amount}`;
      case "JPY": 
        return `¥${Data[3].amount}`;
      case "RUB": 
        return `₽${Data[4].amount}`;
    }
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
              HanleCurrency = {this.handleCurrency}
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
      <CategoryQuery Input={this.state.Category}>
        {({data, loading, error})=>{
          if(loading) return null;
          if(error) console.log(`Error : ${error}`)
          console.log(data)
          return (
            <ProLiPa 
              Data={data.category} 
              Products = {data.category.products}
              HandlePrice = {this.handlePrice}
            />
          )
        }}
      </CategoryQuery>
      </div>
    )
  }
}