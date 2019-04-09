import React, { Component } from 'react';
import SelectorCheckItemColor from './SelectorCheckItemColor';

import './SelectorCheckItemColorSelector.scss';

class SelectorCheckItemColorSelector extends Component {
	constructor() {
		super();

		this.state = {
			selectedSize: '',
			sizes: [],
			colors: []
		}

	}

	componentDidMount() {
		this.renderSizes();
	}

	renderSizes = () => {
		let allSizes = [];
		let products = this.props.products;
		let colorsArr = [];
		products.forEach((product) => {
			if(product.colors && product.colors.length > 1) colorsArr = product.colors;
		});


		let colors = colorsArr.map((color, ind) => {
			return(
				<SelectorCheckItemColor
					categorySelected={ this.props.categorySelected }
					key={ this.props.category.toLowerCase().replace(" ", "-") + "-color-" + ind } 
					color={ color.hex }
					currentSize={ this.state.selectedSize }
					syncColor={ this.syncColor }
					category={ this.props.category }
					syncProductInfoForParent={ this.props.syncProductInfoForParent }
					syncSizeInfoForCategory={ this.props.syncSizeInfoForCategory }
				/>
			);
		})

		this.setState({ colors: colors });
	}

	syncColor = (size) => {
		this.setState({ selectedSize: size });
	}


	render() {
		return (
			<div className="selector-checklist-color-selector">
				<div className="selector-checklist-color-selector__colors">
					{ this.state.colors !== "one size" ? this.state.colors : null }
				</div>
			</div>
		);
	}
}

export default SelectorCheckItemColorSelector;