import React, { Component } from 'react';
import styled from "styled-components";
import Product from './Product';

export default class ProLiPa extends Component {
    
    render(){
        return(
            <ProList Display={this.props.ShowCartOverlay}>
                <Title>{this.props.Data.name}</Title>
                <Container>
                    {this.props.Products.map(Pro => {
                        return (
                            <Product
                                HandleDescription = {this.props.HandleDescription}
                                key = {Pro.id}
                                HandlePurchase = {this.props.HandlePurchase} 
                                Product = {Pro}
                                Price = {this.props.HandlePrice(Pro.prices)}
                                Sold = {this.props.HandleSold}
                                HandleTotal = {this.props.HandleTotal}
                            />
                        )
                    })}
                </Container>
            </ProList>
        )
    }
}
const ProList = styled.div`
    padding: 40x;
    opacity: ${props => props.Display ? "30%" : 1};
    pointer-events: ${props => props.Display ? "none" : "auto"};
`;
const Container = styled.div`
    width: 83%;
    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: auto;
`;

const Title = styled.h1`
    font-weight: normal;
    font-size: 42px;
    line-height: 160%;
    width: 80%;
    margin: auto;
    text-transform: uppercase;
`;