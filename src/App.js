import React, { Component } from 'react';
import Visualizer from './components/visualizer/Visualizer';
import Selector from './components/selector/Selector';
import MySelections from './components/myselections/MySelections';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Responsive from 'react-responsive';
import data from './data/data.json';
import * as util from './utils/util';

import './App.scss';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCartButton: false
    }

  }

  componentWillMount() {
    data.data.forEach(category => {
      let categoryState = util.camelize(category.category);
      let categoryShow = categoryState + "Show";
      this.setState({
        [categoryState]: {
          size: '',
          product: '',
          color: ''
        },
        [categoryShow]: false
      });
    });
  }

  componentDidMount() {
    if (document.getElementsByClassName('visualizer-app__section__visualizer__mobile').length > 0) window.addEventListener('scroll', this.addNewClassOnScroll, false);

    const query = gql`
      {
        list{
          id
         shortname
          parentTitle
          tags
          parentID
          availableForSale
          category
          vendor
          handle
        }
      }
    `;

    this.props.client.query({
      query: query
    }).then(res => console.log(res));

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

  syncProductInfoForParent = (category, key, value, show) => {
    let categoryInfo = this.state[category];
    let categoryShow = category + "Show";
    categoryInfo[key] = Array.isArray(value) ? value[0] : value;
    // categoryInfo[key].price = price;
    this.setState({ [category]: categoryInfo, [categoryShow]: show });
  }


  render() {
    return (
      <div className="visualizer-app">
        <Responsive minWidth={ 813 }>
          <div className="visualizer-app__section visualizer-app__section__visualizer">
            <Visualizer 
              {...this.state}
            />
          </div>
        </Responsive>
        <Responsive maxWidth={ 812 }>
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
        </Responsive>
        <div className="visualizer-app__section visualizer-app__section__selector">
          <Selector 
            syncProductInfoForParent={ this.syncProductInfoForParent }
          />
          <MySelections
            {...this.state}
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
}


// export default App;



/****
 GRAPHQL STUFF, SAVE FOR LATER 
****/



const query = gql`
  {
    list{
      id
     shortname
      parentTitle
      tags
      parentID
      availableForSale
      category
      vendor
      handle
    }
  }
`;

// client.query({
//   query: query
// }).then(res => console.log(res));
console.log(query);

const AppWithDataAndMutation = compose(
  graphql(query)
)(App);


export default AppWithDataAndMutation;