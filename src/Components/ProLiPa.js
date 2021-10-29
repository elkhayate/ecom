import React, { Component } from 'react'



export default class ProLiPa extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render(){
        return(
            
            this.props.Data.map(p => <h1>{p.name}</h1>)
            
        )
    }
}