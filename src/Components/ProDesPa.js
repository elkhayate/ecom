import React, { Component } from 'react'
import DOMPurify from 'dompurify'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';

export default class ProDesPa extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            whichImg : this.props.Product.gallery[0],
            Count : 1,
            Attributes : {},
            showAlert : false,
        }
    }

    switchImg = (val) => {
        this.setState({
            whichImg : val,
        })
    }

    handleAttributes =(attname, attval)=>{
        let OutList = this.state.Attributes;
        OutList[attname] = attval;
        this.setState({
            Attributes : OutList
        }) 
    }

    handlePurchase = () => {
        let newItem = {
            Product : this.props.Product,
            Attributes : this.state.Attributes,
            count : this.state.Count,
            Price : this.props.Product.prices,
            Id : this.props.Product.id,
            Photo : this.props.Product.gallery[0],
            id : uuidv4(),
        }
        if(objectSize(newItem.Attributes) === this.props.Product.attributes.length) {
            this.props.HandlePurchase(newItem);
            this.setState({
                showAlert : false,
                Attributes : []
            })
            
        }else{
            this.setState({
                showAlert: true,
                Attributes : []
            })
        }
        
    }
    render(){
        const Product = this.props.Product;
        const sanitzer = DOMPurify.sanitize;
        return(
            <Container Display={this.props.ShowCartOverlay}>
                <Images>
                    {
                        Product.gallery.map(Img => {
                            return <Imgs key ={Img}><Image 
                                 src={Img} 
                                alt = "product"
                                onClick ={() => this.switchImg(Img)}
                             /></Imgs>
                        })
                    }
                </Images>
                <Content>
                    <ImgDisplay>
                        <Img 
                            src = {this.state.whichImg} 
                            alt ="selected"
                         />
                    </ImgDisplay>
                    <Details>
                        <Header>
                            <Title>{Product.name}</Title>
                            <Brand>{Product.brand}</Brand>
                        </Header>
                        {
                            this.state.showAlert &&
                            <Alert>Please select all attributes !</Alert>
                        }
                        {
                            Product.attributes &&
                            Product.attributes.map(Att => {
                                return <Attributes key = {Att.id}>
                                    <AttributesName>{`${Att.name} :`}</AttributesName>
                                    <Items>
                                    {
                                        Att.items.map(Atva => {
                                            return Atva.value.charAt(0) === "#" ? 
                                            <SwatchAttribute
                                                onClick={()=>this.handleAttributes(Att.name, Atva.value)} 
                                                key = {Atva.id} 
                                                style={{background : Atva.value}}
                                                Display={this.state.Attributes[Att.name] === Atva.value}
                                                /> :
                                                <AttributeName 
                                                    onClick={()=>this.handleAttributes(Att.name, Atva.value)}
                                                    key = {Atva.id}
                                                    Display={this.state.Attributes[Att.name] === Atva.value}
                                                    >
                                                        {Atva.value}
                                                </AttributeName>
                                        })
                                    }
                                    </Items>
                                </Attributes>
                            })
                        }
                        <Price>
                            <PriceName>Price :</PriceName>
                            <PriceVal>{this.props.HandlePrice(Product.prices)}</PriceVal>
                        </Price>
                        {
                            !Product.inStock 
                        && 
                            <OutofStock>(Sorry Item Out of Stock)</OutofStock>
                        }
                        <Button 
                            disabled={!Product.inStock} 
                            Display={!Product.inStock} 
                            onClick={() => this.handlePurchase()}
                        >add to cart</Button>
                        <Description dangerouslySetInnerHTML={{
                            __html : sanitzer(Product.description)
                        }} />
                    </Details>
                </Content>
            </Container>
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
const OutofStock = styled.h3`
    font-weight: normal;
    font-size: 20px;
    line-height: 27px;
    opacity: 0.8;
`;
const Alert = styled.h3`
    color : red;
    font-weight: normal;
    font-size: 16px;
    line-height: 159.96%;
`;
const Button = styled.button`
    background: #5ECE7B;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 32px;
    width: 292px;
    height: 52px;
    border: none;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
    line-height: 120%;
    color: #FFFFFF;
    cursor: ${props => props.Display ? "not-allowed" : "pointer"};
    opacity: ${props => props.Display ? "0.2" : "1"};
    margin-bottom: 20px;
`;
const Description = styled.div`
    font-weight: normal;
    font-size: 16px;
`;
const Price = styled.div`
    height: 10%;
    margin-bottom: 20px;
`;
const PriceName = styled.h2`
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
`;
const PriceVal = styled.h2`
    font-weight: bold;
    font-size: 24px;
    line-height: 18px;
`;
const Header = styled.div`
    height: 15%;
`;
const Title = styled.h1`
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
`;
const Brand = styled.h2`
    font-weight: normal;
    font-size: 30px;
    line-height: 27px;
`;
const Attributes= styled.div`
    display: block;
    align-content: space-between;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    padding-left: 0px;
`;
const AttributesName = styled.div`
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
    height: 50%;
`;
const Items = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
`;

const AttributeName = styled.p`
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.05em;
    padding: 5px;
    border: 1px solid #1D1F22;
    margin: 5px;
    height: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: ${props => props.Display ? "0.4" : "1"};
    &:hover {
        opacity: 0.6;
    }
`;
const SwatchAttribute = styled.div`
    border: 1px solid #1D1F22;
    height: 25px;
    width: 25px;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    opacity: ${props => props.Display ? "0.4" : "1"};
    &:hover {
        opacity: 0.6;
    }
`;
const Container = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: stretch;
    height: 100%;
    opacity: ${props => props.Display ? "30%" : 1};
    pointer-events: ${props => props.Display ? "none" : "auto"};
`;
const Imgs = styled.div`
    height: 80px;
    width: 150px;
    padding: 10px;
    padding-top: 0px;
    cursor: pointer;
`;
const Images = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content:  space-between;
    width: 10%;
    height: 100%;
`;
const Image = styled.img`
    height: 100%;
    max-width: 100%;
`;
const Content = styled.div`
    width: 90%;
    display: flex;
    height: 100%;
`;
const ImgDisplay = styled.div`
    height: 600px;
    width: 60%;
`;
const Img = styled.img`
    width: 100%;
    height: 100%;
`;
const Details = styled.div`
    width: 40%;
    padding: 30px;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
