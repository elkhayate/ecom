import React, { Component } from 'react'
import styled from 'styled-components';
import CartItem from './CartItem';
import { v4 as uuidv4 } from 'uuid';

export default class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Product : this.props.ItemsSold,
        }
    }
    static getDerivedStateFromProps(props) {
        return {Product: props.ItemsSold };
    }

    render() {
        return (
            <Container Display={this.props.ShowCartOverlay}>
                <Title>cart</Title>
                {
                    this.state.Product.map((item) => {
                        return <CartItem 
                            HandleItemTotal = {this.props.HandleItemTotal}
                            HandlePrice = {this.props.HandlePrice}
                            product = {item} 
                            Product = {item.Product}
                            Attributes = {item.Attributes}
                            Photos = {item.Product.gallery}
                            key = {uuidv4()} 
                            HandleSold = {this.props.HandleSold}
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