import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text } from "react-native";

class Popup extends Component {

	render() {
		return (
			<View style={styles.dimdBg}>
				<View style={styles.popup} resizeMode="contain">
					{/* <Button style={styles.close} onPress={() => { document.getElementById("popup").style.display = "none" }} /> */}
					<ImageBackground source={require('./assets/img/bats.png')} style={styles.closeImg} resizeMode="contain" ></ImageBackground>
					<Text style={styles.popupContents}>{this.props.popupContents}</Text>
					{/* <Text style={styles.popupContents}>testrtred</Text> */}

					<View style={styles.btnWrap}>
						{/* <Button title="다시하기" onPress={() => {document.getElementById("popup").style.display = "none" }} style={styles.agianBtn} /> */}
						<Text style={styles.agianBtn}>다시하기</Text>
						<Text style={styles.offBtn} onPress={() => { this.props.changeView("Start"); }}>게임종료</Text>
					</View>

				</View>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	popup: {
		width:"90%",
		height: 150,
		padding: 20,
		boxSizing: "border-box",
		backgroundColor: "#fff",
		borderRadius: 10,
		display: "block",
		position: "absolute",
		top: "50%",
	},
	dimdBg: {
		backgroundColor: "rgba(0,0,0,0.5)",
		width: "100%",
		height: "100%",
		display: "block",
		position: "fixed",
		top: 0,
		left: 0,
		padding:10,
		// display: "none"
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
		fontSize: 24,
		color: "#242f33",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 30,
		height:30,
		lineHeight:30,
		borderWidth:1,
	},
	btnWrap: {
		width: "100%",
		height: 50,
		flex:"wrap",
		display: "flex",
		flexWrap: "wrap",
		marginTop:20,
		marginBottom:10,
	},
	offBtn: {
		width:"50%",
		height: 50,
		color: "#fff",
		fontSize: 20,
		textAlign:"center",
		lineHeight:50,
		backgroundColor: "#e59509"
	},
	agianBtn: {
		width:"50%",
		height: 50,
		color: "#fff",
		fontSize: 20,
		textAlign:"center",
		lineHeight:50,
		backgroundColor: "#242f33"
	}
})

export default Popup;
