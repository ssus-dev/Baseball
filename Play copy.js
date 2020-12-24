import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import Popup from './Popup';

class Play extends Component {
	state = {
		number1: "",
		number2: "",
		number3: "",
		userInput: [],
		randomNum: this.props.getNum,
		resultTag : "",
		popupAddArea : "",
	}

	onSearchSubmit(text){
		popupAddArea = null;
		console.log(text);
	}

	render() {

		let { number1, number2, number3, userInput, randomNum, resultTag, popupAddArea } = this.state;
		console.log("render() , randomNum = " + randomNum);
		// console.log(popup);
		let clkAudio = new Audio('./assets/mp3/sound.mp3');
		console.log(clkAudio);

		//숫자입력
		let pressNum = (event) => {
			let thisNum = event.target.innerHTML;

			// clkAudio.play();

			// 입력값 넣어주기
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
			let { result, total } = { result: " ", total: " " };

			for (let i = 0; i < userInput.length; i++) {
				if (randomNum.includes(userInput[i]) !== -1) {
					if (userInput[i] == randomNum[i]) strike++;
					else ball++;
				}
				else out++;
			}

			// viewData 쌓기
			if (strike === 3) this.setState(() => ({popupAddArea : <Popup contentsText={"축하합니다! 정답 입니다 :D"} onSubmit={this.onSearchSubmit} />}));
			else {
				//하단 리스트 뿌려주기
				if (ball > 0) result += ball + "Ball ";
				if (strike > 0) result += strike + "Strike ";
				if (out > 0) result += out + "Out ";
				total += result;
				let addString = "- 현재 결과는 [" + total + "] 입니다.";
				this.setState(() => ({resultTag:<Text style={styles.list}>{addString}</Text>}));
			}

		}

		return (
			<View style={styles.playWrap}>
				<ImageBackground source={require('./assets/img/bg.jpg')} style={styles.bgImg}>
					{/* User-InputData */}
					<View style={styles.inputWrap}>
						<Text style={styles.inputArea}>{number1}</Text>
						<Text style={styles.inputArea}>{number2}</Text>
						<Text style={styles.inputArea}>{number3}</Text>
					</View>

					{/* Game-NumberButton */}
					<View style={styles.key} resizeMode="contain">
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">1</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">2</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">3</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">4</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">5</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">6</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">7</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">8</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">9</Text>
						<Text onPress={pressNum} style={styles.keybtn} resizeMode="contain">0</Text>
					</View>

					<View style={styles.bottomBtnWrap} resizeMode="contain">
						<Text onPress={deleteData} style={styles.deleteBtn} resizeMode="contain">←</Text>
						<Text onPress={confirm} style={styles.confirmBtn} resizeMode="contain">확인</Text>
					</View>

					<View style={styles.listWrap}>
						<Text>{resultTag}</Text>
					</View>

					<Text>{popupAddArea}</Text>

				</ImageBackground>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	playWrap: {
		width: "100%",
		height: "100%",
		backgroundColor: "#fff",
		position: "absolute",
	},
	bgImg : {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		paddingLeft:15,
		paddingRight:15,
		paddingTop:15,
		paddingBottom:15,
	},
	inputWrap: {
		width: "100%",
		marginHorizontal: "auto",
		height: 100,
		borderRadius: 20,
		display: "flex",
		flexWrap: "wrap",
	},
	inputArea: {
		width: "33%",
		float: "left",
		height: 100,
		lineHeight: 100,
		color: "#242f33",
		textAlign: "center",
		fontSize: 35,
		backgroundColor: "rgba(255,255,255,0.6)",
	},
	key: {
		width: "100%",
		height: 370,
		display: "flex",
		flexWrap: "wrap",
		marginTop:10,
		marginBottom:10,
		flexDirection:"row",
		justifyContent: "space-between",
		alignContent: "space-around"
	},
	keybtn: {
		width: "30%",
		textAlign: "center",
		lineHeight: 80,
		fontSize: 30,
		borderRadius: 100,
		margin:5,
		backgroundColor:"rgba(255,255,255,0.9)",
	},
	listWrap: {
		width: "100%",
		marginHorizontal: "auto",
		marginTop:30,
		height: 40,
		overflowY: "scroll",
		backgroundColor: "#fff",
	},
	list : {
		width:"100%",
		height:40,
		fontSize:20,
		lineHeight:40,
		textAlign:"center"
	},
	bottomBtnWrap : {
		width: "100%",
		height:70,
		display:"flex",
		flexWrap: "wrap",
	},
	deleteBtn: {
		width:"45%",
		height: 70,
		textAlign: "center",
		color: "#242f33",
		fontSize: 45,
		borderRadius: 100,
		backgroundColor: "#fecc62",
		lineHeight: 70
	},
	confirmBtn: {
		backgroundColor: "#242f33",
		width:"45%",
		height: 70,
		textAlign: "center",
		color: "#fff",
		fontSize: 30,
		borderRadius: 100,
		lineHeight: 70
	}
})

export default Play;
