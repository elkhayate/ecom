import React, { Component } from 'react'


export default class Cart extends Component {
    render() {
        return (
            <Container>
                <Title>cart</Title>
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
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    color: #1D1F22;
`;