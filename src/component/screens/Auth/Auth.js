import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { CustomButton } from '../../common/index';
import {Actions} from 'react-native-router-flux';



class AuthScreen extends Component {



    loginScreen = () => {
        Actions.login();
    }
    signUpScreen = () => {
        Actions.signUpScreen();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logoStyle}
                        source={require('../../../assets/story.png')}
                    />
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.iconStyle}
                        source={require('../../../assets/icon.png')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton 
                        onPress={this.signUpScreen}
                        style={styles.signUpButton}
                    >
                        Sign Up
                    </CustomButton>
                    <CustomButton
                        onPress={this.loginScreen}
                    >
                        Login
                    </CustomButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        marginTop: -100
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpButton: {
        marginBottom: 10,
        borderColor: '#b5b8bc'
    },
    iconStyle: {
        width: '100%',
        height: '100%'
    },
    logoStyle: {
        width: '70%',
        height: 50
    }
});

export default AuthScreen;