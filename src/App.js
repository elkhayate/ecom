import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import ProLiPa from './Components/ProLiPa'
import { CategoryQuery } from './Queries'
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
      <>
      <Navbar 
        ShowCurrencies = {this.state.showCurrencies} 
        HandleToggler={this.handleToggler}
        HandleCategory={this.handleCategory} 
        Sold={this.state.itemsSold}
      />
      <CategoryQuery Input="tech">
        {({data, loading, error})=>{
          if(loading) return null
          if (error) console.log(error);
          console.log(data)
          return (
            <ProLiPa Data={data.category.products}/>
          )
        }}
      </CategoryQuery>
      </>
    )
  }
}