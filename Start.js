import "./start.css";
import "./index.css";
import React, { Component } from "react";
import logo from "./img/logo.png";

class Start extends Component {
	render() {
		return (
			<>
				<div className="startWrap" id="startWrap">
					<img src={logo} className="logo" />
					{/* <div className="start_btn"> */}
						{/* img 태그 사용법 */}
						{/* <img src={startBtn} /> */}
						{/* <img src={ require('./img/start.png') } /> */}
					{/* </div> */}
					<button className="startBtn" onClick={ () => { this.props.changeView("Play");}}>Game Start</button>
				</div>
			</>
		);
	}
}

export default Start;

