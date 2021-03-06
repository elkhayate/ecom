import React, { Component } from 'react';
import styled from 'styled-components';
import sold from "../assets/Sold_icon.png"
import { v4 as uuidv4 } from 'uuid';


export default class Product extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Attributes : this.props.Product.attributes,
             Count : 1,
             Product : this.props.Product,
             Sold : false,
        }
    }
    static getDerivedStateFromProps(props, state) {
        if(props.Sold.some(P => P.Id === state.Product.id)) return {Sold: true }
        return null;
      }
    handleclick = (e) => {
        e.stopPropagation()
        if(this.props.Product.attributes.length === 0) {
            let newItem = {
                count : this.state.Count, 
                product : this.state.Product, 
                Product : this.state.Product,
                Id : this.state.Product.id,
                Price : this.props.Product.prices,
                Attributes : {},
                id : uuidv4(),
            }
            this.props.HandlePurchase(newItem);
        }else {
            this.props.HandleDescription(this.props.Product)
        }
        this.props.HandleTotal(this.props.HandleSold)
    }
    render(){
            return(
                <Container 
                    Display={this.props.Product.inStock}
                    Sold = {this.state.Sold}
                    Opacity = {this.props.Product.inStock}
                    onClick = {()=>this.props.HandleDescription(this.props.Product)}
                    >
                    <Stock
                        Display={this.props.Product.inStock}
                    >out of stock</Stock>
                    <Sold 
                        onClick={this.handleclick}  
                        Display={this.state.Sold} 
                        src={sold} 
                        alt = "Purchase" 
                    />
                    <Media>
                    <Image 
                        src={this.props.Product.gallery[0]} 
                        alt = "Product"  
                    />
                    </Media>
                    <Content>
                        <Title>{this.props.Product.name}</Title>
                        <Brand>{this.props.Product.brand}</Brand>
                        <Price>{this.props.Price}</Price>
                    </Content>
                </Container>
            )
    }
}
const Brand = styled.h4`
    font-weight: 300;
    font-size: 19px;
    line-height: 80%;
`;
const Sold = styled.img`
    opacity: ${props => props.Display ? "1" : 0.8};
    position: absolute;
    display: flex;
    align-self: flex-end;
    bottom: 50px;
    right: 25px;
    display: ${props => props.Display ? "initial" : "none"};
    &:hover {
        opacity: 1;
    }
`;
const Stock = styled.h1`
    position: absolute;
    left: 25.42%;
    right: 25.71%;
    top: 34.24%;
    bottom: 43.94%;
    font-size: 24px;
    line-height: 160%;
    text-transform: uppercase;
    display: ${props => props.Display ? "none" : "initial"};
`;
const Container = styled.div`
    height: 456px;
    width: 28%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
    padding: 16px;
    position: relative;
    box-shadow: ${props => props.Sold ? "0px 4px 35px rgba(168, 172, 176, 0.19)" : null };
    opacity: ${props => props.Opacity ? "0.9" : "0.6"};
    &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
        opacity: ${props => props.Opacity ? "1" : "0.6"};
    }
    &:hover ${Sold} {
        display: ${props => props.Display ? "initial" : "none"};
    }
    
`;
const Title = styled.h3`
    font-weight: 300;
    font-size: 20px;
    line-height: 90%;
`;
const Media = styled.div`
    width: 100%;
    height: 75%;
    margin: auto;
    text-align: center;
`;
const Image = styled.img`
    object-fit: cover;
    height: 100%;
`;

const Price = styled.p`
    font-weight: 800;
    font-size: 15px;
    line-height: 50%;
`;
const Content = styled.div`
    height: 25%;
`;