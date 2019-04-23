import React, { Component } from 'react';
import SelectorCheckItemGridItem from './SelectorCheckItemGridItem';
import * as util from '../../utils/util';
import './SelectorCheckItemGridItem.scss';

class SelectorCheckItemGridSelector extends Component {
	constructor() {
		super();

		this.state = {
			selectedItem: "",
			selectedItems: []
		}
	}

	// componentDidUpdate(prevProps) {
	// 	//Clear selections when deselecting category or deselecting size
	// 	//Note: we don't need to clear out the selections when switching to a new size that the selected product is in since the item will be replaced when selecting a new one.
	// 	if (((prevProps.categorySelected !== this.props.categorySelected) && !this.props.categorySelected) || ((prevProps.sizeSelected !== this.props.sizeSelected && this.props.sizeSelected === ''))) {
	// 		this.setState({ selectedItems: [], selectedItem: '' });
	// 	}
	// }
 	
 	componentDidUpdate(prevProps) {
 		if (prevProps.categoryObj && this.props.categoryObj) {
 			if (this.props.categoryObj.products && ((prevProps.categoryObj.products !== this.props.categoryObj.products) && this.props.categoryObj.products.length < 1)) {
 				console.log("Empty category obj array");
 				this.setState({ selectedItems: this.props.categoryObj.products });
 			}
 		}
		// if (this.props.categoryObj && ((prevProps.categoryObj.products !== this.props.categoryObj.products) && ((this.props.categoryObj.products.length === 0)))) {
		// 	this.setState({ selectedItems: [] });
		// }
	}


	renderGrid = () => {
		return this.props.products.map((product, ind) => {
			const hasSize = this.props.sizeSelected === "" || product.selectedOptions[0].value === this.props.sizeSelected.replace("twin xl", "twin-xl");
			// const hasColor = product.selectedOptions[0].value === this.props.colorSelected;

			if (hasSize)  {
				return(
					<SelectorCheckItemGridItem
						categorySelected={ this.props.categorySelected }
						sizeSelected={ this.props.sizeSelected }
						key={ this.props.category.toLowerCase().replace(" ", "-") + "-grid-" + ind }
						item={ this.props.category.toLowerCase().replace(" ", "-") + "-grid-" + ind }
						product={ product }
						syncItem={ this.syncItem }
						currentItem={ this.state.selectedItem }
						category={ this.props.category }
						syncProductInfoForParent={ this.props.syncProductInfoForParent }
						syncProductForCategory={ this.props.syncProductForCategory }
						handleShowModal={ this.props.handleShowModal }
						selectedItems={ this.state.selectedItems }
						notSelected={ !hasSize }
						// modalVisible={ this.props.modalVisible }
					/>
				)
			} else {
				return null;
			}
		})
	}

	//Updating the array of selected products
	syncItem = (item, callback) => {
		let selectedItems = this.state.selectedItems;
		const limit = this.props.category.includes('decorative') ? 3 : 1;
		if (!(selectedItems.includes(item))) {
			if (selectedItems.length < limit) {
				selectedItems.push(item);
			}	else {
				selectedItems.splice(0,1);
				selectedItems.push(item);
			}
			
		} else {
			let ind = selectedItems.indexOf(item);
			selectedItems.splice(ind, 1);
		}

		this.setState({ selectedItems: selectedItems }, () => {
			callback();
			this.props.syncProductInfoForParent(util.camelize(this.props.category), "products", this.state.selectedItems, this.state.selectedItems.length > 0, item);
		});

	}

	render() {
		return (
			<div className="selector-checklist-grid-selector">
				<div className="selector-checklist-grid-selector__items">
					{ this.renderGrid() }
				</div>
			</div>
		);
	}
}

export default SelectorCheckItemGridSelector;