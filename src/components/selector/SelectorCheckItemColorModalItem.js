import React, { PureComponent } from 'react';
import * as util from '../../utils/util';

import './SelectorCheckItemColorModalItem.scss';

class SelectorCheckItemColorModalItem extends PureComponent {
	constructor() {
		super();

		this.state = {
			selected: false
		}
	}


	componentDidUpdate(prevProps, prevState) {
		if (prevProps.currentColor !== this.props.currentColor) {
			if (prevProps.currentColor === this.props.color.color && this.props.currentColor !== this.props.color.color) {
				this.setState({ selected: false });
			}			
		} else {
			if (this.state.selected && ((prevProps.categorySelected !== this.props.categorySelected) || (prevProps.sizeSelected !== this.props.sizeSelected))) {
				this.setState({ selected: false }, () => {
					this.props.syncProductInfoForParent(util.camelize(this.props.category), "product", "", false);
				});
			}
		}
	}

	componentWillUnmount() {
		this.setState({ selected: false });
	}

	handleClick = () => {
		this.setState({ selected: !this.state.selected }, () => {
			let color = !this.state.selected ? {} : this.props.color.color;
			this.props.syncColor(color); 
		});
	}

	render() {
		return (
			<div className={ this.state.selected ? "selector-checklist-item-modal-color selector-checklist-item-modal-color__selected" : "selector-checklist-item-modal-color" } onClick={ this.handleClick }>
				<img alt={ this.props.color.color } className="selector-checklist-item-modal-color__image" src={ this.props.color.image } />
				<div className={ this.state.selected ? "selector-checklist-item-modal-color__check-circle__selected" : "selector-checklist-item-modal-color__check-circle" } />
				{/*<div className="selector-checklist-item-modal-color__color">{ this.props.color.color }</div>*/}
			</div>
		);
	}
}

export default SelectorCheckItemColorModalItem;