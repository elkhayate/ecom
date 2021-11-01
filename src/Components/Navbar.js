import React, { Component } from 'react';
import {CategoriesQuery} from "../Queries";
import styled from 'styled-components';
import Brand from "../assets/Brand.png";
import vector2 from "../assets/Vector-2.png"
import vector from "../assets/Vector.png"


export default class Navbar extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             whichCategory : '',
             selectedCurr : 'USD',
        }
    }

    handleCategory=(val)=>{
        this.setState({
            whichCategory : val
        });
        this.props.HandleCategory(val); 
        this.props.HandleCloseDescription();
    }

    handleCurrSign = (val) => {
        switch(val){
            case "USD": 
                return `$ ${val}`;
            case "JPY": 
                return `¥ ${val}`;
            case "GBP": 
                return `£ ${val}`;
            case "AUD": 
                return `$ ${val}`;
            case "RUB": 
                return `₽ ${val}`;
            default :
            return null;
        }
    }

    handleCurrVal = (val) => {
        this.setState({
            selectedCurr : val,
        });
        this.props.HanleCurrency(val);
    }
    render(){
        return(
            <CategoriesQuery>
            {({data, loading, error})=>{
                if(loading) return <h1>Loading...</h1>
                if(error) console.log(`Error : ${error}`)
                return(
                    <NavBar>
                        <Container>
                            <Categories>
                                {
                                this.state.whichCategory === 'clothes' 
                                ? 
                                <ClickedCategory onClick={()=>{
                                    this.handleCategory(data.categories[0].name);
                                    this.props.CloseCurrency();
                                    this.props.CloseCart();
                                    this.props.HandleShowCart(false)
                                    }}>
                                    <Title>{data.categories[0].name}</Title>
                                </ClickedCategory> 
                                :
                                <Category onClick={()=>{
                                    this.handleCategory(data.categories[0].name);
                                    this.props.CloseCurrency();
                                    this.props.CloseCart();
                                    this.props.HandleShowCart(false)
                                    }}>
                                    <Title>{data.categories[0].name}</Title>
                                </Category>
                                }
                                {
                                this.state.whichCategory === 'tech' 
                                ? 
                                <ClickedCategory onClick={()=>{
                                    this.handleCategory(data.categories[1].name);
                                    this.props.CloseCurrency();
                                    this.props.CloseCart();
                                    this.props.HandleShowCart(false)
                                    }}>
                                    <Title>{data.categories[1].name}</Title>
                                </ClickedCategory> 
                                :
                                <Category onClick={()=>{
                                    this.handleCategory(data.categories[1].name);
                                    this.props.CloseCurrency();
                                    this.props.CloseCart();
                                    this.props.HandleShowCart(false)
                                    }}>
                                    <Title>{data.categories[1].name}</Title>
                                </Category>
                                }
                                {
                                this.state.whichCategory === '' 
                                ? 
                                <ClickedCategory onClick={()=>{
                                    this.handleCategory('');
                                    this.props.CloseCurrency();
                                    this.props.CloseCart();
                                    this.props.HandleShowCart(false)
                                    }}>
                                    <Title>all</Title>
                                </ClickedCategory> 
                                :
                                <Category onClick={()=>{
                                    this.handleCategory('');
                                    this.props.CloseCurrency();
                                    this.props.CloseCart();
                                    this.props.HandleShowCart(false)
                                    }}>
                                    <Title>all</Title>
                                </Category>
                                }
                            </Categories>

                            <CartBtn>
                                <img src = {Brand} alt = "Brand Icon"/>
                            </CartBtn>

                            <Icons>
                                <Currencies onClick={()=>{
                                    this.props.HandleToggler(); 
                                    this.props.CloseCart()
                                    }}>
                                    <Usd>$</Usd>
                                    <Drop src={vector2} alt = "DropDown" />
                                </Currencies>

                                <Parent onClick={()=> {
                                        this.props.HandleCartOverlay();
                                        this.props.CloseCurrency()
                                    }}>
                                    {
                                    this.props.Sold[0] 
                                    && 
                                    <Test>{this.props.Sold.length}</Test>
                                    }
                                    <img  src={vector} alt="Purchases" />

                                </Parent>
                            </Icons>

                        </Container>
                        {
                        this.props.ShowCurrencies 
                        &&
                        <Choices>
                           {
                               this.props.Currencies.currencies.map( Cur => 
                            <Choice 
                                key={Cur} 
                                onClick={()=> {
                                    this.props.HandleToggler(); 
                                    this.handleCurrVal(Cur)
                                }}
                            >
                                {this.handleCurrSign(Cur)}
                            </Choice>
                            )
                           }
                        </Choices>
                        }
                        {
                        this.props.ShowCartOverlay &&
                            <DropDown>
                                <Titl>My Bag. {this.props.Sold.length} items</Titl>
                                <Items>
                                    {
                                        this.props.Sold.length > 0 ?
                                            this.props.Sold.map(sold => {
                                                
                                            }) :
                                            <Titre>No items to show</Titre>
                                        
                                    }
                                </Items>
                                <Total>
                                    <Titre>total</Titre>
                                    <Price>{this.props.Total}</Price>
                                </Total>
                                <Buttons>
                                    <ButtonBag onClick={()=>{
                                        this.props.HandleShowCart(true); 
                                        this.props.CloseCart();}}
                                    >view bag</ButtonBag>
                                    <ButtonOut onClick={()=>
                                        this.props.CloseCart()}
                                    >check out</ButtonOut>
                                </Buttons>
                            </DropDown>
                        }
                    </NavBar>
                )
            }}
        </CategoriesQuery>
        )
        
    }
}
const DropDown = styled.div`
    position: absolute;
    width : 325px;
    right: 50px;
    top: 97px;
    z-index: 2;
    background: #FFFFFF;
    box-shadow: 1px 0px 14px 5px rgba(168, 172, 176, 0.19);
`;

