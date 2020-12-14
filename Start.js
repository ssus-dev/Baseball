import React, { Component } from "react";
import { StyleSheet, View, Image, Button, ImageBackground } from "react-native";
class Start extends Component {
	render() {
		return (
			<View style={styles.startWrap} id="startWrap">
				<ImageBackground source={require('./assets/img/bg.jpg')} style={styles.bgImg}>
					<Image source={require('./assets/img/logo.png')} style={styles.logo} />
					<Button style={styles.startBtn} title="GameStart" onPress={() => { this.props.changeView("Play");}} />
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	startWrap: {
		width: "100%",
		height: "100%",
		top: 0,
		left: 0,
		position: " absolute",
		overflow: "hidden"
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
	startBtn: {
		width:"100%",
		height: 65,
		bordeRadius: 100,
		color: "#fff",
		backgroundColor:"red",
		textAlign: "center",
		fontSize: 40,
		letterSpacing: -2,
		marginTop: 200,
		marginLeft:30,
		marginRight:30,
	},
	logo: {
		width: "100%",
		height:130,
		marginTop: 50,
		marginBottom: 50,
		transform: {translateX : -50},
		transform: {translateY : -50}
	}
})

export default Start;

