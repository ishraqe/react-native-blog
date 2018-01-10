import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { CustomButton, Input } from "../../common";
import {Actions} from 'react-native-router-flux';


class Login extends Component {

    signUpHandler= () => {
        Actions.successScreen();
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.iconStyle}
                        source={require('../../../assets/signUpIcon.png')}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        secureTextEntry={false}
                        iconName={'md-person'}
                        placeholder={'Fullname'}
                        returnKeyType={'next'}
                        autoCorrect={false}
                        style={styles.inputStyle}
                        labelStyl={styles.labelStyle}
                    />
                    <Input
                        secureTextEntry={false}
                        iconName={'md-person'}
                        placeholder={'Username'}
                        returnKeyType={'next'}
                        autoCorrect={false}
                        style={styles.inputStyle}
                        labelStyl={styles.labelStyle}
                    />
                    <Input
                        secureTextEntry={false}
                        iconName={'md-mail'}
                        placeholder={'E-mail'}
                        style={styles.emailStyle}
                        returnKeyType={'next'}
                        keyboardType='email-address'
                        autoCorrect={false}
                        style={styles.inputStyle}
                        labelStyl={styles.labelStyle}
                    />
                    <Input
                        secureTextEntry={true}
                        iconName={'md-lock'}
                        placeholder={'password'}
                        labelStyl={styles.labelStyle}
                        style={styles.inputStyle}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={this.signUpHandler}
                    >
                       Get Started
                    </CustomButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: .5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    iconStyle: {
        width: '70%',
        height: '100%'
    },
    inputContainer: {
        flex: 1,
        marginTop: 2
    },
    inputStyle: {
        color: '#000',
        paddingTop: 3,
        width: '80%'
    },
    labelStyle: {
        paddingLeft: 20,
        width: '20%'
    },
});

export default Login;