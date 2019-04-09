import React, { Component } from 'react';
import SelectorChecklist from './SelectorChecklist';
import Responsive from 'react-responsive';

import './Selector.scss';

class Selector extends Component {
	render() {
		return (
			<div className="selector">
				<Responsive minWidth={ 813 }>
					<div className="selector__header">
						<h2 className="selector__header-header">Build your own bed.</h2>
						<div className="selector__subtitle">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</div>
					</div>
				</Responsive>
				<div className="selector__checklist-section">
					<SelectorChecklist 
						syncProductInfoForParent={ this.props.syncProductInfoForParent }
					/>
				</div>
		</div>
		);
	}
}

export default Selector;