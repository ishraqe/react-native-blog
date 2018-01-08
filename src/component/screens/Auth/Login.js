import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { CustomButton, Input } from "../../common";


class Login extends Component {

    loginHandler() {
        alert('login');
    }


    render() {
        return (
            <KeyboardAvoidingView
                style={{flex:1}}
            >
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.iconStyle}
                            source={require('../../../assets/loginIcon.png')}
                        />
                    </View>
                    <View style={styles.inputContainer}>
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
                        <View style={styles.passwordButtonStyle}>
                            <Input
                                secureTextEntry={true}
                                iconName={'md-lock'}
                                placeholder={'Password'}
                                labelStyl={styles.labelStyle}
                                style={styles.inputStyle}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            onPress={this.loginHandler}
                        >
                            Login
                        </CustomButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: .5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:30
    },
    iconStyle: {
        width: '70%',
        height: '100%'
    },
    inputContainer: {
        flex: 1,
        marginBottom:2 
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
    passwordButtonStyle : {
        marginBottom: 40
    }
});

export default Login;