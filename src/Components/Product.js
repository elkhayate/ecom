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
    handleclick = () => {
        let newItem = {attributes : this.state.Attributes, count : this.state.Count, product : this.state.Product, Id : this.state.Product.id};
        this.props.HandlePurchase(newItem)
        console.log(newItem)
        if(this.props.Sold.some(P => P.Id === this.state.Product.id)) {
            return this.setState({
                Sold : true
            })
        }
    }
    render(){
            return(
                <Container>
                    {this.state.Sold ? <h1>sold</h1> : null}
                    <Media>
                    <Image src={this.props.Product.gallery[0]} alt = "Product"  />
                    </Media>
                    <Content>
                        <Title>{this.props.Product.name}</Title>
                        <Price>{this.props.Price}</Price>
                        
                    </Content>
                    <button onClick={() => this.handleclick()}>Buy</button>
                </Container>
            )
    }
}


const Stock = styled.h1`
    position: absolute;
    left: 25.42%;
    right: 25.71%;
    top: 34.24%;
    bottom: 43.94%;
    font-size: 24px;
    line-height: 160%;
    text-transform: uppercase;
`;
const ContainerOut = styled.div`
    height: 386px;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
    padding: 15px;
    position: relative;
    &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    }
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
    &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
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
`;
const Image = styled.img`
    height: 100%;
    width: 90%;
    margin: auto;
`;

const Price = styled.p`
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
`;
const Content = styled.div`
    height: 25%;
`;