import React, { Component } from 'react';
import SelectorCheckItem from './SelectorCheckItem';
import data from '../../data/data.json';
import dataForChecklist from '../../data/dataForChecklist.json';
import * as util from '../../utils/util';

import './SelectorChecklist.scss';

class SelectorChecklist extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: props.products,
			showTooltip: false
		}
	}
	componentWillMount() {
		document.addEventListener('mousedown', this.hideTooltip, false);
	}
	
	componentDidMount() {
		this.renderChecklistItems();
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.hideTooltip, false);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.products !== this.props.products) {
			this.setState({ products: this.props.products });
		}
	}
	renderChecklistItems = () => {
		let categories = [];
		let products = this.state.products;
		products.forEach(product => {
			if (!categories.includes(product.category)) categories.push(product.category);
		});

		//Sort products by category
		let checklist = categories.map(category => {
			let productsArr = products.filter(product => product.category === category);
			let sortFactor = productsArr[0].selectedOptions[0].name;
			return (
			{
				category: category,
				products: productsArr,
				sortFactor: sortFactor
			}
			);
		})
		console.log(checklist);
		//Render checklist items
		let checklistRender = checklist
		.sort((a,b) => {
			let factorA = dataForChecklist[a.category.replace("/", "").replace(" ", "")] ? parseInt(dataForChecklist[a.category.replace("/", "").replace(" ", "")].ind)  : 7;
			let factorB = dataForChecklist[b.category.replace("/", "").replace(" ", "")] ? parseInt(dataForChecklist[b.category.replace("/", "").replace(" ", "")].ind)  : 7;
			console.log(factorA);
			console.log(factorB);

			if (factorA < factorB) {
				return -1;
			} else if (factorA > factorB) {
				return 1;
			} else {
				return 0;
			}

		})
		.map(category => {
			return (
				<SelectorCheckItem
					categoryObj={ this.props[util.camelize(category.category)] }
					title={ category.category }
					displayText={ dataForChecklist[category.category.replace("/", "").replace(" ", "")] ? dataForChecklist[category.category.replace("/", "").replace(" ", "")].displayText : category.category && category.category.length > 0 ? category.category : ""}
					subText={ dataForChecklist[category.category.replace("/", "").replace(" ", "")] ? dataForChecklist[category.category.replace("/", "").replace(" ", "")].subText : "" }
					products={ category.products }
					sortFactor={ category.sortFactor }
					syncProductInfoForParent={ this.props.syncProductInfoForParent }
					comforterSelected={ this.props.comforterSelected }
					showComforterTooltip={ this.showComforterTooltip }
				/>
			);
		});

		return checklistRender;
	}

	showComforterTooltip = () => {
    this.setState({ showTooltip: true });
  }

  hideTooltip = (e) => {
    if (this.node.contains(e.target)) {
      this.setState({ showTooltip: false });
      return;
    }
    this.setState({ showTooltip: false });
  }

	render() {
		return (
			<div className="selector-checklist">
					<div className={ this.state.showTooltip ? "selector-checklist__tooltip-overlay" : "selector-checklist__tooltip-overlay selector-checklist__tooltip-overlay__hidden" }/>
					<div ref={node => this.node = node} className={ this.state.showTooltip ? "selector-checklist__tooltip" : "selector-checklist__tooltip selector-checklist__tooltip__hidden"}>
						Not so fast, choose your bed size!
					</div> 
				
				{ this.renderChecklistItems() }
			</div>
		);
	}
}

export default SelectorChecklist;