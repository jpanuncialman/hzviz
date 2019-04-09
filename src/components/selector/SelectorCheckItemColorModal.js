import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import SelectorCheckItemColorModalItem from './SelectorCheckItemColorModalItem';
import * as util from '../../utils/util';

import './SelectorCheckItemColorModal.scss';

const modalClassNames = {
  overlay: 'selector-checklist-modal__overlay',
  modal: 'selector-checklist-modal selector-checklist-modal__modal',
  closeButton: 'selector-checklist-modal__close-button',
  closeIcon: 'selector-checklist-modal__close-icon'
}


class SelectorCheckItemColorModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedColor: "",
			showModal: props.showModal,
			selectedProduct: props.selectedProduct
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.showModal !== this.props.showModal) {
			this.setState({ showModal: this.props.showModal });
		}

		if (prevProps.selectedProduct !== this.props.selectedProduct) {
			this.setState({ selectedProduct: this.props.selectedProduct })
		}

	}
 
	renderGrid = () => {
		let colorGrid = (this.state.selectedProduct.colors && this.state.selectedProduct.colors.length > 0)  ?
		this.state.selectedProduct.colors.map((color, ind) => {
				return(
					<SelectorCheckItemColorModalItem
						categorySelected={ this.props.categorySelected }
						key={"color" + ind }
						// item={ this.props.category.toLowerCase().replace(" ", "-") + "-color-grid-" + ind }
						color={ color }
						syncColor={ this.syncColor }
						currentColor={ this.state.selectedColor }
						category={ this.props.category }
						syncProductInfoForParent={ this.props.syncProductInfoForParent }
						handleCloseModal={ this.handleCloseModal }
					/>
				)

		}) :
		null;
		return colorGrid;
	}

	syncColor = (color) => {
		this.setState({ selectedColor: color });
	}

	handleCloseModal = () => {
		this.setState({ showModal: false }, () => {
			this.props.handleShowModal();
		});
	}

	handleSelectColor = (e) => {
		e.preventDefault();
		this.props.syncProductInfoForParent(util.camelize(this.props.category), "color", this.state.selectedColor, true);
		this.handleCloseModal();
	}

	render() {
		return (
			<Modal open={ this.state.showModal } onClose={ this.handleCloseModal } classNames={ modalClassNames } center >
			<div className="selector-checklist-modal__header">
				<h3 className="selector-checklist-modal__header-header">Pick a color</h3>
				<div className="selector-checklist-modal__header-product">{ this.state.selectedProduct.name }</div>
			</div>
			<div className="selector-checklist-modal__body">
				{
					<div className="selector-checklist-modal__grid">
						<div className="selector-checklist-modal__grid-items">
							{ 
								this.renderGrid()
							}
						</div>
					</div>
				}
				<button className="selector-checklist-modal__button" onClick={ this.handleSelectColor }>Select</button>
			</div>
			</Modal>
		);
	}
}

export default SelectorCheckItemColorModal;