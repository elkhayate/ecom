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
             which : "tech"
        }
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
                                this.state.which === 'clothes' 
                                ? 
                                <ClickedCategory onClick={()=>{this.setState({which : 'clothes'})}}>
                                    <Title>{data.categories[0].name}</Title>
                                </ClickedCategory> 
                                :
                                <Category onClick={()=>{this.setState({which : 'clothes'})}}>
                                    <Title>{data.categories[0].name}</Title>
                                </Category>
                                }
                                {
                                this.state.which === 'tech' 
                                ? 
                                <ClickedCategory onClick={()=>{this.setState({which : 'tech'})}}>
                                    <Title>{data.categories[1].name}</Title>
                                </ClickedCategory> 
                                :
                                <Category onClick={()=>{this.setState({which : 'tech'})}}>
                                    <Title>{data.categories[1].name}</Title>
                                </Category>
                                }
                                {
                                this.state.which === '' 
                                ? 
                                <ClickedCategory onClick={()=>{this.setState({which : ''})}}>
                                    <Title>all</Title>
                                </ClickedCategory> 
                                :
                                <Category onClick={()=>{this.setState({which : ''})}}>
                                    <Title>all</Title>
                                </Category>
                                }
                            </Categories>
                            <CartBtn>
                            <img src = {Brand} alt = "Brand Icon"/>
                            </CartBtn>
                            <Icons>
                                <Currencies>
                                    <Usd>$</Usd>
                                    <img style={{height:"100%"}} src={vector2} alt = "DropDown" />
                                </Currencies>
                                <Parent onClick={()=> this.props.setShow()}>
                                    {
                                    this.props.Sold[0] 
                                    && 
                                    <Test>{this.props.Sold.length}</Test>
                                    }
                                    <img  src={vector} alt="Purchases" />
                                </Parent>
                            </Icons>
                        </Container>
                    </NavBar>
                )
            }}
        </CategoriesQuery>
        )
        
    }
}

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
const Button = styled.button`
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
`;
const Buttons = styled.div`
    width: 95%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
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

const DropDown = styled.div`
    position: absolute;
    width : 325px;
    right: 50px;
    top: 97px;
    z-index: 2;
    background: #FFFFFF;
`;

const Parent = styled.div`
    cursor: pointer;
    position: relative;
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

const Choice = styled.li`
    list-style: none;
    width: 100%;
    padding: 5px;
    text-align: center;
    cursor: pointer;
`;

const Choices = styled.ul`
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
    width: 114px;
    position: absolute;
    top:50px;
    right: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    border-radius: 5px;
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