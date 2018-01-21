import React, { Component } from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import GSAP from 'react-gsap-enhancer';
import {TweenLite, TimelineMax, TweenMax} from 'gsap';

class Todo extends Component {

    constructor(props) {
        super(props);

        this.state = { completed: false };
    }

    removeTodo(e) {
        e.preventDefault();
        const { uid } = this.props.todo;

        this.props.removeTodo({ uid });
    }

	handleMouseClick(e) {

        const { completed } = this.state
        
		this.setState({
			completed: !completed
		});
		
		const { uid, projectName } = this.props.todo;

        this.props.completeTodo({ uid, projectName });

		const alpha1 = completed ? 1 : 0;
		const alpha2 = completed ? 0 : 1;

		console.log(this.props);

        console.log(e.target);
        
        const img = e.target.firstChild;
        
		TweenMax.fromTo(img, 0.3, {
			autoAlpha: alpha1
		}, {
			autoAlpha: alpha2
		});

		if (!completed) {
			fadeCompleted(e);
		} else {
			fadeUncompleted(e);
		}
	}

	renderLi() {
		if (this.props.todo.duration) {
			return (
					<li className="todo" onClick={this.handleMouseClick.bind(this)} >
						<img className="todoImage"  src="./assets/checkmark.svg" />
						<div className="todoText">{this.props.todo.text}</div>
						<ul className="detailButton">
							<li>{this.props.todo.duration.hours + "h " + this.props.todo.duration.minutes + "m"}</li>
							<li>{this.props.todo.deadline}</li>
						</ul>
					</li>
			);  
		}
	}

	render() {

        console.log("MY TODO", this.props.todo);

		return (<div>{this.renderLi()}</div>);  
		
    }

}


function fadeCompleted(e) {
	const img = e.target.firstChild;
	const node = e.target

	TweenMax.fromTo(node, 0.3, {
		css: {
			color:"#020202",
			backgroundColor: "#798de4"
		}	
	}, {
		css: {
			color:"#97abcd",
			backgroundColor: "#242c4f",
		}
	});
}

function fadeUncompleted(e) {
	const img = e.target.firstChild;
	const node = e.target
	TweenMax.fromTo(node, 0.3, {
		css: {
			color:"#97abcd",
			backgroundColor: "#242c4f"
		}	
	}, {
		css: {
			color:"#020202",
			backgroundColor: "#798de4"
		}
	});
}



export default connect(null, actions)(GSAP()(Todo));


