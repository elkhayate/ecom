import React, { Component, createElement } from 'react'
import DOMPurify from 'dompurify'
import styled from 'styled-components'

export default class ProDesPa extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            whichImg : this.props.Product.gallery[0],
            Count : 1,
            Attributes : [],
            showAlert : false,
        }
    }

    switchImg = (val) => {
        this.setState({
            whichImg : val,
        })
    }

    handlePurchase = () => {
        let newItem = {
            Product : this.props.Product,
            Attributes : this.state.Attributes,
            count : this.state.Count,
            Price : this.props.Product.prices,
        }
        if(newItem.Attributes.length === newItem.Product.attributes.length) {
            this.setState({
                showAlert : false
            })
            this.props.HandlePurchase(newItem);
        }else{
            this.setState({
                showAlert: true,
            })
        }
    }
    render(){
        const Product = this.props.Product;
        const sanitzer = DOMPurify.sanitize;
        return(
            <Container>
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
                            <Alert>Please select item in all attributes.</Alert>
                        }
                        {
                            Product.attributes &&
                            Product.attributes.map(Att => {
                                return <Attributes key = {Att.id}>
                                    <AttributesName>{`${Att.name} :`}</AttributesName>
                                    {
                                        Att.items.map(Atva => {
                                            return Atva.value.charAt(0) === "#" ? 
                                            <SwatchAttribute 
                                                key = {Atva.id} 
                                                Display ={Atva.value}/> :
                                            <Attribute key = {Atva.id}>
                                                <AttributeName>{Atva.value}</AttributeName>
                                            </Attribute>
                                        })
                                    }
                                </Attributes>
                            })
                        }
                        <Price>
                            <PriceName>Price :</PriceName>
                            <PriceVal>{this.props.HandlePrice(Product.prices)}</PriceVal>
                        </Price>
                        <Button onClick={() => this.handlePurchase()}>add to cart</Button>
                        <Description dangerouslySetInnerHTML={{
                            __html : sanitzer(Product.description)
                        }} />
                    </Details>
                </Content>
            </Container>
        )
    }
}
const Alert = styled.h3`
    color : red;
`;
const Button = styled.button`
`;
const Description = styled.div`
`;
const Price = styled.div`
`;
const PriceName = styled.h2`
`;
const PriceVal = styled.h2`
`
const Header = styled.div`
`;
const Title = styled.h1`
`;
const Brand = styled.h2`
`;
const Attributes= styled.div`
`;
const AttributesName = styled.div`
`;
const Attribute = styled.div`
`;
const AttributeName = styled.p`
`;
const SwatchAttribute = styled.div`
    height: 25px;
    width: 25px;
    color: ${props => `${props.Display}`};
`;
const Container = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: stretch;
    height: 100%;
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
    height: 100%;
    width: 600px;
`;
const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
`;
const Details = styled.div`
`;
