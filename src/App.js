import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		blocks: [],
		x: 0,
		y: 0
	}
	focusOnMe = []

	componentDidMount = () => { this.wrapperWidth() }

	addBoxShadow = (i, j) => {
		let blocks = this.state.blocks
		let dif = blocks[0].length - blocks[i].length

		if (dif !== 0) {
			for (let n = 1; n < blocks[0].length; n++) {
				this.setState({
					x: (350 / 2) * n + ((this.wrapper.offsetWidth > 1110 ? 1110 : this.wrapper.offsetWidth - this.state.blocks[0].length * 350) / 2),
					y: (350 * i)
				})
			}
		} else {
			this.setState({
				x: (350 * j) + ((this.wrapper.offsetWidth > 1110 ? 1110 : this.wrapper.offsetWidth - this.state.blocks[0].length * 350) / 2),
				y: (350 * i)
			})
		}

		// console.log(id)
		// this.setState({
		// 	x: this.focusOnMe[id].offsetLeft,
		// 	y: this.focusOnMe[id].offsetTop
		// })
		//this.setState({ x, y })
	}

	sliceFunc = (arr, len) => {
		let array_new = []
		for (let i = 0; i < arr.length; i = i + len) {
			let temp = arr.slice(i, len + i)
			array_new.push(temp)
		}
		return array_new
	}

	wrapperWidth = () => {
		let wrapperWidth = this.wrapper.offsetWidth > 1110 ? 1110 : this.wrapper.offsetWidth
		let arrWidth = [350, 700, 1050]
		let minWidth = 0
		let array_new = []
		let array = [1, 2, 3, 4, 5, 6, 7]

		for (let n = 0; n < arrWidth.length; n++) {
			if (wrapperWidth >= arrWidth[n]) {
				array_new = this.sliceFunc(array, n + 1)
				minWidth = arrWidth[n]
			}
		}

		if (array_new.length !== this.state.blocks.length) {
			this.setState({
				blocks: array_new,
				x: (wrapperWidth - minWidth) / 2
			})
		}
	}

	render() {
		console.log('render', this.state)
		return (
			<div className="App">
				<div className="wrapper" ref={node => (this.wrapper = node)} onMouseEnter={this.wrapperWidth}>
					{/* <div className="wrapper"> */}
					<div className='overSquare' style={{ top: this.state.y, left: this.state.x }} />
					{
						this.state.blocks.map((item, i) => {
							return (
								item.map((elem, j) => {
									return (
										<div
											className="square"
											key={elem}
											// onMouseEnter={() => this.addBoxShadow(elem - 1)}
											onMouseEnter={() => this.addBoxShadow(i, j)}
										// ref={node => (this.focusOnMe[elem - 1] = node)} 
										/>
									)
								})
							)
						})
					}
				</div>
			</div>
		);
	}
}
export default App;