const Parent = styled.div`
    cursor: pointer;
    position: relative;
`;
const Items = styled.div`
    height: 100%;
    overflow: auto;
`;
const Drop = styled.img`
    height: 100%;
`;

const ClickedCategory = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    color : #5ECE7B;
    border-bottom : 2px #5ECE7B solid;
`;
const Price = styled.h2`
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
`;
const Titre = styled.h2`
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    text-transform: capitalize;
`;
const ButtonOut = styled.button`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    width: 145px;
    height: 43px;
    font-weight: 600;
    font-size: 13px;
    line-height: 120%;
    text-transform: uppercase;
    color : #FFFFFF;
    background-color: #5ECE7B;
    border: none;
    opacity : 0.9;
    &:hover {
        opacity : 1;
    }
`;
const ButtonBag = styled.button`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    width: 145px;
    height: 43px;
    font-weight: 600;
    font-size: 13px;
    line-height: 120%;
    text-transform: uppercase;
    color : #1D1F22;
    background-color: #FFFFFF;
    border: 1px solid #1D1F22;
    opacity : 0.9;
    &:hover {
        opacity : 1;
    }
`;
const Buttons = styled.div`
    width: 95%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
`;

const Total = styled.div`
    width: 95%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Titl = styled.h2`
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    text-align: right;
    color: #1D1F22;
    text-align: start;
    padding: 5px;
`;


const Test = styled.div`
    position: absolute;
    right: -10px;
    top: -7px;
    width: 17px;
    height: 17px;
    background-color: black;
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    border-radius: 60px;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
`;

const Choice = styled.div`
    list-style: none;
    width: 100%;
    padding: 5px;
    cursor: pointer;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    text-align: center;
    color: #1D1F22;
    opacity: 0.7;
    &:hover{
        opacity: 1;
    }
`;

const Choices = styled.div`
    z-index: 2;
    width: 104px;
    position: absolute;
    top:60px;
    right: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 1px 0px 14px 5px rgba(168, 172, 176, 0.19);
`;
const Title = styled.h1`
    font-weight: normal;
    font-size: 16px;
    line-height: 120%;
    margin: 30%;
    padding: 10px;
    text-transform: uppercase;
`;


const Usd = styled.p`
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
`;


const Currencies = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;


const NavBar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 50px;
`;

const Category = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
`;

const Container = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    height: 100%;
`;

const Categories = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;

const CartBtn = styled.div`
    cursor: pointer;
    margin-right: 130px;
`;

const Icons = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    width: 3%;
`;