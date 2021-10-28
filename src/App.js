import React, { Component } from 'react'
import { useQuery, gql } from '@apollo/client'

function Query(props) {
  return props.children(useQuery(props.keyName, {variables:{ input : {title : 'clothes'}}}));
}
export default class App extends Component{
  render(){
    const Data = gql`
      query Query($input: CategoryInput) {
  category(input: $input) {
    name
    products {
      name
    }
  }
}
    `;
    return(
      <Query keyName={Data}>
        {({ data, loading }) => {
          if (loading) return <h1>Loading</h1>;
          console.log(data)
          return (
            <div className="App">
              <h1>Hello </h1>
              <h2>Start editing to see some magic happen!</h2>
            </div>
          );
        }}
      </Query>
    )
  }
}