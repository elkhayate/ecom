import React, { Component } from 'react';
import styled from "styled-components";
import Product from './Product';
import { ProductQuery } from '../Queries';

export default class ProLiPa extends Component {
    
    render(){
        return(
            <ProList>
                <Title>{this.props.Data.name}</Title>
                <Container>
                    {this.props.Products.map(Pro => {
                        return (
                            <Product
                                key = {Pro.id}
                                HandlePurchase = {this.props.HandlePurchase} 
                                Product = {Pro}
                                Price = {this.props.HandlePrice(Pro.prices)}
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