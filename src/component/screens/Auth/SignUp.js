import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { CustomButton, Input } from "../../common";
import {Actions} from 'react-native-router-flux';

import validate from '../../../Utility/validation';



class SignUp extends Component {

    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            fullname : {
                value : '',
                valid : false,
                validationRules : {
                    lastName : false
                },
                touched: false
            }
        }
    }
    constructor(props) {
        super(props);

        Dimensions.addEventListener('change', this.updateMode);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateMode);
    }

    updateMode = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'potrait' : 'landscape'
        })
    }

    updateInputState = (key, val) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: val,
                        valid: validate(val, prevState.controls[key].validationRules),
                        touched: true
                    }
                }
            }
        });
        console.log(this.state.controls);
    }


    renderImageContainer = () => {
        const imageContainer = (
            <View style={styles.imageContainer}>
                <Image
                    style={styles.iconStyle}
                    source={require('../../../assets/signUpIcon.png')}
                />
            </View>
        );

        if (this.state.viewMode === 'potrait') {
            return imageContainer;
        }
    }

    signUpHandler = () => {
        Actions.successScreen();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.renderImageContainer()}
                <View style={styles.inputContainer}>
                    <Input
                        secureTextEntry={false}
                        iconName={'md-person'}
                        placeholder={'Full Name'}
                        style={styles.inputStyle}
                        returnKeyType={'next'}
                        autoCorrect={false}
                        labelStyl={styles.labelStyle}
                        value={this.state.controls.fullname.value}
                        onChangeText={val => this.updateInputState('fullname', val)}
                        valid={this.state.controls.fullname.valid}
                        touched={this.state.controls.fullname.touched}  
                    />
                    <Input
                        secureTextEntry={false}
                        iconName={'md-mail'}
                        placeholder={'E-mail'}
                        style={styles.inputStyle}
                        returnKeyType={'next'}
                        keyboardType='email-address'
                        autoCorrect={false}
                        labelStyl={styles.labelStyle}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState('email', val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}  
                    />
                    <Input
                        secureTextEntry={true}
                        iconName={'md-lock'}
                        placeholder={'Password'}
                        returnKeyType={'done'}
                        labelStyl={styles.labelStyle}
                        style={styles.inputStyle}
                        value={this.state.controls.password.value}
                        onChangeText={val => this.updateInputState('password', val)}
                        valid={this.state.controls.password.valid}
                        touched={this.state.controls.password.touched}  
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={this.signUpHandler}
                        disable={
                            !this.state.controls.email.valid ||
                            !this.state.controls.password.valid ||
                            !this.state.controls.fullname.valid
                        }
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
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 10
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    iconStyle: {
        width: '70%',
        height: '100%'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 2 ,
        marginTop: 5
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

export default SignUp;