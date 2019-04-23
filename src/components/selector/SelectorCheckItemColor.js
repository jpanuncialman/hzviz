import React, { PureComponent } from 'react';
import { getColorHex } from '../../utils/colors';
import * as util from '../../utils/util';

class SelectorCheckItemColor extends PureComponent {
	constructor() {
		super();

		this.state = {
			selected: false
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentColor !== this.props.currentColor) {
			if (this.state.selected && this.props.currentColor !== this.props.color.replace(" ", "").replace("/", "-")) {
				this.setState({ selected: false });
			}			
		} else {
			// if (this.state.selected && (prevProps.categorySelected !== this.props.categorySelected)) {
			// 	this.setState({ selected: false }, () => {
			// 		// this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", "", false);
			// 	});
			// }
		}
	}

	handleClick = () => {
		let color = this.props.color.replace("-", " ").replace("twin xl", "twin-xl");
		// let sizeFormat = this.props.size.replace(" ", "").replace("/", "-")
		if (this.state.selected) {
			this.setState({ selected: false }, () => {
				this.props.syncColor('');
				this.props.syncOptionForCategory('');
				// this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", "", false);
			});
		} else {
			this.setState({ selected: true }, () => {
				this.props.syncColor(color);
				this.props.syncOptionForCategory(color); 
				// this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", size, false);
			});
		}
	}

	render() {
		return (
			<button style={{ background: getColorHex(this.props.color.toLowerCase()) }} className={ this.state.selected ? "selector-checklist-color selector-checklist-color__selected" : "selector-checklist-color" } onClick={ this.handleClick }>
				{  }
			</button>
		);
	}
}

export default SelectorCheckItemColor;