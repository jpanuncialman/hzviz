import React, { Component } from 'react';
import SelectorCheckItem from './SelectorCheckItem';
import data from '../../data/data.json';

import './SelectorChecklist.scss';

class SelectorChecklist extends Component {
	renderChecklistItems = () => {
		let checklist = data.data;
		let checklistRender = checklist.map(category => {
			return (
				<SelectorCheckItem
					key={ "item-" + category.ind }
					ind={ category.ind }
					title={ category.category }
					sizes={ category.sizes }
					products={ category.products }
					syncProductInfoForParent={ this.props.syncProductInfoForParent }
					allowMult={ category.allowMult ? category.allowMult : false}
					maxSelectable={ category.maxSelectable ? category.maxSelectable : 1 }
				/>
			);
		});

		return checklistRender;
	}

	render() {
		return (
			<div className="selector-checklist">
				{ this.renderChecklistItems() }
			</div>
		);
	}
}

export default SelectorChecklist;