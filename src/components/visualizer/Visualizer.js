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
			// if (prop.includes("Show")) {
				if (this.props[prop] !== prevProps[prop]) {
					this.setState({ [prop]: this.props[prop] });
				}
			// }
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
				console.log(folder);
				if(this.state[state]) {
					let images = [];
					this.state[folder].products.forEach((product, ind, arr) => {
						let addClass = "";
						if (ind === 0 && arr.length > 1) {
								addClass = " " + folder + "__left";
						} else if (ind === 1 && arr.length > 1) {
								addClass = " " + folder + "__right";
						} else {
							addClass = " " + folder + "__center";
						}
						let imgClass = folder.includes("decorative") ? (folder + addClass) : folder;
						images.push(<img className={ imgClass } alt={ folder } src={ product.visualizerImages[0] } />);
					});
					return images;
					// return <img className={ folder } alt={ folder } src={ this.state[folder].products[0].visualizerImages[0] } />;
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