import React, { Component } from 'react';
import './Visualizer.scss';

class Visualizer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...props
		}
	}

	componentDidUpdate(prevProps, prevState) {

		Object.keys(this.props).forEach(prop => {
			if (prop.includes("Show")) {
				if (this.props[prop] !== prevProps[prop]) {
					this.setState({ [prop]: this.props[prop] });
				}
			}
		});
	}

	showEmptyImage = () => {
		 
		// Object.keys(this.state)
		// .filter(state => {
		// 	return state.includes("Show");
		// })
		// .every(state => !this.state[state]) ?
		return <img alt="No visualizer items selected" src="/images/visualizer/visualizer/empty.png" />;
		// null
	}

	renderImage = () => {
		return Object.keys(this.state).map(state => {
			if (state.includes("Show")) {
				const folder = state.replace("Show", "");
				if(this.state[state]) {
					return <img className={ folder } alt={ folder } src={`/images/visualizer/visualizer/${ folder }.png`} />;
				} else {
					return null;
				}
			}	else {
				return null;
			}
		})
	}
	render() {
		return (
			<div className="visualizer">
				<div className="visualizer__images">
					{ this.showEmptyImage() }
					{ this.renderImage() }
				</div>
			</div>
		);
	}
}

export default Visualizer;