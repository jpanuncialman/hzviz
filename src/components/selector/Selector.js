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
						<h2 className="selector__header-header">Make your bed.</h2>
						<div className="selector__subtitle">
							Designing your bed just got easier. Mix and match the pieces until you find your perfect style.
						</div>
					</div>
				</Responsive>
				<div className="selector__checklist-section">
					<SelectorChecklist 
						{ ...this.props }
						syncProductInfoForParent={ this.props.syncProductInfoForParent }
						products={ this.props.products }
						comforterSelected={ this.props.comforterSelected }
					/>
				</div>
		</div>
		);
	}
}

export default Selector;