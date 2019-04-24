import React, { PureComponent } from 'react';
import { getColorHex } from '../../utils/colors';

class SelectorCheckItemColor extends PureComponent {
	constructor() {
		super();

		this.state = {
			selected: false
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentColor !== this.props.currentColor) {
			if (this.state.selected && this.props.currentColor !== this.props.color.replace(" ", "").replace("/", "-")) {
				this.setState({ selected: false });
			}			
		}
	}

	handleClick = () => {
		let color = this.props.color.replace("-", " ").replace("twin xl", "twin-xl");
		if (this.state.selected) {
			this.setState({ selected: false }, () => {
				this.props.syncColor('');
				this.props.syncOptionForCategory('');
			});
		} else {
			this.setState({ selected: true }, () => {
				this.props.syncColor(color);
				this.props.syncOptionForCategory(color); 
			});
		}
	}

	render() {
		return (
			<button style={{ background: getColorHex(this.props.color.toLowerCase()) }} className={ this.state.selected ? "selector-checklist-color selector-checklist-color__selected" : "selector-checklist-color" } onClick={ this.handleClick }>
			</button>
		);
	}
}

export default SelectorCheckItemColor;