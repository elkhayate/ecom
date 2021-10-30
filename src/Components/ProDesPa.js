import React, { Component } from 'react'


export default class ProDesPa extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            whichImg : this.props.Product.gallery[0]
        }
    }
    switchImg = (val) => {
        this.setState({
            whichImg : val,
        })
    }
    render(){
        const Product = this.props.Product;
        return(
            <Container>
                <Images>
                    {
                        Product.gallery.map(Img => {
                            <Image src={Img} alt = "product" onClick ={() => this.switchImg(Img)}/>
                        })
                    }
                </Images>
                <Content>
                    <ImgDisplay>
                        <Img src = {this.state.whichImg} alt ="selected" />
                    </ImgDisplay>
                    <Details>
                        <Header>
                            <Title>{Product.name}</Title>
                            <Brand>{Product.brand}</Brand>
                        </Header>
                        {
                            Product.attributes &&
                            Product.attributes.map(Att => {
                                <Attributes>
                                    <AttributesName>{`${Att.name} :`}</AttributesName>
                                    {
                                        Att.items.map(Atva => {
                                            Atva[0] === "#" ? 
                                            <SwatchAttribute Display ={Atva}/> :
                                            <Attribute>
                                                <AttributeName>{Atva}</AttributeName>
                                            </Attribute>
                                        })
                                    }
                                </Attributes>
                            })
                        }
                    </Details>
                </Content>
            </Container>
        )
    }
}
const Header = styled.div``;
const Title = styled.h1``;
const Brand = styled.h2``;
const Attributes= styled.div``;
const AttributesName = styled.div``;
const Attribute = styled.div``;
const AttributeName = styled.p``;
const SwatchAttribute = styled.div``;
const Container = styled.div``;
const Images = styled.div``;
const Image = styled.img``;
const Content = styled.div``;
const ImgDisplay = styled.div``;
const Img = styled.img``;
const Details = styled.div``;
