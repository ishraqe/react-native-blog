import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { CustomButton, Input } from "../../common";
import validate from '../../../Utility/validation';

class Login extends Component {

    state = {
        controls: {
            email: {
                value:'',
                valid : false,
                validationRules : {
                    isEmail : true
                },
                touched :  false
            },
            password: {
                value:'',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            }
        }
    }

    loginHandler() {
       
    }
    updateInputState = (key, val) => {
        this.setState( prevState => {
            return {
                controls : {
                    ...prevState.controls,
                    [key] : {
                        ...prevState.controls[key], 
                        value : val,
                        valid : validate(val, prevState.controls[key].validationRules),
                        touched : true
                    }
                }
            }
        });
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
                            returnKeyType={'next'}
                            keyboardType='email-address'
                            autoCorrect={false}
                            style={styles.inputStyle}
                            labelStyl={styles.labelStyle}
                            value = {this.state.controls.email.value}
                            onChangeText={val => this.updateInputState('email', val)}
                            valid = {this.state.controls.email.valid}
                            touched = {this.state.controls.email.touched}                            
                        />
                        <View style={styles.passwordButtonStyle}>
                            <Input
                                secureTextEntry={true}
                                iconName={'md-lock'}
                                placeholder={'Password'}
                                labelStyl={styles.labelStyle}
                                style={styles.inputStyle}
                                value={this.state.controls.password.value}
                                onChangeText={ val => this.updateInputState('password', val)}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}         
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            onPress={this.loginHandler}
                            disable = {
                                !this.state.controls.email.valid ||
                                !this.state.controls.password.valid
                            }
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