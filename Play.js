import React, { Component } from 'react';
import RN, { StyleSheet, useWindowDimensions, Button, View, ImageBackground, Text, TouchableOpacity, TouchableHighlight } from "react-native";

class Play extends Component {
	state = {
		number1: "",
		number2: "",
		number3: "",
		userInput: [],
		randomNum: this.props.getNum,
		popupContents: "",
		resultTag : ""
	}

	render() {

		// calc대체용도 관련링크 : https://snack.expo.io/@asad_4561/87dc08?session_id=snack-session-FGVnhyoDp&preview=true&platform=web&iframeId=ufwds87fh5&supportedPlatforms=ios,android&name=useWindowDimensions&description=Example%20usage&waitForData=true
		// const windowWidth = useWindowDimensions().width;
		// const windowHeight = useWindowDimensions().height;


		let { number1, number2, number3, userInput, randomNum, popupContents, resultTag } = this.state;
		console.log("render() , randomNum = " + randomNum);

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
			let { result, total, list } = { result: " ", total: " ", list:[] };

			for (let i = 0; i < userInput.length; i++) {
				if (randomNum.includes(userInput[i]) !== -1) {
					if (userInput[i] == randomNum[i]) strike++;
					else ball++;
				}
				else out++;
			}

			// viewData 쌓기
			if (strike === 3) {
				this.setState(() => ({list : "축하합니다! 정답 입니다 :D"}));
				// list += ;
				this.setState(() => ({ popupContents: list }), () => { document.getElementById("popup").style.display = "block"; });

			} else {
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

					<View id="listWrap" style={styles.listWrap}>
						<Text>{resultTag}</Text>
					</View>

					{/* Layer-Popup */}
					<View style={styles.dimdBg} ref={component => this.newComp = component}>
						<View style={styles.popup}>
							<Button style={styles.close} onPress={() => { document.getElementById("popup").style.display = "none" }} />
							<Text style={styles.popupContents}>{popupContents}</Text>

							<View style={styles.btnWrap}>
								<Button title="다시하기" onPress={() => { document.getElementById("popup").style.display = "none" }} style={styles.agianBtn} />
								<Button title="게임종료" style={styles.offBtn} onPress={() => { this.props.changeView("Start"); }} />
							</View>
						</View>
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
	},
	popup: {
		width:"100%",
		height: "auto",
		padding: 20,
		boxSizing: "border-box",
		backgroundColor: "#fff",
		borderRadius: 10,
		display: "block",
		position: "absolute",
		top: 50,
		left: 50,
		transform: { translateX: -50 },
		transform: { translateY: -50 }
	},
	dimdBg: {
		backgroundColor: "rgba(0,0,0,0.5)",
		width: 100,
		height: 100,
		display: "block",
		position: "fixed",
		top: 0,
		left: 0,
		display: "none"
	},
	close: {
		width: 40,
		height: 40,
		float: "right",
		marginTop: -12,
		marginRight: -12,
		// background: "url(img/bats.png)no-repeat center center",
		// backgroundSize: "contain"
	},
	popupContents: {
		width: 100,
		fontSize: 24,
		color: "#242f33",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 30,
		fontFamily: "nanum",
		fontWeight: 300
	},
	btnWrap: {
		width: 100,
		height: 50
	},
	offBtn: {
		// width:calc(50% - 5px),
		float: "left",
		height: 50,
		color: "#fff",
		fontSize: 20,
		fontFamily: "nanum",
		float: "right",
		backgroundColor: "#e59509"
	},
	agianBtn: {
		// width:calc(50% - 5px),
		float: "left",
		height: 50,
		color: "#fff",
		fontSize: 20,
		// fontFamily: "nanum",
		backgroundColor: "#242f33"
	}
})

export default Play;
