import React, { PureComponent } from 'react';
import * as util from '../../utils/util';

class SelectorCheckItemBox extends PureComponent {
	constructor() {
		super();

		this.state = {
			selected: false
		}
	}

	componentDidMount() {
		if ((this.props.currentSize === '') && this.props.ind === 0) {
			this.handleClick();
			// this.setState({ selected: true }, () => {
			// 	let size = this.props.size.replace("-", " ").replace("twin xl", "twin-xl");
			// 	let sizeFormat = this.props.size.replace(" ", "").replace("/", "-")
			// 	this.props.syncSize(sizeFormat);
			// 	this.props.syncOptionForCategory(size); 
			// });
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

	shouldComponentUpdate(nextProps, nextState) {
		return(
			// (this.state.selected !== nextState.selected) ||
			(this.props.currentSize !== nextProps.currentSize) ||
			(this.props.categorySelected !== nextProps.categorySelected) ||
			(this.state.selected && this.props.currentSize !== this.props.size.replace(" ", "").replace("/", "-")) ||
			(this.state.selected && (nextProps.categorySelected !== this.props.categorySelected))
		);
	}

	handleClick = () => {
		let size = this.props.size.replace("-", " ").replace("twin xl", "twin-xl");
		let sizeFormat = this.props.size.replace(" ", "").replace("/", "-")
		if (this.state.selected) {
			this.setState({ selected: false }, () => {
				this.props.syncSize('');
				this.props.syncOptionForCategory('');
				// this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", "", false);
			});
		} else {
			this.setState({ selected: true }, () => {
				this.props.syncSize(sizeFormat);
				this.props.syncOptionForCategory(size); 
				// this.props.syncProductInfoForParent(util.camelize(this.props.category), "size", size, false);
			});
		}
	}

	render() {
		return (
			<div className="selector-checklist-item-box__container">
				<button className={ this.state.selected ? "selector-checklist-item-box selector-checklist-item-box__selected" : "selector-checklist-item-box" } onClick={ this.handleClick }>
					{ this.props.size.replace("-", " ") }
				</button>
				<div className="selector-checklist-item-box__subtext">
					{ this.props.size.includes("Twin") ? "(incl. 1 sham)" : "(incl. 2 shams)" }
				</div>
			</div>
		);
	}
}

export default SelectorCheckItemBox;