import React, { Component } from 'react';
import './MySelections.scss';

class MySelections extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props,
			mySelections: []
		};
	}

	componentDidMount() {
		this.renderState();
	}

	componentDidUpdate(prevProps, prevState) {

		Object.keys(this.props).forEach(prop => {
			if (prop.includes("Show")) {
				if (this.props[prop] !== prevProps[prop]) {
					this.setState({ [prop]: this.props[prop] });
				}
			}
		});

		// if (prevState.comforterDuvet !== this.state.comforterDuvet) {
		// 	console.log("Woof");
		// 	if (this.state.comforterDuvet.product !== '') {
		// 		let mySelections = this.state.mySelections;
		// 		mySelections.push(this.state.comforterDuvet.product);
		// 		this.setState({ mySelections: mySelections });
		// 	} else {
		// 		let mySelections = this.state.mySelections;
		// 		let ind = mySelections.indexOf(this.props.comforterDuvet);
		// 		mySelections.splice(this.state.comforterDuvet.product, ind);
		// 		this.setState({ mySelections: mySelections });
		// 	}
		// }
	}

	renderState = () => {
		let mySelections = this.props.mySelections;
		mySelections = Object.keys(this.props).filter(prop => {
			return !(prop.includes("Show") || prop.includes("Cart"));
		})
		this.setState({ mySelections: mySelections });
	}

	renderMySelections = () => {
		return this.state.mySelections.map(selection => {
			let selectionShow = selection + "Show";
			let sizeInd = '';
			let price = 0;
			if (this.state[selection].product) {
				Object.keys(this.state[selection].product.prices).forEach(size => {
					if (size.includes(this.state[selection].size)) sizeInd = size;
				});
				price = sizeInd !== '' ? this.state[selection].product.prices[sizeInd] : 0;
			}
			return(
				<div className={ this.state[selectionShow] ? "my-selections__list-item" : "my-selections__list-item my-selections__list-item__hidden" }>
					<div className="my-selections__list-item-name">
						{ this.state[selection].product.name }
					</div>
					<div className="my-selections__list-item-price">
						${ price }
					</div>
				</div>
			);
		});
	}

	renderClearButton = () => {
		
	}

	render() {
		return (
			<div className="my-selections">
				<div className="my-selections__header">
					<h3>My selections</h3>
				</div>
				<div className="my-selections__list">
						{ this.renderMySelections() }
					</div>
			</div>
		);
	}
}

export default MySelections;