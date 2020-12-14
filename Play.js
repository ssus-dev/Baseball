import React, { Component } from 'react';
import { StyleSheet, useWindowDimensions, Button, View, TextInput, ImageBackground, Text } from "react-native";

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

		// calc대체용도 관련링크 : https://snack.expo.io/@asad_4561/87dc08?session_id=snack-session-FGVnhyoDp&preview=true&platform=web&iframeId=ufwds87fh5&supportedPlatforms=ios,android&name=useWindowDimensions&description=Example%20usage&waitForData=true
		// const windowWidth = useWindowDimensions().width;
		// const windowHeight = useWindowDimensions().height;


		let { number1, number2, number3, userInput, randomNum, popupContents } = this.state;
		console.log("render() , randomNum = " + randomNum);

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
				this.setState(() => ({ popupContents: list }), () => { document.getElementById("popup").style.display = "block"; });

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
			
			<View style={styles.playWrap}>
				<ImageBackground source={require('./assets/img/bg.jpg')} style={styles.bgImg}>
					{/* User-InputData */}
					<View style={styles.inputWrap}>
						<Text style={styles.inputArea}>{number1}</Text>
						<Text style={styles.inputArea}>{number2}</Text>
						<Text style={styles.inputArea}>{number3}</Text>
					</View>
					{/* Game-NumberButton */}
					<View style={styles.key}>
						<TextInput value={1} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={2} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={3} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={4} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={5} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={6} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={7} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={8} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={9} onPress={pressNum} style={styles.keybtn} />
						<TextInput value={0} onPress={pressNum} style={styles.keybtn} />
					</View>
					<View style={styles.bottomBtnWrap}>
						<Button title="←" onPress={deleteData} style={styles.deleteBtn} />
						<Button title="확인" onPress={confirm} style={styles.confirmBtn} />
					</View>

					{/* 리스트 추가되는 부분 수정하기 */}
					<View id="listWrap" style={styles.listWrap}></View>

					{/* Layer-Popup */}
					<View id="popup" style={styles.dimdBg}>
						<View style={styles.popup}>
							<Button style={styles.close} onPress={() => { document.getElementById("popup").style.display = "none" }} />
							<Text style={styles.popupContents}>{popupContents}</Text>

							<View id="btnWrap" style={styles.btnWrap}>
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
		paddingLeft:30,
		paddingRight:30,
	},
	inputWrap: {
		width: "100%",
		marginVertical: 10,
		marginHorizontal: "auto",
		height: 100,
		backgroundColor: "rgba(255,255,255,0.6)",
		borderRadius: 30,
		paddingVertical: 10,
		paddingHorizontal: 20,
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "spaceBetween",
		alignContent: "spaceAround"
	},
	inputArea: {
		width: 30,
		float: "left",
		height: 100,
		// background:"url(./img/input_bg.png) no-repeat center center",
		// backgroundSize: "contain",
		lineHeight: 80,
		color: "#242f33",
		textAlign: "center",
		fontSize: 30,
		fontFamily: "nanum",
		fontWeight: "bold"
	},
	key: {
		width: "100%",
		height: 300,
		// height:calc(100% - 300px),
		borderRadius: 10,
		marginVertical: 10,
		marginHorizontal: 0,
		padding: 10,
		display: "flex",
		flexWrap: "wrap",
		// justifyContent: spaceBetween,
		// alignContent: space - around
	},
	keybtn: {
		width: "30%",
		height: 80,
		textAlign: "center",
		lineHeight: 80,
		fontSize: 30,
		borderRadius: 100,
		backgroundColor: "rgba(255,255,255,0.9)",
		fontFamily: "nanum",
		fontWeight: "bold",
		border: "1px solid #eaeaea"
	},
	// keybtn:last-child : {width:100}
	listWrap: {
		width: 100,
		marginVertical: 20,
		marginHorizontal: "auto",
		height: 100,
		overflowY: "scroll",
		backgroundColor: "#fff"
	},
	// #listWrap *{width:100%;height:20px;font-size: 20px;font-family: "nanum";border-bottom:1px solid #eaeaea;}
	deleteBtn: {
		// width:calc(30% - 10px),
		height: 70,
		textAlign: "center",
		color: "#242f33",
		fontWeight: 500,
		fontSize: 45,
		borderRadius: 100,
		fontFamily: "nanum",
		backgroundColor: "#fecc62",
		lineHeight: 65
	},
	confirmBtn: {
		float: "right",
		backgroundColor: "#242f33",
		// width:calc(70% - 10px),
		height: 70,
		textAlign: "center",
		color: "#fff",
		fontWeight: 500,
		fontSize: 30,
		borderRadius: 100,
		fontFamily: "nanum",
		// backgroundSize: "contain",
		lineHeight: 70
	},
	popup: {
		// width:calc(100% - 30px),
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
