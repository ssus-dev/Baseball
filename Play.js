import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, Alert, TouchableHighlight } from "react-native";
import Modal from 'modal-react-native-web';

class Play extends Component {
	state = {
		number1: "",
		number2: "",
		number3: "",
		userInput: [],
		randomNum: this.props.getNum,
		resultTag: "",
		popupAddArea: "",
		resultText: "",
		modalVisible: false
	}

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}

	render() {

		let { number1, number2, number3, userInput, randomNum, resultTag, resultText, modalVisible } = this.state;
		console.log("render() , randomNum = " + randomNum);
		console.log("resultText =>" + resultText);
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
			if (strike === 3) {
				this.setModalVisible(true);
				this.setState(() => ({ resultText: "축하합니다! 정답 입니다 :D" }));
			}
			else {
				//하단 리스트 뿌려주기
				if (ball > 0) result += ball + "Ball ";
				if (strike > 0) result += strike + "Strike ";
				if (out > 0) result += out + "Out ";
				total += result;
				let addString = "- 현재 결과는 [" + total + "] 입니다.";
				this.setState(() => ({ resultTag: <Text style={styles.list}>{addString}</Text> }));
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
						<Text onPress={pressNum} style={styles.lastkeybtn} resizeMode="contain">0</Text>
						<Text onPress={deleteData} style={styles.deleteBtn} resizeMode="contain">←</Text>
					</View>

					<View style={styles.popup}>
						<Modal	animationType="slide" transparent={true} visible={this.state.modalVisible}>
							<View style={styles.modalView}>
								{/* <TouchableHighlight	style={styles.closeImg} onPress={() => {this.setModalVisible(!modalVisible);}}>
									<ImageBackground source={require('./assets/img/bats.png')} resizeMode="contain"></ImageBackground>
								</TouchableHighlight> */}
								<Text style={styles.popupContents}>{resultText}</Text>
								<View style={styles.btnWrap}>
									<TouchableHighlight	style={styles.agianBtn} onPress={() => {this.setModalVisible(!modalVisible);}}>
										<Text style={styles.btnTxt}>다시하기</Text>
									</TouchableHighlight>

									<TouchableHighlight	style={styles.offBtn} onPress={ () => { this.props.changeView("Start");}}>
										<Text style={styles.btnTxt}>게임종료</Text>
									</TouchableHighlight>
								</View>
								
							</View>
						</Modal>

						<TouchableHighlight
							style={styles.confirmBtn}
							onPress={confirm}>
							<Text style={styles.btnTxt2} resizeMode="contain">결과보기</Text>
						</TouchableHighlight>
					</View>

					<View style={styles.listWrap}>
						<Text style={styles.listTitle}>· 결과확인</Text>
						<Text style={styles.listArea}>{resultTag}</Text>
					</View>

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
	bgImg: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 15,
		paddingBottom: 15,
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
		marginTop: 10,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "space-around"
	},
	keybtn: {
		width: "30%",
		textAlign: "center",
		lineHeight: 80,
		fontSize: 30,
		borderRadius: 100,
		margin: 5,
		backgroundColor: "rgba(255,255,255,0.9)",
	},
	lastkeybtn:{
		width:"45%",
		textAlign: "center",
		lineHeight: 80,
		fontSize: 30,
		borderRadius: 100,
		margin: 5,
		backgroundColor: "rgba(255,255,255,0.9)",
	},

	listWrap: {
		width: "100%",
		marginHorizontal: "auto",
		marginTop: 30,
	},
	listTitle:{
		fontSize:20
	},
	listArea : {
		overflowY: "scroll",
		backgroundColor: "#fff",
		height: 80,
	},
	list: {
		width: "100%",
		height: 40,
		fontSize: 20,
		lineHeight: 40,
		textAlign: "center"
	},
	deleteBtn: {
		width: "45%",
		textAlign: "center",
		lineHeight: 80,
		borderRadius: 100,
		margin: 5,
		color: "#242f33",
		fontSize: 45,
		backgroundColor: "#fecc62",
	},

	confirmBtn: {
		backgroundColor: "#242f33",
		width: "100%",
		height: 70,
		textAlign: "center",
		color: "#fff",
		fontSize: 30,
		borderRadius: 100,
		lineHeight: 70
	},
	btnTxt : {
		fontSize:20,
		color:"white",
		textAlign: "center",
		lineHeight: 50,
	},
	btnTxt2 : {
		fontSize:20,
		color:"white",
		textAlign: "center",
		lineHeight: 70,
	},
	popup : {
		flex: 1,
		padding: 20,
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		alignContent:" space-between",
		flexDirection:"row",
	},
	closeImg: {
		width: 40,
		height: 40,
		float: "right",
		marginTop: -12,
		marginRight: -12,
	},
	popupContents: {
		width: "100%",
		fontSize: 22,
		color: "#242f33",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 10,
		height: 40,
		display: "block",
		lineHeight: 40,
	},
	offBtn: {
		width: "45%",
		height: 50,
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
		backgroundColor: "#e59509"
	},
	agianBtn: {
		width: "45%",
		height: 50,
		color: "#fff",
		fontSize: 20,
		textAlign: "center",
		backgroundColor: "#242f33"
	},
	btnWrap: {
		width: "90%",
		height: 50,
		flex:1,
		display: "flex",
		flexWrap: "wrap",
		marginTop:20,
		marginBottom:10,
		justifyContent: "space-between",
		alignContent:" space-between",
	},
	modalView: {
		width:"90%",
		top:"35%",
		left : 20,
		borderRadius: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		backgroundColor:"#fff",
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	}
})

export default Play;
