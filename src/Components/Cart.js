import React, { Component } from 'react'
import styled from 'styled-components';
import CartItem from './CartItem';
export default class Cart extends Component {
    render() {
        return (
            <Container Display={this.props.ShowCartOverlay}>
                <Title>cart</Title>
                {
                    this.props.ItemsSold.map((item) => {
                        return <CartItem 
                            HandlePrice = {this.props.HandlePrice}
                            Product = {item} 
                            key = {item.id} 
                        />
                    })
                }
            </Container>
        )
    }
}
const Container = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    opacity: ${props => props.Display ? "30%" : 1};
    pointer-events: ${props => props.Display ? "none" : "auto"};
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    color: #1D1F22;
`;