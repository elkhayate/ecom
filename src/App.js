import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import ProLiPa from './Components/ProLiPa';
import { CategoryQuery, CurrenciesQuery } from './Queries';
import ProDesPa from './Components/ProDesPa';

const checkArrays = function(arr1,arr2){
  return arr1.every((val)=> arr2.includes(val));
}
export default class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       itemsSold : [],
       Category : '',
       showCurrencies : false,
       showCartOverlay : false,
       whichCurrency : 'USD',
       showDescription : false,
       whichProduct : null,
       Total : null,
    }
    this.handleTotal()
  }
  handleCartOverlay = () => {
    this.setState({
      showCartOverlay : !this.state.showCartOverlay,
    })
  }
  handleTotal = () => {
    let sum = 0;
    for(let i = 0; i < this.state.itemsSold.length; i++) {
        switch(this.state.whichCurrency) {
          case 'USD': 
            sum += this.state.itemsSold[i].count * this.state.itemsSold[i].Price[0].amount
            this.setState({
              Total : `$${sum.toFixed(2)}`
            })
            break;
          case "GBP": 
            sum += this.state.itemsSold[i].count * this.state.itemsSold[i].Price[1].amount
            this.setState({
              Total : `£${sum.toFixed(2)}`
            })
            break;
          case "AUD": 
            sum += this.state.itemsSold[i].count * this.state.itemsSold[i].Price[2].amount
            this.setState({
              Total : `$${sum.toFixed(2)}`
            })
            break;
          case "JPY": 
            sum += this.state.itemsSold[i].count * this.state.itemsSold[i].Price[3].amount
            this.setState({
              Total : `¥${sum.toFixed(2)}`
            })
            break;
          case "RUB": 
            sum += this.state.itemsSold[i].count * this.state.itemsSold[i].Price[4].amount
            this.setState({
              Total : `₽${sum.toFixed(2)}`
            })
            break;
          default:
            console.log("p")
        }
      }
      }

  handleDescription = (val) => {
    return this.setState({
      showDescription : true,
      whichProduct : val,
    })
  }

  handleSold = (val) => {
    return this.state.itemsSold.some(S => {
      return S.Ip === val.Ip
    })
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
      default :
      return null
    }
  }
  handleCloseCurrency = () => {
    if(this.state.showCurrencies === true) {
      this.setState({
        showCurrencies : false
      });
    }
  }
  handleCloseCart = () => {
    if(this.state.showCartOverlay === true) {
      this.setState({
        showCartOverlay : false
      })
    }
  }


  handlePurchase = (item) => {
    console.log(item)
    var newList = this.state.itemsSold;
    if(newList.length !== 0){
      if(newList.every(val => val.Id !== item.Id)){
        newList = [...newList, item];
        this.setState({
          itemsSold : newList,
        })
      }else {
        for(let i = 0; i < newList.length; i ++) {
          if (newList[i].Id === item.Id && JSON.stringify(newList[i].Attributes.sort()) == JSON.stringify(item.Attributes.sort())){
            newList[i].count++;
            this.setState({
              itemsSold : newList
            })
            break;
          }else if (newList[i].Id === item.Id && JSON.stringify(newList[i].Attributes.sort()) != JSON.stringify(item.Attributes.sort())){
            newList = [...newList, item];
            this.setState({
              itemsSold : newList,
            })
            break
          }
        }
      }
    }else{
      newList = [...newList, item];
      this.setState({
        itemsSold : newList,
      })
    }
  }


  handleCloseDescription = () => {
    this.setState({
      showDescription : false, 
    })
  }


  render(){
    return(
      <div onClick={
        ()=>this.handleTotal()
      }>
      <CurrenciesQuery>
        {({data, loading, error})=>{
          if(loading) return null;
          if(error) console.log(`Error : ${error}`)
            return ( 
            <Navbar 
              CloseCurrency = {this.handleCloseCurrency}
              CloseCart = {this.handleCloseCart}
              HandleCloseDescription = {this.handleCloseDescription}
              HandleTotal = {this.handleTotal}
              Total = {this.state.Total}
              HanleCurrency = {this.handleCurrency}
              HandleCartOverlay = {this.handleCartOverlay}
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
      <div onClick={ () => 
        {
          this.handleCloseCart(); 
          this.handleCloseCurrency()
        }
      }>
    {
      this.state.showDescription ? 
      <ProDesPa 
        Product = {this.state.whichProduct}
        HandlePrice = {this.handlePrice}
        HandlePurchase = {this.handlePurchase}
        HandleTotal = {this.handleTotal}
        Sold = {this.state.itemsSold}
      />

      :
      <CategoryQuery Input={this.state.Category}>
        {({data, loading, error})=>{
          if(loading) return null;
          if(error) console.log(`Error : ${error}`);
          return (
            <ProLiPa 
              ShowCartOverlay = {this.state.showCartOverlay}
              HandleTotal = {this.handleTotal}
              HandleDescription = {this.handleDescription}
              HandleSold = {this.state.itemsSold}
              HandlePurchase = {this.handlePurchase}
              Data={data.category} 
              Products = {data.category.products}
              HandlePrice = {this.handlePrice}
            />
          )
        }}
      </CategoryQuery>
      }
      </div>
      </div>
    )
  }
}
