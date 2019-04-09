import React, { PureComponent } from 'react';
import * as util from '../../utils/util';

class SelectorCheckItemBox extends PureComponent {
	constructor() {
		super();

		this.state = {
			selected: false
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentSize !== this.props.currentSize) {
			if (this.state.selected && this.props.currentSize !== this.props.size.replace(" ", "").replace("/", "-")) {
				this.setState({ selected: false });
			}			
		} else {
			if (this.state.selected && (prevProps.categorySelected !== this.props.categorySelected)) {
				this.setState({ selected: false }, () => {
					this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", "", false);
				});
			}
		}
	}

	handleClick = () => {
		let size = this.props.size.replace("-", " ").replace("twin xl", "twin-xl");
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
			<button className={ this.state.selected ? "selector-checklist-item-box selector-checklist-item-box__selected" : "selector-checklist-item-box" } onClick={ this.handleClick }>
				{ this.props.size.replace("-", " ") }
			</button>
		);
	}
}

export default SelectorCheckItemBox;