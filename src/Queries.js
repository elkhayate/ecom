import { useQuery, gql } from '@apollo/client'

export function CategoryQuery(props) {
    const Data = gql`
   query Query($input: CategoryInput) {
  category(input: $input) {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency
        amount
      }
      brand
    }
  }
  }
  `;
    return props.children(useQuery(Data, {variables:{ input : {title : props.Input}}}));
}

export function CategoriesQuery(props){
    const Data = gql`
        query Query {
    categories {
        name
    }
    }
    `;
    return props.children(useQuery(Data));
}
export function CurrenciesQuery(props){
  const Data = gql`
  query Query {
  currencies
  }
  `;
  return props.children(useQuery(Data))
}
export function ProductQuery(props){
    const Data = gql`
        query Query($productId: String!) {
    product(id: $productId) {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
        id
        name
        type
        items {
            displayValue
            value
            id
        }
        }
        brand
        prices {
        amount
        currency
        }
    }
    }
`;
    return props.children(useQuery(Data, {variables:{ productId : props.Input}}));
}