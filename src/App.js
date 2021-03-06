import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import ProLiPa from './Components/ProLiPa';
import { CategoryQuery, CurrenciesQuery } from './Queries';
import ProDesPa from './Components/ProDesPa';
import Cart from './Components/Cart';

export default class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       itemsSold : [],
       Category : '',
       showCurrencies : false,
       showCartOverlay : false,
       showCart : false,
       showDescription : false,
       whichCurrency : 'USD',
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
  handleItemTotal = (prices, count) => {
    switch(this.state.whichCurrency) {
      case 'USD': 
        return `$${(prices[0].amount * count).toFixed(2)}`;
      case "GBP": 
        return `£${(prices[1].amount * count).toFixed(2)}`;
      case "AUD": 
        return `A$${(prices[2].amount * count).toFixed(2)}`;
      case "JPY": 
        return `¥${(prices[3].amount * count).toFixed(2)}`;
      case "RUB": 
        return `₽${(prices[4].amount * count).toFixed(2)}`;
      default :
      return null
    }

  }
  handleTotal = () => {
    let sum = 0;
    if(this.state.itemsSold.length !== 0){
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
              Total : `A$${sum.toFixed(2)}`
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
    }else{
      this.setState({
        Total : ""
      })
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

  handleSoldCount=(val,P)=>{
    let listOut = this.state.itemsSold;
    for(let i = 0; i < listOut.length; i++) {
      if(listOut[i].id === P.id && val === 'minus'  && listOut[i].count === 1) {
        listOut.splice(i, 1)
      }else if (listOut[i].id === P.id && val === 'minus' ) {
        listOut[i].count -= 1;
      }else if (listOut[i].id === P.id && val === 'plus'){
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
  handleShowCart = (val) => {
    this.setState({
      showCart : val
    })
  }
  handlePrice = (Data) => {
    switch(this.state.whichCurrency) {
      case 'USD': 
        return `$${Data[0].amount}`;
      case "GBP": 
        return `£${Data[1].amount}`;
      case "AUD": 
        return `A$${Data[2].amount}`;
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
          if (newList[i].Id === item.Id
             && shallowEqual(newList[i].Attributes, item.Attributes)){
            newList[i].count++;
            this.setState({
              itemsSold : newList
            })
            break;
          }else if (newList[i].Id === item.Id 
            && i === newList.length -1
           ){
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
        ()=>{this.handleCloseCurrency(); this.handleTotal(); this.handleCloseCart();}

      }>
      <CurrenciesQuery>
        {({data, loading, error})=>{
          if(loading) return null;
          if(error) console.log(`Error : ${error}`)
            return ( 
            <Navbar 
              WhichCurrency = {this.state.whichCurrency}
              HandleItemTotal = {this.handleItemTotal}
              HandleSold = {this.handleSoldCount}
              ShowCart = {this.state.showCart}
              HandleShowCart = {this.handleShowCart}              
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
              HandlePrice = {this.handlePrice}
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
        {this.state.showCart ?
        <Cart 
          HandleItemTotal = {this.handleItemTotal}
          HandleSold = {this.handleSoldCount}
          ShowCartOverlay = {this.state.showCartOverlay}
          ItemsSold = {this.state.itemsSold}
          HandlePrice = {this.handlePrice}
        />
        :
      (this.state.showDescription ? 
      <ProDesPa 
        ShowCartOverlay = {this.state.showCartOverlay}
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
      )
    }
      </div>
      </div>
    )
  }
}

const objectSize = function(obj){
  var size = 0,
      key;
  for(key in obj){
      if (obj.hasOwnProperty(key)) size++;
  }
  return size
}
const shallowEqual = function (object1, object2) {
  if(objectSize(object1) !== 0){
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }
  return true
}