import React, { Component } from 'react';
import SelectorCheckItemBox from './SelectorCheckItemBox';

import './SelectorCheckItemBoxSelector.scss';

class SelectorCheckItemBoxSelector extends Component {
	constructor() {
		super();

		this.state = {
			selectedSize: '',
			sizes: []
		}

	}

	componentDidMount() {
		this.renderSizes();
	}

	renderSizes = () => {
		let allSizes = [];
		let products = this.props.products;

		let productSizes = products.map((product) => {
			return Object.keys(product.prices);
		});

		productSizes.forEach(sizes => {
			allSizes = allSizes.concat(sizes);
		});

		let allSizesRender = new Set(allSizes);
		// console.log(productSizes);
		// console.log(allSizesRender);



		let sizes = [...allSizesRender].filter(size => size !== undefined).map((size, ind) => {
			return(
				<SelectorCheckItemBox
					categorySelected={ this.props.categorySelected }
					key={ this.props.category.toLowerCase().replace(" ", "-") + "-size-" + ind } 
					size={ size }
					currentSize={ this.state.selectedSize }
					syncSize={ this.syncSize }
					category={ this.props.category }
					syncProductInfoForParent={ this.props.syncProductInfoForParent }
					syncSizeInfoForCategory={ this.props.syncSizeInfoForCategory }
				/>
			);
		})

		console.log([...allSizesRender].filter(size => size !== undefined).every((size) => {
					return size === "one size";
				}));
		this.setState({ sizes: sizes });

		if ([...allSizesRender].filter(size => size !== undefined).every((size) => {
					return size === "one size";
				})) {
					console.log("Meow!")
					this.syncSize("one size");
					this.props.syncSizeInfoForCategory("one size");
				}
	}

	syncSize = (size) => {
		this.setState({ selectedSize: size });
	}


	render() {
		return (
			<div className="selector-checklist-size-selector">
				<div className="selector-checklist-size-selector__sizes">
					{ this.state.selectedSize !== "one size" ? this.state.sizes : null }
				</div>
			</div>
		);
	}
}

export default SelectorCheckItemBoxSelector;