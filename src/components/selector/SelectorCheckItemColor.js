import React, { PureComponent } from 'react';
import * as util from '../../utils/util';

class SelectorCheckItemColor extends PureComponent {
	constructor() {
		super();

		this.state = {
			selected: false
		}
	}

	// componentDidUpdate(prevProps) {
	// 	if (prevProps.currentSize !== this.props.currentSize) {
	// 		if (this.state.selected && this.props.currentSize !== this.props.size.replace(" ", "").replace("/", "-")) {
	// 			this.setState({ selected: false });
	// 		}			
	// 	} else {
	// 		if (this.state.selected && (prevProps.categorySelected !== this.props.categorySelected)) {
	// 			this.setState({ selected: false }, () => {
	// 				this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", "", false);
	// 			});
	// 		}
	// 	}
	// }

	handleClick = () => {
		let size = this.props.color.replace("-", " ").replace("twin xl", "twin-xl");
		let sizeFormat = this.props.size.replace(" ", "").replace("/", "-")
		if (this.state.selected) {
			this.setState({ selected: false }, () => {
				this.props.syncSize('');
				this.props.syncSizeInfoForCategory('');
				this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", "", false);
			});
		} else {
			this.setState({ selected: true }, () => {
				this.props.syncSize(sizeFormat);
				this.props.syncSizeInfoForCategory(size); 
				this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", size, false);
			});
		}
	}

	render() {
		return (
			<button style={{ background: this.props.color }} className={ this.state.selected ? "selector-checklist-color selector-checklist-color__selected" : "selector-checklist-color" } onClick={ this.handleClick }>
				{  }
			</button>
		);
	}
}

export default SelectorCheckItemColor;