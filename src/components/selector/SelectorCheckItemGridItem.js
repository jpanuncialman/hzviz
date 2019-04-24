import React, { Component } from 'react';

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
			});
		}

		if (prevProps.notSelected !== this.props.notSelected) {
			this.setState({ hide: this.props.notSelected });
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
		this.props.syncItem(product, () => {
			this.props.syncProductForCategory(product);

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