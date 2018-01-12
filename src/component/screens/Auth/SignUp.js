import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { CustomButton, Input } from "../../common";
import {Actions} from 'react-native-router-flux';


class Login extends Component {

    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape'
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
                        placeholder={'Fullname'}
                        style={styles.inputStyle}
                        returnKeyType={'next'}
                        keyboardType='email-address'
                        autoCorrect={false}
                        labelStyl={styles.labelStyle}
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
                    />
                    <Input
                        secureTextEntry={true}
                        iconName={'md-lock'}
                        placeholder={'password'}
                        returnKeyType={'done'}
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

export default Login;