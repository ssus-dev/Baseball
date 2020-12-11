import React, { Component } from 'react';
import {StyleSheet} from "react-native";

class Play extends Component {
	state = {
		number1: "",
		number2: "",
		number3: "",
		userInput: [],
		randomNum: this.props.getNum,
		popupContents: ""
	}

	render() {
		let { number1, number2, number3, userInput, randomNum, popupContents } = this.state;
		console.log("render() , randomNum = "+randomNum);
		
		let clkAudio = new Audio("mp3/sound.mp3");
		console.log(clkAudio);

		//숫자입력
		let pressNum = (val) => {
			//사용자 입력값
			let thisNum = val.target.value;
			console.log(clkAudio);
			clkAudio.play();
			
			//입력값 넣어주기
			if (number1 == "") this.setState(() => ({ number1: thisNum }));
			else if (number2 == "") this.setState(() => ({ number2: thisNum }));
			else if (number3 == "") this.setState(() => ({ number3: thisNum, userInput: [number1, number2, thisNum] }));
			
		};

		// 값 지움
		let deleteData = () => {
			if (number3 != "") this.setState(() => ({ number3: "" }));
			else if (number2 != "") this.setState(() => ({ number2: "" }));
			else if (number1 != "") this.setState(() => ({ number1: "" }));
		};	

		// 값 확인
		let confirm = () => {
			let { strike, ball, out } = { strike: 0, ball: 0, out: 0 };
			let { list, result, total } = { list: " ", result: " ", total: " " };

			for (let i = 0; i < userInput.length; i++) {
				if (randomNum.includes(userInput[i]) !== -1) { 
					if (userInput[i] == randomNum[i]) strike++;
					else ball++;
				} 
				else out++;
			}

			// viewData 쌓기
			if (strike === 3) {
				list += "축하합니다! 정답 입니다 :D";
				this.setState(() => ({popupContents : list}), () => {document.getElementById("popup").style.display = "block";});
				
			} else {
				//하단 리스트 뿌려주기
				if (ball > 0) result += ball + "Ball ";
				if (strike > 0) result += strike + "Strike ";
				if (out > 0) result += out + "Out ";

				total += result;
				list += '현재 결과는 [ ' + total + ' ] 입니다.';
				
				document.getElementById("listWrap").append(list);
			}

		}

		return (
			<>
				<div className="playWrap" style={styles.playWrap}>
					{/* User-InputData */}
					<article className="inputWrap">
						<p className="inputArea">{number1}</p>
						<p className="inputArea">{number2}</p>
						<p className="inputArea">{number3}</p>
					</article>
					{/* Game-NumberButton */}
					<div className="key">
						<input type="button" value="1" onClick={pressNum}  className="keybtn"/>
						<input type="button" value="2" onClick={pressNum} className="keybtn"/>
						<input type="button" value="3" onClick={pressNum} className="keybtn"/>
						<input type="button" value="4" onClick={pressNum} className="keybtn"/>
						<input type="button" value="5" onClick={pressNum} className="keybtn"/>
						<input type="button" value="6" onClick={pressNum} className="keybtn"/>
						<input type="button" value="7" onClick={pressNum} className="keybtn"/>
						<input type="button" value="8" onClick={pressNum} className="keybtn"/>
						<input type="button" value="9" onClick={pressNum} className="keybtn"/>
						<input type="button" value="0" onClick={pressNum} className="keybtn"/>
						{/* <audio src={require("./mp3/sound.mp3")}></audio> */}
					</div>
					<div className="bottomBtnWrap">
						<button onClick={deleteData} className="deleteBtn">←</button>
						<button onClick={confirm} className="confirmBtn">확인</button>
					</div>
					<ul id="listWrap" className="listWrap"></ul>

					{/* Layer-Popup */}
					<div className="dimdBg" id="popup">
						<div className="popup">
							<button className="close" onClick={() => {document.getElementById("popup").style.display = "none"}}></button>
							<p className="popupContents">{popupContents}</p>

							<div id="btnWrap">
								<button className="agianBtn" onClick={() => {document.getElementById("popup").style.display = "none"}}>다시하기</button>
								<button className="offBtn" onClick={ () => { this.props.changeView("Start");}}>게임종료</button>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}


}

const styles = StyleSheet.create({
	playWrap:{
		width:100,
		height:100,
		background: "#fff",
		position: "absolute",
		background: "url(img/bg.jpg) no-repeat center cente",
		backgroundSize: "cover",
		overflow: "hidden",
		paddingVertical:30,
		paddingHorizontal:20
	},
	inputWrap : {
		width: 100,
		marginVertical : 10,
		marginHorizontal:"auto",
		height:100,
		background: "rgba(255,255,255,0.6)",
		borderRadius: 30,
		paddingVertical:10,
		paddingHorizontal:20,
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "spaceBetween",
		alignContent: "spaceAround"
	},
	inputArea : {
		width:30,
		float:"left",
		height:100,
		background:"url(./img/input_bg.png) no-repeat center center",
		backgroundSize: "contain",
		lineHeight: 80,
		color:"#242f33",
		textAlign: "center",
		fontSize:30,
		fontFamily: "nanum",
		fontWeight:"bold"
	},
	key : {
		width:100,
		// height:calc(100% - 300px),
		borderRadius: 10,
		marginVertical:10,
		marginHorizontal : 0,
		padding:10,
		display: "flex",
		flexWrap: "wrap",
		justifyContent: spaceBetween,
		alignContent: space-around
	},
	keybtn : {
		width:30,
		height:80,
		textAlign: "center",
		lineHeight: 80,
		fontSize: 30,
		borderRadius: 100,
		background:"rgba(255,255,255,0.9)",
		fontFamily: "nanum",
		fontWeight:"bold",
		border:"1px solid #eaeaea"
	},
	// keybtn:last-child : {width:100}
	listWrap : {
		width:100,
		marginVertical:20,
		marginHorizontal: "auto",
		height:100,
		overflowY: "scroll",
		background: "#fff"
	},
// #listWrap *{width:100%;height:20px;font-size: 20px;font-family: "nanum";border-bottom:1px solid #eaeaea;}
})
export default Play;
