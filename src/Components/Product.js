import React, { Component } from 'react';
import styled from 'styled-components';
import sold from "../assets/Sold_icon.png"


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
    handleclick = () => {
        let newItem = {
            attributes : this.state.Attributes, 
            count : this.state.Count, 
            product : this.state.Product, 
            Id : this.state.Product.id,
            Price : this.props.Product.prices,
        };
        this.props.HandlePurchase(newItem);
        console.log(newItem)
        this.props.HandleTotal()
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
                        onClick={() => this.handleclick()}  
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
                        <Price>{this.props.Price}</Price>
                    </Content>
                </Container>
            )
    }
}

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
    height: 386px;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
    padding: 15px;
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
    font-size: 18px;
    line-height: 160%;
`;
const Media = styled.div`
    width: 90%;
    height: 75%;
    margin: auto;
    text-align: center;
`;
const Image = styled.img`
    height: 100%;
`;

const Price = styled.p`
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
`;
const Content = styled.div`
    height: 25%;
`;