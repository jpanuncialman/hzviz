import React, { Component } from 'react';
import SelectorCheckItemBox from './SelectorCheckItemBox';

import './SelectorCheckItemBoxSelector.scss';

class SelectorCheckItemBoxSelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSize: '',
			sizes: [],
			options: props.options
		}

	}

	renderSizes = () => {
		return this.props.options.map((size, ind) => {
			return(
				<SelectorCheckItemBox
					categorySelected={ this.props.categorySelected }
					key={ this.props.category.toLowerCase().replace(" ", "-") + "-size-" + ind } 
					ind={ ind }
					size={ size }
					currentSize={ this.state.selectedSize }
					syncSize={ this.syncSize }
					category={ this.props.category }
					syncProductInfoForParent={ this.props.syncProductInfoForParent }
					syncOptionForCategory={ this.props.syncOptionForCategory }
				/>
			);
		});
	}

	syncSize = (size) => {
		this.setState({ selectedSize: size });
	}


	render() {
		return (
			<div className="selector-checklist-size-selector">
				<div className="selector-checklist-size-selector__sizes">
					{ this.renderSizes() }
				</div>
			</div>
		);
	}
}

export default SelectorCheckItemBoxSelector;