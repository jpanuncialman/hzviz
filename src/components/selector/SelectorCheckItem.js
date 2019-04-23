import React, { Component } from 'react';
import { isMobile } from '../../utils/util';
import SelectorCheckItemBoxSelector from './SelectorCheckItemBoxSelector';
import SelectorCheckItemGridSelector from './SelectorCheckItemGridSelector';
import SelectorCheckItemColorSelector from './SelectorCheckItemColorSelector';
import SelectorCheckItemColorModal from './SelectorCheckItemColorModal';
import { capitalize } from '../../utils/util';

import './SelectorCheckItem.scss';

class SelectorCheckItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			price: 0,
			selected: false,
			selectedOption: '',
			selectedColor: '',
			showModal: false,
			selectedProduct: {},
			selectedItems: [],
			options: [],
			comforterSelected: props.comforterSelected		
		}
	}

	componentDidMount() {
		// products.map((product) => {
		// 	return Object.keys(product.colors);
		// })
		this.renderOptions();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.options !== this.props.options) this.setState({ options: this.props.options });
		if (prevProps.comforterSelected !== this.props.comforterSelected) this.setState({ comforterSelected: this.props.comforterSelected });
	}

	handleClick = () => {
		if (this.props.title.includes("comforter") || (this.state.comforterSelected)) this.handleSelect();
		else this.props.showComforterTooltip();
	}

	handleSelect = () => {
		if (this.state.selected) this.setState({ selectedSize: "" });
		this.setState({ selected: !this.state.selected });
	}

	renderOptions = () => {
		let options = [];
		this.props.products.forEach(product => {
			let option = product.selectedOptions[0].value;
			if (!options.includes(option)) options.push(option);
		});
		options.sort((a,b) => {
			if (a.includes("Twin")) return -3;
			else if (a.includes("Full")) return -2;
			else if (a.includes("Queen")) return 1;
			else return 2;
		});
		this.setState({ options: options });
	}

	syncOptionForCategory = (option) => {
		this.setState({ selectedOption: option });
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
		this.setState({ showModal: !this.state.showModal });
	}
	
	render() {
		return (
			<div className="selector-checklist-item">
				<div className="selector-checklist-item__header" onClick={ this.handleClick } >
					<div className="selector-checklist-item__check-title">
						<input className={ !isMobile(navigator.userAgent) ? "selector-checklist-item__checkbox hover-styles" : "selector-checklist-item__checkbox" } type="checkbox" checked={ this.state.selected } />
						<span className="selector-checklist-item__check" ></span>
						<h4 className={ this.state.selected ? "selector-checklist-item__title" : "selector-checklist-item__title selector-checklist-item__title__not-selected" } >{ this.props.displayText }</h4>
					</div>
					<div className={  this.state.selected ? "selector-checklist-item__expand-button expanded" : "selector-checklist-item__expand-button" } />
					<div className={ this.state.selected ? "selector-checklist-item__plus-minus expanded"  : "selector-checklist-item__plus-minus" } >
					</div>
				</div>
				<div className={ this.state.selected ? "selector-checklist-item__body expanded" : "selector-checklist-item__body" }>
					<div className="selector-checklist-item__subtext">
						{ this.props.subText && this.props.subText.length > 0 ? <p>{this.props.subText}</p> : null }
					</div>
				{
					this.props.sortFactor !== "color" ?
					<div className="checklist-item__sizes-container">
						<SelectorCheckItemBoxSelector
							categoryObj={ this.props.categoryObj }
							categorySelected={ this.state.selected }
							category={ this.props.title }
							products={ this.props.products }
							options={ this.state.options }
							syncProductInfoForParent={ this.props.syncProductInfoForParent }
							syncOptionForCategory={ this.syncOptionForCategory }
						/>
					</div>
					:
					<div className="checklist-item__color-container">
							<SelectorCheckItemColorSelector
								categoryObj={ this.props.categoryObj }
								categorySelected={ this.state.selected }
								category={ this.props.title }
								products={ this.props.products }
								options={ this.state.options }
								syncProductInfoForParent={ this.props.syncProductInfoForParent }
								syncOptionForCategory={ this.syncOptionForCategory }
							/>
						</div>
				}
										{
						// products.map((product) => {
						// 	return Object.keys(product.colors);
						// })
						
					// */
				}
					<div className={/* (this.state.selected && this.props.title.includes("Pillows")) || (this.state.selected && this.state.selectedSize !== '') */ this.state.selected ? "checklist-item__grid-selector-container" : "checklist-item__grid-selector-container checklist-item__grid-selector-container__hidden" }>
						<SelectorCheckItemGridSelector
							categoryObj={ this.props.categoryObj }
							categorySelected={ this.state.selected }
							sizeSelected={ this.state.selectedOption }
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