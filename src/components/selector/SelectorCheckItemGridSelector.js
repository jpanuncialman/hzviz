import React, { Component } from 'react';
import SelectorCheckItemGridItem from './SelectorCheckItemGridItem';

import './SelectorCheckItemGridItem.scss';

class SelectorCheckItemGridSelector extends Component {
	constructor() {
		super();

		this.state = {
			selectedItem: "",
			selectedItems: []
		}
	}

	componentDidUpdate(prevProps) {
		//Clear selections when deselecting category or deselecting size
		//Note: we don't need to clear out the selections when switching to a new size that the selected product is in since the item will be replaced when selecting a new one.
		if (((prevProps.categorySelected !== this.props.categorySelected) && !this.props.categorySelected) || ((prevProps.sizeSelected !== this.props.sizeSelected && this.props.sizeSelected === ''))) {
			this.setState({ selectedItems: [], selectedItem: '' });
		}
	}
 
	renderGrid = () => {
		return this.props.products.map((product, ind) => {
			const hasSize = Object.keys(product.prices).includes(this.props.sizeSelected.replace("twin xl", "twin-xl"));

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
		console.log(item);
		if (!(selectedItems.includes(item))) {
			if (selectedItems.length < this.props.maxSelectable) {
				selectedItems.push(item);
			}	else {
				selectedItems.splice(0,1);
				selectedItems.push(item);
			}
			
		} else {
			let ind = selectedItems.indexOf(item);
			selectedItems.splice(ind, 1);
		}

		console.log(selectedItems);	
		this.setState({ selectedItems: selectedItems }, callback);
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