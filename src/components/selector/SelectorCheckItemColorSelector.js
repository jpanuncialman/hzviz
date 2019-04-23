import React, { Component } from 'react';
import SelectorCheckItemColor from './SelectorCheckItemColor';

import './SelectorCheckItemColorSelector.scss';

class SelectorCheckItemColorSelector extends Component {
	constructor() {
		super();

		this.state = {
			selectedSize: '',
			sizes: [],
			colors: [],
			selectedColor: ''
		}

	}

	// componentDidMount() {
	// 	this.renderSizes();
	// }

	renderColors = () => {
		let allSizes = [];
		let products = this.props.products;
		let colorsArr = [];
		// products.map((product) => {
		// 	return (

		// 	);
		// });


		return this.props.options.map((color, ind) => {
			return(
				<SelectorCheckItemColor
					categorySelected={ this.props.categorySelected }
					key={ this.props.category.toLowerCase().replace(" ", "-") + "-color-" + ind } 
					color={ color }
					currentSize={ this.state.selectedSize }
					currentColor={ this.state.selectedColor }
					syncColor={ this.syncColor }
					category={ this.props.category }
					syncProductInfoForParent={ this.props.syncProductInfoForParent }
					syncOptionForCategory={ this.props.syncOptionForCategory }
				/>
			);
		})

		// this.setState({ colors: colors });
	}

	syncColor = (size) => {
		this.setState({ selectedColor: size });
	}


	render() {
		return (
			<div className="selector-checklist-color-selector">
				<div className="selector-checklist-color-selector__header">
					Filter Color
				</div>
				<div className="selector-checklist-color-selector__colors">
					{ this.renderColors() }
				</div>
			</div>
		);
	}
}

export default SelectorCheckItemColorSelector;