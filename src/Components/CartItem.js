import React, { Component } from 'react'
import styled from 'styled-components'

export default class CartItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            keys : Object.keys(this.props.Product.Attributes),
            values : Object.values(this.props.Product.Attributes),
            gallery : this.props.Product.Product.gallery,
            count : 0,
            test : true
        }
    }
    handleRight = () => {
        if(this.state.count < this.state.gallery.length - 1){
            this.setState({
                count : this.state.count + 1
            })} else{
                this.setState({count : 0})
            }
          
    }
    handleLeft = () => {
        if(this.state.count <= 0){
            this.setState({
                count : this.state.gallery.length - 1
            })} else{
                this.setState({
                    count : this.state.count - 1
                })
            }
          
    }
    static getDerivedStateFromProps(props) {
        return {keys: Object.keys(props.Product.Attributes), values : Object.values(props.Product.Attributes)};
      }
    render() {
        const Product = this.props.Product;
        return(
            <Container>
                <Content>
                    <Header>
                        <Title>{Product.Product.name}</Title>
                        <Brand>{Product.Product.brand}</Brand>
                    </Header>
                    <Price>{this.props.HandlePrice(Product.Product.prices)}</Price>
                    <Attributes>
                        <AttributeNames>
                            {
                                this.state.keys.map(k => 
                                <Attribute key={k} >{`${k} :`}</Attribute>
                                    )
                            }
                        </AttributeNames>
                        <AttributChoice>
                            {
                                this.state.values.map( 
                                    v => {
                                        return v.charAt(0) === "#" ?
                                            <SwatchAttribute 
                                                key ={v} 
                                                style={{background : v}}
                                            /> : 
                                            <AttributeName
                                                key = {v}
                                            >
                                                {v}
                                            </AttributeName>
                                    }
                                )
                        }
                        </AttributChoice>
                    </Attributes>
                </Content>
                <Media>
                        <Counter>
                            <Tcount onClick={
                                 () => {this.props.HandleSold('plus', Product); this.setState({test : !this.state.test}) }
                            }>+</Tcount>
                            <Count>{Product.count}</Count>
                            <Tcount onClick={
                                () => {this.props.HandleSold('minus', Product); this.setState({test : !this.state.test}) }
                            }>-</Tcount>
                        </Counter>
                        <Images>
                            { Product.Product.gallery.length > 1 
                            &&
                                <Bleft onClick={
                                    () => this.handleLeft()
                                }>{`<`}</Bleft>
                            }
                            <Image src={Product.Product.gallery[this.state.count]} alt='pictures'/>
                            { Product.Product.gallery.length > 1 
                            &&
                                <Bright onClick={
                                    () => this.handleRight()
                                }>{`>`}</Bright>
                            }
                        </Images>
                </Media>
            </Container>
        )
    }
}
const Bright = styled.p`
    position:absolute;
    right: 10px;
    top: 50%;
    cursor: pointer;
   
`;
const Bleft = styled.p`
    position: absolute;
    left: 10px;
    top: 50%;
    cursor: pointer;
`;
const Container = styled.div`
    display: flex;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    padding: 3px;
`;
const Content = styled.div`
    width: 50%;
`;
const Image = styled.img`
    width: 85%;
    padding: 15px;
    height: 85%;
`;
const Header = styled.div`
    
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
const Price = styled.p`
    font-size: 24px;
    line-height: 18px;
`;
const Attributes = styled.div`
    display : flex;
    justify-content: flex-start;
`;

const Attribute = styled.p`
`;

const AttributeName = styled.p`
    font-weight: normal;
    font-size: 11px;
    line-height: 18px;
    letter-spacing: 0.05em;
    padding: 5px;
    border: 1px solid #1D1F22;
    margin: 5px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SwatchAttribute = styled.div`
    border: 1px solid #1D1F22;
    height: 25px;
    width: 25px;
    padding: 5px;
    margin: 5px;
    
`;
const AttributeNames = styled.div``
const AttributChoice = styled.div``;
const Media = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
`;
const Counter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
`;
const Images = styled.div`
    width: 30%;
    height: 230px;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    position: relative;
`;
const Tcount = styled.p`
    border: 1px solid #1D1F22;
    padding: 10px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
`;
const Count = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 160%;
`;