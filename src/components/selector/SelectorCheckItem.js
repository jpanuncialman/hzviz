import React, { Component } from 'react';
import { isMobile } from '../../utils/util';
import SelectorCheckItemBoxSelector from './SelectorCheckItemBoxSelector';
import SelectorCheckItemGridSelector from './SelectorCheckItemGridSelector';
import SelectorCheckItemColorSelector from './SelectorCheckItemColorSelector';
import SelectorCheckItemColorModal from './SelectorCheckItemColorModal';

import './SelectorCheckItem.scss';

class SelectorCheckItem extends Component {
	constructor() {
		super();

		this.state = {
			price: 0,
			selected: false,
			selectedSize: '',
			showModal: false,
			selectedProduct: {},
			selectedItems: []		
		}
	}

	componentDidMount() {
		console.log(this.props.title + " " + this.props.title.includes("Pillows"));
		// products.map((product) => {
		// 	return Object.keys(product.colors);
		// })
	}

	handleSelect = () => {
		if (this.state.selected) this.setState({ selectedSize: "" });
		this.setState({ selected: !this.state.selected });
	}

	syncSizeInfoForCategory = (size) => {
		this.setState({ selectedSize: size });
	}

	syncProductForCategory = (item) => {
		let selectedItems = this.state.selectedItems;
		

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
		this.setState({ selectedItems: selectedItems });
	}

	handleShowModal = () => {
		console.log("Show modal");
		this.setState({ showModal: !this.state.showModal });
	}
	
	render() {
		return (
			<div className="selector-checklist-item">
				<div className="selector-checklist-item__header" onClick={ this.handleSelect } >
					<div className="selector-checklist-item__check-title">
						<input className={ !isMobile(navigator.userAgent) ? "selector-checklist-item__checkbox hover-styles" : "selector-checklist-item__checkbox" } type="checkbox" checked={ this.state.selected } />
						<span className="selector-checklist-item__check" ></span>
						<h4 className="selector-checklist-item__title" >{ this.props.title }</h4>
					</div>
					<div className={  this.state.selected ? "selector-checklist-item__expand-button expanded" : "selector-checklist-item__expand-button" } />
					<div className={ this.state.selected ? "selector-checklist-item__plus-minus expanded"  : "selector-checklist-item__plus-minus" } >
					</div>
				</div>
				<div className={ this.state.selected ? "selector-checklist-item__body expanded" : "selector-checklist-item__body" }>
					<div className="checklist-item__sizes-container">
						<SelectorCheckItemBoxSelector
							categorySelected={ this.state.selected }
							category={ this.props.title }
							products={ this.props.products }
							syncProductInfoForParent={ this.props.syncProductInfoForParent }
							syncSizeInfoForCategory={ this.syncSizeInfoForCategory }
						/>
					</div>
					{
						// products.map((product) => {
						// 	return Object.keys(product.colors);
						// })
						<div className="checklist-item__color-container">

							<SelectorCheckItemColorSelector
								categorySelected={ this.state.selected }
								category={ this.props.title }
								products={ this.props.products }
								syncProductInfoForParent={ this.props.syncProductInfoForParent }
								syncSizeInfoForCategory={ this.syncSizeInfoForCategory }
							/>
						</div>
					}
					<div className={ (this.state.selected && this.props.title.includes("Pillows")) || (this.state.selected && this.state.selectedSize !== '') ? "checklist-item__grid-selector-container" : "checklist-item__grid-selector-container checklist-item__grid-selector-container__hidden" }>
						<SelectorCheckItemGridSelector
							categorySelected={ this.state.selected }
							sizeSelected={ this.state.selectedSize }
							productSelected={ this.state.selectedProduct }
							category={ this.props.title }
							products={ this.props.products }
							syncProductInfoForParent={ this.props.syncProductInfoForParent }
							syncProductForCategory={ this.syncProductForCategory }
							handleShowModal={ this.handleShowModal }
							modalVisible={ this.state.modalVisible }
							allowMult={ this.props.allowMult }
							maxSelectable={ this.props.maxSelectable }
						/>
				
						{/*<SelectorCheckItemColorModal
							// colors={ this.props.products.colors && this.props.products.colors.length > 0 ? this.props.products.colors : []  }
							categorySelected={ this.state.selected }
							sizeSelected={ this.state.selectedSize }
							productSelected={ this.state.selectedProduct }
							category={ this.props.title }
							products={ this.props.products }
							syncProductForCategory={ this.syncProductForCategory }
							syncProductInfoForParent={ this.props.syncProductInfoForParent }
							showModal={ this.state.showModal }
							handleShowModal={ this.handleShowModal }
							selectedProduct={ this.state.selectedProduct }
						/>*/}
							
						
					</div>
				</div>
			</div>
		);
	}
}

export default SelectorCheckItem;