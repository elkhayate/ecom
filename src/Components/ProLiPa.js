import React, { Component } from 'react'



export default class ProLiPa extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render(){
        return(
            
            this.props.Data.category.products.map(p => <h1>{p.name}</h1>)
            
        )
    }
}