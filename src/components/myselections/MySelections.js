import React, { Component } from 'react';
import './MySelections.scss';
import * as util from '../../utils/util';

class MySelections extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props,
			mySelections: props.productsForMySelections
		};
	}

	componentDidMount() {
		this.renderState();
	}

	componentDidUpdate(prevProps, prevState) {

		Object.keys(this.props).forEach(prop => {
			if (prevProps[prop] !== this.props[prop]) {
				if (this.props[prop] !== prevProps[prop]) {
					this.setState({ [prop]: this.props[prop] });
				}
			}
		});

		if (prevProps.productsForMySelections !== this.props.productsForMySelections) {
			this.setState({ mySelections: this.props.productsForMySelections });
		}
	}

	renderState = () => {
		let mySelections = this.state.mySelections;
		let categories = [];

	  for (let key in this.props) {
	  	if (this.props[key].products) {
	  		this.props[key].products.forEach(product => {
		  		let ind = mySelections.indexOf(product);
		  		console.log(product);
		  		if (ind < 0) {
		  			mySelections.push(product);
		  		} else {
		  			mySelections.splice(ind, 1);
		  		}
		  	});
	  	}
	  }
		this.setState({ mySelections: mySelections });
	}


	renderMySelections = () => {
		return this.state.mySelections.map(selection => {
			// console.log("MySelections: " + selection)
			let selectionShow = selection + "Show";
			let sizeInd = '';
			let price = selection.price ? parseInt(selection.price).toFixed(2) : 0;
			return(
				<div className={ "my-selections__list-item" /*: "my-selections__list-item my-selections__list-item__hidden"*/ }>
					<div className="my-selections__list-item-name">
						{  selection.parentTitle ? selection.parentTitle : null }
					</div>
					<div className="my-selections__list-item-price-close">
						<div className="my-selections__list-item-price">
							${ price }
						</div>
						<div onClick={ () => this.removeItem(selection) } className="my-selections__list-item-close" />
					</div>
				</div>
			);
		});
	}

	removeItem = (prod) => {
		console.log(prod);
		console.log("Removing item");
		let productsForMySelections = this.props.productsForMySelections;
		let ind = productsForMySelections.indexOf(prod);
		productsForMySelections.splice(ind, 1);
		this.props.handleRemoveItem(productsForMySelections, prod);
	}

	calculatePrice = () => {
		let total = 0;
		this.state.mySelections.forEach(product => {
			total += parseInt(product.price);
		});
		return "$" + total.toFixed(2);
	}

	render() {
		return (
			<div className={ this.state.mySelections.length > 0 ? "my-selections" : "my-selections my-selections__hidden" }>
				<div className="my-selections__header">
					<h3>THINGS I LOVE</h3>
					{
						this.state.mySelections.length > 0 ?
						<div className="my-selections__clear-button-container">
							<button className="my-selections__clear-button" onClick={ () => this.props.handleClear([]) }>CLEAR</button>
						</div> :
						null
					}
				</div>
				<div className="my-selections__list">
					{ this.renderMySelections() }
				</div>
				<div className="my-selections__total-section">
					<div className="my-selections__total">TOTAL AMOUNT</div>
					<div className="my-selections__total-price">
						{ this.calculatePrice() }
					</div>
				</div>
			</div>
		);
	}
}

export default MySelections;