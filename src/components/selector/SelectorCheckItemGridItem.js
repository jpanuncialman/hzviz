import React, { Component } from 'react';
import * as util from '../../utils/util';


class SelectorCheckItemGridItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: false,
			selectedItems: props.selectedItems,
			hide: props.notSelected
		}
	}

	componentDidMount() {
		if (this.state.selectedItems.indexOf(this.props.product) > -1) {
			this.setState({ selected: true });
		}
	}


	componentDidUpdate(prevProps, prevState) {
		if ((this.state.selected && this.props.selectedItems.indexOf(this.props.product) < 0 )) {
			this.setState({ selected: false }, () => {
				// this.props.syncProductForCategory(this.props.product);
			});
		}

		if (prevProps.notSelected !== this.props.notSelected) {
			this.setState({ hide: this.props.notSelected });
		}

		// if (this.props.items === this.state.selectedItems[this.state.selectedItems.indexOf(this.props.item)]) {
		// 	this.setState({ selected: true });
		// } else {
		// 	this.setState({ selected: false });
		// }
		// if (prevProps.selectedItems !== this.props.selectedItems) {
		// 	console.log(prevProps.selectedItems);
		// 	console.log(this.props.selectedItems);
		// 	this.setState({ selected: this.state.selectedItems.indexOf(this.props.item) > -1 });
		// }
		// this.setState({ selectedItems: this.props.selectedItems }, () => {
		// 			console.log(this.props.selectedItems);
		// 	console.log(this.state.selectedItems);
		// 	if (this.state.selectedItems.indexOf(this.props.item) > -1) this.setState({ selected: true });
		// 	else this.setState({ selected: false });
		// });
		// console.log(this.props.item + " - " + this.props.selectedItems.includes(this.props.item));
		// this.setState({ selected: this.props.selectedItems.includes(this.props.item) });
		if (prevProps.selectedItems !== this.props.selectedItems) {

			//OLD CODE
			// if (prevProps.currentItem === this.props.item && this.props.currentItem !== this.props.item) {
				
			// }			
		} else {

		}
	}

	//Ensures only one grid item updates when changing the parent array of selected items
	shouldComponentUpdate(nextProps, nextState) {
		return (
			(this.state.selected && this.state.selectedItems.indexOf(this.props.product) >= 0) ||
			(!this.state.selected && this.state.selectedItems.indexOf(this.props.product) > -1) ||
			(this.state.selected && this.state.selectedItems.indexOf(this.props.product) < 0) ||
			(this.props.categorySelected !== nextProps.categorySelected) ||
			(this.props.sizeSelected !== nextProps.sizeSelected) ||
			(this.props.notSelected !== nextProps.notSelected)
		);
	}


	handleClick = () => {
		let product = this.props.product;
		let selectedItems = this.state.selectedItems;
		this.props.syncItem(product, () => {
			let productForParent = !this.state.selected ? product : ''; 
			this.props.syncProductForCategory(product);
			// this.props.syncProductInfoForParent(util.camelize(this.props.category), "products", selectedItems, !this.state.selected);

			if (this.props.selectedItems.includes(this.props.product)) this.setState({ selected: true });
			else this.setState({ selected: false });

		});

	}

	render() {
		return (
			<div style={this.state.notSelected ? {"display": "none"} : null} className={ this.state.selected ? "selector-checklist-item-grid-item__selected" : "selector-checklist-item-grid-item" } onClick={ this.handleClick }>
				<div className="selector-checklist-item-grid-item__tooltip">
					{ this.props.product.shortname ? this.props.product.shortname : this.props.product.parentTitle }
				</div>
				<img alt={ this.props.product.name } className="selector-checklist-item-grid-item__image" src={ this.props.product.image.thumbnailImg } />
				<div className={ this.state.selected ? "selector-checklist-item-grid-item__check-circle__selected" : "selector-checklist-item-grid-item__check-circle" } />
			</div>
		);
	}
}

export default SelectorCheckItemGridItem;