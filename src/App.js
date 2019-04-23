import React, { Component } from 'react';
import Loading from './components/loading/Loading';
import Visualizer from './components/visualizer/Visualizer';
import Selector from './components/selector/Selector';
import MySelections from './components/myselections/MySelections';
import { graphql, compose, Query } from 'react-apollo';
import gql from 'graphql-tag';
import MediaQuery from 'react-responsive';
import Sticky from 'react-stickynode';
import data from './data/data.json';
import * as util from './utils/util';

import './App.scss';

const GET_PRODUCTS = gql`
      {
        list{
          handle
          category
          price
          parentTitle
          title
          vendor
          availableForSale
          id
          visualizerImages
          selectedOptions{
            name
            value
          }
          image{
            thumbnailImg
            altText
            productImg
          }
        }
      }
    `;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCartButton: false,
      productsForMySelections: []    
    }

  }

  componentWillMount() {
    if (document.getElementsByClassName('visualizer-app__section__visualizer__mobile').length > 0) window.addEventListener('scroll', this.addNewClassOnScroll, false);

    this.props.client.query({
      query: GET_PRODUCTS
    }).then(res => {
      this.setState({
        products: res.data.list
      }, this.renderState);
    });
  }

  renderState = () => {
    let categories = [];
    this.state.products.forEach(product => {
      if (!categories.includes(product.category)) categories.push(util.camelize(product.category))
    })

    categories.forEach(category => {
      this.setState({ [category]: {products: []} });
    })
  }

  componentWillUnmount() {
    if (document.getElementsByClassName('visualizer-app__section__visualizer__mobile').length > 0) window.removeEventListener('scroll', this.addNewClassOnScroll, false);
  }

  componentDidUpdate(prevProps, prevState) {
    Object.keys(this.state).forEach(state => {
      if (state.includes("Show")) {
        if (this.state[state] !== prevState[state]) {
          this.setState({ showCartButton: this.state[state] });
        }
      }
    });
  }

  addNewClassOnScroll = () => {
    const header = document.querySelector('.visualizer-app__section__visualizer');
    const filler = document.querySelector('.visualizer-app__section__visualizer__filler');    
    const scrollPosY = window.pageYOffset || document.body.scrollTop;

    if (scrollPosY >= 200) {
      header.classList.add('sticky');
      filler.classList.add('sticky');
    } else if (scrollPosY <= 50) {
      if (header.classList.contains('sticky')) header.classList.remove('sticky');
      if (filler.classList.contains('sticky')) filler.classList.remove('sticky');
    }
  }

  syncProductInfoForParent = (category, key, value, show, product) => {
    let categoryInfo = this.state[category];
    let categoryShow = category + "Show";
    let categoryProducts = category + "Products";
    categoryInfo[key] = value;
    // categoryInfo[key].price = price;
    this.setState({ [category]: categoryInfo, [categoryShow]: show }, () => {
     
      // let prodArr = [];
      if (key === "products") {
        let productsForMySelections = [];
        for (let state in this.state) {
          if (this.state[state].products) {
            this.state[state].products.forEach(product => {
              productsForMySelections.push(product);
            });
          }
        }
        this.setState({ productsForMySelections: productsForMySelections });
      }
    });
    
  }

  handleClear = (arr) => {
    this.setState({ productsForMySelections: arr }, this.renderState);
  }

  handleRemoveItem = (arr, prod) => {
    this.setState({ productsForMySelections: arr }, () => {
      for (let key in this.state) {
        if (!key.includes("products") && (!key.includes("show") && !key.includes("Show")) && this.state[key].products.includes(prod)) {
          let prodArr = this.state[key].products;
          let ind = prodArr.indexOf(prod);
          prodArr.splice(ind, 1);
          this.setState({[key]: { products: prodArr }});
        }
      }
    });
  }

  


  render() {
    return (
          <Query query={ GET_PRODUCTS } >
            {  
              ({ loading, data }) => {
                if (loading) return <Loading />
                const { list } = data;
                return (
                  <div className="visualizer-app">
                    <MediaQuery query="(min-device-width: 813px)">
                      <div className="visualizer-app__section visualizer-app__section__visualizer">
                        <Sticky top={100} bottomBoundary={'.Collection'} enabled={true}>
                          <Visualizer 
                            {...this.state}
                          />
                        </Sticky>
                      </div>
                    </MediaQuery>
                    <MediaQuery query="(max-device-width: 812px)">
                      <div className="visualizer-app__section visualizer-app__section__visualizer visualizer-app__section__visualizer__mobile">
                        <div className="visualizer-app__section__visualizer__header">
                        <h2 className="visualizer-app__section__visualizer__header-header">Build your own bed.</h2>
                          <div className="selector__subtitle">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </div>
                        </div>
                        <Visualizer 
                          {...this.state}
                        />
                      </div>
                      <div className="visualizer-app__section__visualizer__filler" />
                    </MediaQuery>
                    <div className="visualizer-app__section visualizer-app__section__selector">
                      <Selector
                        {...this.state} 
                        syncProductInfoForParent={ this.syncProductInfoForParent }
                        products={ list }
                        comforterSelected={ this.state.comforterDuvet && this.state.comforterDuvet.products.length > 0 }
                      />
                      <MySelections
                        {...this.state}
                        productsForMySelections={ this.state.productsForMySelections }
                        handleRemoveItem={ this.handleRemoveItem }
                        handleClear={ this.handleClear }
                      />
                      <div className={ this.state.showCartButton ? "visualizer-app__add-to-cart" : "visualizer-app__add-to-cart visualizer-app__add-to-cart__hidden" }>
                        <button className="visualizer-app__add-to-cart-button">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                    );
              }
            }</Query>
            
         
          
      
    );
  }
}



// export default App;



/****
 GRAPHQL STUFF, SAVE FOR LATER 
****/



const query = gql`
  {
  list{
    handle
    category
    price
    parentTitle
    title
    vendor
    availableForSale
    id
    visualizerImages
    selectedOptions{
      name
      value
    }
    image{
      thumbnailImg
      altText
      productImg
    }
  }
}
`;

// client.query({
//   query: query
// }).then(res => console.log(res));
// console.log(query);

// const AppWithDataAndMutation = compose(
//   graphql(query)
// )(App);


export default App;